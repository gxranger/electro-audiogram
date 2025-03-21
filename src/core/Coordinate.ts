import { DecibelOptions, DecibelValues, FrequencyOptions, FrequencyValues, PointsOptions } from "./types";

export class Coordinate {
    private canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    private gridDimension = 580;
    private margin = 40;
    
    private xAisGap = 0;
    private yAisGap = 0;

    private decibelOptions: DecibelOptions;
    private frequencyOptions: FrequencyOptions;
    

    public mapFrequencyValueToXPosition = new Map<FrequencyValues, number>();
    public mapDecibelValueToYPosition = new Map<DecibelValues, number>();

    constructor(canvas: HTMLCanvasElement, pointsOptions:PointsOptions) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;

        this.decibelOptions = pointsOptions.decibelOptions;
        this.frequencyOptions = pointsOptions.frequencyOptions;
    }

    /**
     * 初始化 Canvas 样式和尺寸
     */
    initCanvas() {
        this.canvas.width = this.gridDimension + (this.margin * 2.5);
        this.canvas.height = this.gridDimension + (this.margin * 2);

        this.setCanvasStyle();
        this.initAxisGapData();
        this.drawBorder();
        this.drawXAxis();
        this.drawYAxis();
        this.drawThresholdLine();
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
}