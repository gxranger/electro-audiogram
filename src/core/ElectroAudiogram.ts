import { Marker } from "./Marker";
import { DecibelEnum, DecibelLabel, FrequencyEnum, FrequencyLabel } from "./types";

export default class ElectroAudiogram {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private gridDimension = 580;
    private margin = 40;
    private xAisGap = 0;
    private yAisGap = 0;
    private marker = new Marker();
    private mapFrequencyValueToXPosition = new Map<FrequencyEnum, number>();

    private mapDecibelValueToYPosition = new Map<DecibelEnum, number>();


    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.initAxisGapData();
        this.initCanvas();
        this.drawBorder();
        this.drawXAxis();
        this.drawYAxis();
        this.drawThresholdLine();
        this.addMarker(1000, 25);
    }

    /**
     * 获取频率或分贝数据映射
     * @param type 值类型
     * @return 频率或分贝数据映射 
     */
    private getDataOptions<T>(type: 'frequency' | 'decibel') {
        const enumData = type === 'frequency' ? FrequencyEnum : DecibelEnum;
        
        return {
            labels: Object.keys(enumData).filter(key => isNaN(Number(key))) as T[],
            values: Object.keys(enumData).filter(key => !isNaN(Number(key))),
        }
    }

    /**
     * 初始化 X、Y 轴线间距数据
     */
    private initAxisGapData(){
        const frequencyInfo = this.getDataOptions<FrequencyLabel>('frequency');
        const decibelInfo = this.getDataOptions<DecibelLabel>('decibel');
        const decibelLabels = decibelInfo.labels.filter(item => !item.includes('5'));

        this.xAisGap = this.gridDimension / frequencyInfo.labels.length;
        this.yAisGap = this.gridDimension / decibelLabels.length;
    }

    /**
     * 初始化 Canvas 样式和尺寸
     */
    private initCanvas() {
        this.canvas.width = this.gridDimension + (this.margin * 2.5);
        this.canvas.height = this.gridDimension + (this.margin * 2);
        this.setCanvasStyle();
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
        const frequencyInfo = this.getDataOptions<FrequencyLabel>('frequency');
        
        let gap = this.xAisGap;

        for (let i = 0; i < frequencyInfo.labels.length; i++) {
            gap += this.xAisGap;

            // 建立画布X轴坐标映射
            this.mapFrequencyValueToXPosition.set(+frequencyInfo.values[i], gap - 10);
            
            // 绘制刻度线
            this.ctx.moveTo(gap, this.margin);
            this.ctx.lineTo(gap, this.canvas.height);

            // 绘制频率label
            if (i < frequencyInfo.labels.length) {
                this.ctx.fillText(
                    frequencyInfo.labels[i],
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
        const decibelInfo = this.getDataOptions<DecibelLabel>('decibel');
        const labels = decibelInfo.labels.filter(item => !item.includes('5'));
        const values = decibelInfo.values
        .sort((a,b) => +a-(+b))
        .filter(item => !item.includes('5'));

        let gap = this.yAisGap - 5;

        for (let i = 0; i < labels.length; i++) {
            gap += this.yAisGap;

            // 建立画布Y轴坐标映射
            this.mapDecibelValueToYPosition.set(+values[i], gap);
            if (+values[i]!== 120) {
                this.mapDecibelValueToYPosition.set(+values[i] + 5, gap + this.yAisGap/2);
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
        this.ctx.strokeStyle = "#E74133"
        this.ctx.stroke();
    }

    /**
     * 绘制标记点
     * @param frequencyValue 频率值
     * @param decibelValue 分贝值
     */
    addMarker(frequencyValue: FrequencyEnum, decibelValue:DecibelEnum) {
        const markers = this.marker.renderMarker();
        const img = new Image();

        const x = this.mapFrequencyValueToXPosition.get(frequencyValue)!;
        const y = this.mapDecibelValueToYPosition.get(decibelValue)!;

        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(markers.RIGHT.BC.COVERED);
        img.onload = () => this.ctx.drawImage(img, x, y - 10, 20, 20);
    }
}