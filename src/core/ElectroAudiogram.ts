export default class ElectroAudiogram {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private width = 540;
    private height = 480;
    private margin = 30;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.init();
    }

    private init() {
        this.canvas.style.border = '1px solid #ececec';
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx.font = "14px sans-serif"
        this.ctx.textAlign = "right"
        this.ctx.fillStyle = "gray"

        this.ctx.beginPath();
        this.ctx.moveTo(this.margin, this.margin);
        this.ctx.lineTo(this.margin, this.height);
        this.ctx.moveTo(this.margin, this.margin);
        this.ctx.lineTo(this.width, this.margin);
        this.ctx.moveTo(this.width, this.margin);
        this.ctx.lineTo(this.width, this.height);
        this.ctx.moveTo(this.width, this.height);
        this.ctx.lineTo(this.margin, this.height);
        this.ctx.stroke();
    }
}