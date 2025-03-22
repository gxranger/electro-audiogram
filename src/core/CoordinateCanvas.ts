import { AxisOptions, DecibelEnum, DecibelLabels, DecibelValues, FrequencyEnum, FrequencyLabels, FrequencyValues } from "./types";

export class CoordinateCanvas {
    private canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    private gridDimension = 580;
    private margin = 40;
    
    private xAisGap = 0;
    private yAisGap = 0;

    private yAxisOptions: AxisOptions<DecibelLabels, DecibelValues>;
    private xAxisOptions: AxisOptions<FrequencyLabels, FrequencyValues>;

    public frequencyValueToXPointMap = new Map<FrequencyValues, number>();
    public decibelValueToYPointMap = new Map<DecibelValues, number>();

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;

        this.yAxisOptions = this.getAxisOptions<DecibelLabels, DecibelValues>(DecibelEnum);
        this.xAxisOptions = this.getAxisOptions<FrequencyLabels, FrequencyValues>(FrequencyEnum);
        
        this.initialize();
    }

    initialize() {
        this.canvas.width = this.gridDimension + (this.margin * 2.5);
        this.canvas.height = this.gridDimension + (this.margin * 2);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.setCanvasStyle();
        this.initAxisGapData();
        this.drawBorder();
        this.drawXAxis();
        this.drawYAxis();
        this.drawThresholdLine();
    }

    private getAxisOptions<L,V>(enumObj: typeof FrequencyEnum | typeof DecibelEnum ) {
        return {
            labels: Object.keys(enumObj) as L[],
            values: Object.values(enumObj) as V[],
        }
    }

    private initAxisGapData(){
        const decibelLabels = this.yAxisOptions.labels.filter(item => !item.includes('5'));

        this.xAisGap = this.gridDimension / this.xAxisOptions.labels.length;
        this.yAisGap = this.gridDimension / decibelLabels.length;
    }

    private setCanvasStyle() {
        this.ctx.font = '15px sans-serif';
        this.ctx.textAlign = 'right';
        this.ctx.fillStyle = 'black';
    }

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

    private drawXAxis(){
        this.ctx.beginPath();

        const lineWidth = 0.3;
        
        let gap = this.xAisGap;

        for (let i = 0; i < this.xAxisOptions.labels.length; i++) {
            gap += this.xAisGap;

            // 建立画布X轴坐标映射
            this.frequencyValueToXPointMap.set(this.xAxisOptions.values[i], gap - 10);
            
            // 绘制刻度线
            this.ctx.moveTo(gap, this.margin);
            this.ctx.lineTo(gap, this.canvas.height);

            // 绘制频率label
            if (i < this.xAxisOptions.labels.length) {
                this.ctx.fillText(
                    this.xAxisOptions.labels[i],
                    gap + 15, 
                    this.margin * 0.7,
                );
            }
        }


        this.ctx.lineWidth = lineWidth;
        this.ctx.stroke();
    }

    private drawYAxis(){
        this.ctx.beginPath();
        
        const lineWidth = 0.3;
        const labels = this.yAxisOptions.labels.filter(item => !item.includes('5'));
        const values = this.yAxisOptions.values
        .sort((a,b) => +a-(+b))
        .filter(item => !item.toString().includes('5'));

        let gap = this.yAisGap - 5;

        for (let i = 0; i < labels.length; i++) {
            gap += this.yAisGap;

            // 建立画布Y轴坐标映射
            this.decibelValueToYPointMap.set(values[i], gap);
            if (values[i]!== 120) {
                this.decibelValueToYPointMap.set(
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

    private drawThresholdLine() {
        const y = this.decibelValueToYPointMap.get(25)!;
        
        this.ctx.beginPath();
        this.ctx.setLineDash([5, 10]);
        this.ctx.moveTo(this.margin + 10, y);
        this.ctx.lineTo(this.canvas.width, y);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "#5d5d5d"
        this.ctx.stroke();
    }
}