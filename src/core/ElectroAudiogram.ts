export default class ElectroAudiogram {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private width = 540;
    private height = 480;
    private margin = 30;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.initCanvas();
        this.drawBorder();
    }

    // 初始化 Canvas 样式和尺寸
    private initCanvas() {
        this.canvas.style.border = '1px solid #ececec';
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.setCanvasStyle();
    }

    // 设置 Canvas 绘制样式
    private setCanvasStyle() {
        this.ctx.font = '14px sans-serif';
        this.ctx.textAlign = 'right';
        this.ctx.fillStyle = 'gray';
    }

    // 绘制矩形边框
    private drawBorder() {
        this.ctx.beginPath();
        this.ctx.rect(
            this.margin,
            this.margin,
            this.width - 2 * this.margin,
            this.height - 2 * this.margin
        ); 
        this.ctx.closePath(); 
        this.ctx.stroke();
    }
}