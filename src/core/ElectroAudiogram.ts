import { Decibel } from "./Decibel";
import { Frequency } from "./Frequency";

export default class ElectroAudiogram {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private gridDimension = 580;
    private margin = 40;
    private xAisGap = 0;
    private yAisGap = 0;
    private frequency = new Frequency();
    private decibel = new Decibel();


    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.initAxisGapData();
        this.initCanvas();
        this.drawBorder();
        this.drawXAxis();
        this.drawYAxis();
        this.drawThresholdLine();
    }

    /**
     * 计算X轴线间距
     */
    private computedXAxisGap() {
        const frequencyTotal = this.frequency.getLabels().length;
        return this.gridDimension / frequencyTotal;
    }

    /**
     * 计算Y轴线间距
     */
    private computedYAxisGap() {
        const labels = this.decibel.getLabels();
        const displayDecibelTotal = labels.filter(item => !item.includes('5')).length;
        return this.gridDimension / displayDecibelTotal;
    }

    /**
     * 初始化 X、Y 轴线间距数据
     */
    private initAxisGapData(){
        this.xAisGap = this.computedXAxisGap();
        this.yAisGap = this.computedYAxisGap();

        this.decibel.syncAisGap(this.yAisGap);
        this.frequency.syncAisGap(this.yAisGap);
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
        const labels = this.frequency.getLabels();
        let gap = this.xAisGap;

        for (let i = 0; i < labels.length; i++) {
            gap += this.xAisGap;
            
            // 绘制刻度线
            this.ctx.moveTo(gap, this.margin);
            this.ctx.lineTo(gap, this.canvas.height);

            // 绘制频率label
            if (i < labels.length) {
                this.ctx.fillText(
                    labels[i],
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
        const labels = this.decibel.getLabels().filter(item => !item.includes('5'));

        let gap = this.yAisGap - 5;

        for (let i = 0; i < labels.length; i++) {
            gap += this.yAisGap;
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
        const y = this.decibel.mapYPosition(25);
        
        this.ctx.beginPath();
        this.ctx.setLineDash([5, 10]);
        this.ctx.moveTo(this.margin + 10, y);
        this.ctx.lineTo(this.canvas.width, y);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "#E74133"
        this.ctx.stroke();
    }
}