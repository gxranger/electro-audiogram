export default class ElectroAudiogram {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private width = 1000;
    private height = 520;
    private margin = 35;

    private static readonly Y_AXIS_VALUES = [
        -10,
        0,
        10,
        20,
        30,
        40,
        50,
        60,
        70,
        80,
        90,
        100,
        110,
        120,
    ];
    private static readonly X_AXIS_VALUES = {
        '125':125,
        '250':250,
        '500':500,
        '1K':1000,
        '2K':2000,
        '3K':3000,
        '4K':4000,
        '6K':6000,
        '8K':8000,
        '10K':10000,
        '12K':12000,
    };

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.initCanvas();
        this.drawBorder();
        this.drawXAxis();
        this.drawYAxis();
    }

    /**
     * 初始化 Canvas 样式和尺寸
     */
    private initCanvas() {
        this.canvas.style.border = '1px solid #ececec';
        this.canvas.width = this.width + this.margin;
        this.canvas.height = this.height + this.margin;
        this.setCanvasStyle();
    }

    /**
     * 设置 Canvas 绘制样式
     */
    private setCanvasStyle() {
        this.ctx.font = '14px sans-serif';
        this.ctx.textAlign = 'right';
        this.ctx.fillStyle = 'gray';
    }

    /**
     * 绘制矩形边框
     */
    private drawBorder() {
        this.ctx.beginPath();
        this.ctx.rect(
            this.margin,
            this.margin,
            this.width,
            this.height
        ); 
        this.ctx.closePath(); 
        this.ctx.stroke();
    }

    /**
     * 绘制X轴网格
     */
    private drawXAxis(){
        this.ctx.beginPath();
        const xAxisTitle = '频率';
        const titleGap = this.margin*1.6;
        const labelYPosition = this.margin/1.6;
        const lineWidth = 0.3;
        const xAxisValues = Object.keys(ElectroAudiogram.X_AXIS_VALUES);

        this.ctx.fillText(xAxisTitle, titleGap, labelYPosition);


        for (let i = 0; i <= xAxisValues.length; i++) {
            const xAxisGap = this.margin*(i+1) + (this.canvas.height / xAxisValues.length)*i;
            const textXPosition = xAxisGap + this.margin*2.8;
            // 绘制刻度线
            this.ctx.moveTo(xAxisGap, this.margin);
            this.ctx.lineTo(xAxisGap, this.canvas.height);
            
            // 绘制刻度值
            if (i < xAxisValues.length) {
                this.ctx.fillText(`${xAxisValues[i]}`,  textXPosition, labelYPosition);
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

        const labelGap = this.margin - 5;
        const yAxisTitle = '分贝';
        const labelYPosition = this.margin + 10;
        const lineWidth = 0.3;
        const yAxisValues = ElectroAudiogram.Y_AXIS_VALUES;

        this.ctx.fillText(yAxisTitle, labelGap, labelYPosition);

        for (let i = 0; i <= yAxisValues.length; i++) {
            const yAxisGap = this.margin*(i+1);
            const textYPosition = i * this.margin + this.margin * 2.15;
            
            // 绘制刻度线
            this.ctx.moveTo(this.margin, yAxisGap);
            this.ctx.lineTo(this.canvas.width, yAxisGap);
            
            // 绘制刻度值
            if (i < yAxisValues.length) {
                this.ctx.fillText(`${yAxisValues[i]}`, labelGap, textYPosition);
            }
        }

        this.ctx.lineWidth = lineWidth;
        this.ctx.stroke();
    }
}