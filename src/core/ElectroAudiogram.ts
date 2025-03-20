import { DecibelEnum, DecibelValues, FrequencyEnum, FrequencyValues, MarkerType } from "./types";
import { getAcLeftCoveredNoResponse, getAcRightCoveredNoResponse } from "./utils";

export default class ElectroAudiogram {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private gridDimension = 580;
    private margin = 40;

    private xAisGap = 0;
    private yAisGap = 0;

    private leftColor = '#003491';
    private rightColor = '#e82600';
    
    private frequencyOptions = this.getFrequencyOptions();
    private decibelOptions = this.getDecibelOptions();

    private mapFrequencyValueToXPosition = new Map<FrequencyValues, number>();
    private mapDecibelValueToYPosition = new Map<DecibelValues, number>();

    private markers = this.initMarkers();


    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.initCanvas();
    }

    /**
     * 获取频率数据映射
     * @param type 值类型
     * @return 频率或分贝数据映射 
     */
    private getFrequencyOptions() {
        return {
            labels: Object.keys(FrequencyEnum) as (keyof typeof FrequencyEnum)[],
            values: Object.values(FrequencyEnum),
        }
    }

    /**
     * 获取分贝数据映射
     * @param type 值类型
     * @return 频率或分贝数据映射 
     */
    private getDecibelOptions() {
        return {
            labels: Object.keys(DecibelEnum) as (keyof typeof DecibelEnum)[],
            values: Object.values(DecibelEnum),
        }
    }

    /**
     * 初始化 X、Y 轴线间距数据
     */
    private initAxisGapData(){
        const decibelLabels = this.decibelOptions.labels.filter(item => !item.includes('5'));

        this.xAisGap = this.gridDimension / this.frequencyOptions.labels.length;
        this.yAisGap = this.gridDimension / decibelLabels.length;
    }

    /**
     * 初始化 Canvas 样式和尺寸
     */
    private initCanvas() {
        this.canvas.width = this.gridDimension + (this.margin * 2.5);
        this.canvas.height = this.gridDimension + (this.margin * 2);

        this.setCanvasStyle();
        this.initAxisGapData();
        this.drawBorder();
        this.drawXAxis();
        this.drawYAxis();
        this.drawThresholdLine();
        this.addMarker(1000, 25);
    }

    /**
     * 设置 Canvas 绘制样式
     */
    private setCanvasStyle() {
        this.ctx.font = '15px sans-serif';
        this.ctx.textAlign = 'right';
        this.ctx.fillStyle = 'black';
    }

    /**
     * 绘制矩形边框
     */
    private drawBorder() {
        this.ctx.beginPath();
        this.ctx.rect(
            this.margin + 8,
            this.margin,
            this.gridDimension + this.margin + 10,
            this.gridDimension + this.margin
        ); 
        this.ctx.closePath(); 
        this.ctx.stroke();
    }
        

    /**
     * 绘制X轴网格
     */
    private drawXAxis(){
        this.ctx.beginPath();

        const lineWidth = 0.3;
        
        let gap = this.xAisGap;

        for (let i = 0; i < this.frequencyOptions.labels.length; i++) {
            gap += this.xAisGap;

            // 建立画布X轴坐标映射
            this.mapFrequencyValueToXPosition.set(this.frequencyOptions.values[i], gap - 10);
            
            // 绘制刻度线
            this.ctx.moveTo(gap, this.margin);
            this.ctx.lineTo(gap, this.canvas.height);

            // 绘制频率label
            if (i < this.frequencyOptions.labels.length) {
                this.ctx.fillText(
                    this.frequencyOptions.labels[i],
                    gap + 15, 
                    this.margin * 0.7,
                );
            }
        }


        this.ctx.lineWidth = lineWidth;
        this.ctx.stroke();
    }

    /**
     * 绘制Y轴网格
     */
    private drawYAxis(){
        this.ctx.beginPath();
        
        const lineWidth = 0.3;
        const labels = this.decibelOptions.labels.filter(item => !item.includes('5'));
        const values = this.decibelOptions.values
        .sort((a,b) => +a-(+b))
        .filter(item => !item.toString().includes('5'));

        let gap = this.yAisGap - 5;

        for (let i = 0; i < labels.length; i++) {
            gap += this.yAisGap;

            // 建立画布Y轴坐标映射
            this.mapDecibelValueToYPosition.set(values[i], gap);
            if (values[i]!== 120) {
                this.mapDecibelValueToYPosition.set(
                    values[i] + 5 as DecibelValues, 
                    gap + (this.yAisGap / 2),
                );
            }

            const textYPosition = gap + 5;
            
            // 绘制刻度线
            this.ctx.moveTo(this.margin, gap);
            this.ctx.lineTo(this.canvas.width, gap);
            
            // 绘制刻度值
            this.ctx.fillText(labels[i], this.margin + 6, textYPosition);
        }

        this.ctx.lineWidth = lineWidth;
        this.ctx.stroke();
    }

    /**
     * 绘制标准线
     */
    private drawThresholdLine() {
        const y = this.mapDecibelValueToYPosition.get(25)!;
        
        this.ctx.beginPath();
        this.ctx.setLineDash([5, 10]);
        this.ctx.moveTo(this.margin + 10, y);
        this.ctx.lineTo(this.canvas.width, y);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "#5d5d5d"
        this.ctx.stroke();
    }

    /**
     * 生成标记SVG字符串
     * @param color 16进制颜色值
     * @param tagName svg标签名
     * @param propertyName svg属性名
     * @return svg
     */
    private createMarkerSvgString(
        color:string, 
        tagName: 'polygon' | 'path',
        propertyValue:string
    ) {
        const propertyName = tagName ==='path' ? 'd' : 'points';
        return `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 282.99969 282.99969">
                    <defs>
                    <style>.cls-1{fill:none;}.cls-2{fill:${color};}</style>
                    </defs>
                    <g id="图层_2" data-name="图层 2">
                    <g id="图层_1-2" data-name="图层 1">
                    <rect class="cls-1" width="282.99969" height="282.99969"/>
                    <${tagName} class="cls-2" ${propertyName}="${propertyValue}"/>
                    </g>
                    </g>
                    </svg>
                `;
    }

    private initMarkers() {
        return {
            AC_RIGHT_COVERED: this.createMarkerSvgString(
                this.rightColor,
                'path',
                'M269.9873,249.56934H12.61133L141.2998,21.18066Zm-209.46-28h161.544L141.2998,78.21973Z',
            ),
            AC_RIGHT_UNCOVERED: this.createMarkerSvgString(
                this.rightColor,
                'path',
                'M142,269.38574A127.38574,127.38574,0,1,1,269.38574,142,127.52972,127.52972,0,0,1,142,269.38574Zm0-226.77148A99.38574,99.38574,0,1,0,241.38574,142,99.49826,99.49826,0,0,0,142,42.61426Z',
            ),
            AC_RIGHT_COVERED_NO_RESPONSE: getAcRightCoveredNoResponse(this.rightColor),
            AC_RIGHT_UNCOVERED_NO_RESPONSE: this.createMarkerSvgString(
                this.rightColor,
                'path',
                'M176,15.62988a93.31719,93.31719,0,0,0-74.1333,150.064l-56.396,56.39673V170.36133h-28v99.5293H117v-28H65.26831L122.016,185.14221A93.35654,93.35654,0,1,0,176,15.62988Zm0,158.74024A65.37012,65.37012,0,1,1,241.37012,109,65.44452,65.44452,0,0,1,176,174.37012Z',
            ),
            BC_RIGHT_COVERED: this.createMarkerSvgString(
                this.rightColor,
                'polygon',
                '183.914 275 82.364 275 82.364 10 200.636 10 200.636 38 110.364 38 110.364 247 183.914 247 183.914 275',
            ),
            BC_RIGHT_UNCOVERED: this.createMarkerSvgString(
                this.rightColor,
                'polygon',
                '222.064 252.99 32.272 142.5 222.064 32.01 236.152 56.207 87.925 142.5 236.152 228.793 222.064 252.99',
            ),
            BC_RIGHT_COVERED_NO_RESPONSE: this.createMarkerSvgString(
                this.rightColor,
                'polygon',
                '222 32.114 222 4.114 135.016 4.114 135.016 177.92 92.646 220.289 100.472 184.083 73.104 178.167 50.641 282.092 154.565 259.628 148.649 232.261 112.448 240.085 154.533 198 210.296 198 210.296 170 163.016 170 163.016 32.114 222 32.114',
            ),
            BC_RIGHT_UNCOVERED_NO_RESPONSE: this.createMarkerSvgString(
                this.rightColor,
                'polygon',
                '145.076 239.085 208.799 175.361 127.34 93.902 197.829 23.413 178.03 3.614 87.742 93.902 169.201 175.361 125.273 219.29 133.099 183.083 105.731 177.167 83.268 281.092 187.192 258.628 181.276 231.261 145.076 239.085',
            ),
            AC_LEFT_COVERED: this.createMarkerSvgString(
                this.leftColor,
                'path',
                'M254.51172,255.71289H28.08691V29.28711H254.51172Zm-198.42481-28H226.51172V57.28711H56.08691Z',
            ),
            AC_LEFT_UNCOVERED: this.createMarkerSvgString(
                this.leftColor,
                'path',
                'M162.142,142.5l80.5683-80.56836a14.24254,14.24254,0,1,0-20.142-20.142L142,122.35791,61.4317,41.78967a14.24254,14.24254,0,0,0-20.142,20.142L121.858,142.5l-80.5683,80.56824a14.24259,14.24259,0,0,0,20.142,20.14209L142,162.64209l80.5683,80.56824a14.24259,14.24259,0,1,0,20.142-20.14209Z',
            ),
            AC_LEFT_COVERED_NO_RESPONSE: getAcLeftCoveredNoResponse(this.leftColor),
            AC_LEFT_UNCOVERED_NO_RESPONSE: this.createMarkerSvgString(
                this.leftColor,
                'polygon',
                '232 122 232 210.256 121.04 99.295 176.168 44.168 156.124 24.124 100.996 79.251 45.893 24.148 25.849 44.192 80.952 99.295 25.824 154.423 45.868 174.467 100.996 119.339 212.656 231 123 231 123 259 260 259 260 122 232 122',
            ),
            BC_LEFT_COVERED: this.createMarkerSvgString(
                this.leftColor,
                'polygon',
                '200.636 274 99.086 274 99.086 246 172.636 246 172.636 37 82.364 37 82.364 9 200.636 9 200.636 274',
            ),
            BC_LEFT_UNCOVERED: this.createMarkerSvgString(
                this.leftColor,
                'polygon',
                '68.535 251.99 54.447 227.793 202.674 141.5 54.447 55.207 68.535 31.01 258.326 141.5 68.535 251.99',
            ),
            BC_LEFT_COVERED_NO_RESPONSE: this.createMarkerSvgString(
                this.leftColor,
                'polygon',
                '136.349 258.628 240.273 281.092 217.81 177.167 190.442 183.083 198.268 219.29 155.897 176.919 155.897 3.114 68.914 3.114 68.914 31.114 127.897 31.114 127.897 169 80.618 169 80.618 197 136.381 197 178.465 239.085 142.265 231.261 136.349 258.628',
            ),
            BC_LEFT_UNCOVERED_NO_RESPONSE: this.createMarkerSvgString(
                this.leftColor,
                'polygon',
                '103.349 257.628 207.273 280.092 184.81 176.167 157.442 182.083 165.268 218.29 121.34 174.361 202.799 92.902 112.511 2.614 92.712 22.413 163.201 92.902 81.742 174.361 145.465 238.085 109.265 230.261 103.349 257.628',
            ),
        } as Record<MarkerType, string>;
    }

    /**
     * 绘制标记点
     * @param frequencyValue 频率值
     * @param decibelValue 分贝值
     */
    addMarker(frequencyValue: FrequencyValues, decibelValue:DecibelValues) {
        const img = new Image();

        const x = this.mapFrequencyValueToXPosition.get(frequencyValue)!;
        const y = this.mapDecibelValueToYPosition.get(decibelValue)!;

        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(this.markers.AC_LEFT_COVERED_NO_RESPONSE);
        img.onload = () => this.ctx.drawImage(img, x, y - 10, 20, 20);
    }
}