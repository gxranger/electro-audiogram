import { Frequency } from "./Frequency";

export default class ElectroAudiogram {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private width = 580;
    private height = 580;
    private margin = 40;
    private frequencyGap = 0;
    private yGap = 0;
    private static readonly SCALE_RATIO = 0.95;

    private static readonly DECIBEL_VALUES = [
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
    private decibelValuesMap = new Map();

    private static readonly FREQUENCY_VALUES = {
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
    private frequencyValuesMap = new Map();


    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.initXYData();
        this.initCanvas();
        this.drawBorder();
        this.drawXAxis();
        this.drawYAxis();
        this.drawThresholdLine()
    }

    /**
     * 初始化 X、Y 相关数据
     */
    private initXYData(){
        const yValues = ElectroAudiogram.DECIBEL_VALUES;
        const xValues = Object.keys(ElectroAudiogram.FREQUENCY_VALUES);
        this.frequencyGap = Frequency.getGap(this.width, ElectroAudiogram.SCALE_RATIO);
        this.yGap = (this.height /  yValues.length) * ElectroAudiogram.SCALE_RATIO;

        xValues.forEach((key, index) => {
            const value = Reflect.get(ElectroAudiogram.FREQUENCY_VALUES, key);
            console.log("🚀 ~ ElectroAudiogram ~ xValues.forEach ~ value:", value);
            this.frequencyValuesMap.set(value, index + 1);
        });
            console.log("🚀 ~ ElectroAudiogram ~ xValues.forEach ~ this.frequencyValuesMap:", this.frequencyValuesMap);

        yValues.forEach((valueY, index) => {
            const count = index + 1;
            this.decibelValuesMap.set(`${valueY}`, count);
            this.decibelValuesMap.set(`${valueY + 5}`, count + 0.5);
        });
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
     * 计算X位置
     */
    private computedXPosition(count: number){
        return  (this.frequencyGap * count) + this.margin;
    }

    /**
     * X轴值与坐标位置映射
     */
    private xAxisPositionMap(valueX: number) { 
        const xPoint = this.frequencyValuesMap.get(valueX);
        return this.computedXPosition(xPoint);
        
    }

    /**
     * 计算Y位置
     */
    private computedYPosition(count: number){
        return  (this.yGap * count) + this.margin;
    }

    /**
     * Y轴值与坐标位置映射
     */
    private yAxisPositionMap(valueY: number) { 
        const yPoint = this.decibelValuesMap.get(`${valueY}`);
        return this.computedYPosition(yPoint);
    }
        

    /**
     * 绘制X轴网格
     */
    private drawXAxis(){
        this.ctx.beginPath();
        const xAxisTitle = '频率';
        const labelYPosition = this.margin * 0.8;
        const titleXPosition =  this.margin * 1.5;
        const lineWidth = 0.3;
        const xAxisValues = Object.keys(ElectroAudiogram.FREQUENCY_VALUES);

        this.ctx.fillText(xAxisTitle,titleXPosition, labelYPosition);

        for (let i = 0; i < xAxisValues.length; i++) {
            const xAxisGap = this.computedXPosition(i + 1);
            const textXPosition = xAxisGap + 10;
            
            // 绘制刻度线
            this.ctx.moveTo(xAxisGap, this.margin);
            this.ctx.lineTo(xAxisGap, this.canvas.height);

            // 绘制刻度label
            if (i < xAxisValues.length) {
                this.ctx.fillText(`${Frequency.getIndexOfLabel(i)}`,  textXPosition, labelYPosition);
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

        const labelGap = this.margin * 0.8;
        const yAxisTitle = '分贝';
        const labelYPosition = this.margin + 10;
        const lineWidth = 0.3;
        const yAxisValues = ElectroAudiogram.DECIBEL_VALUES;

        this.ctx.fillText(yAxisTitle, labelGap, labelYPosition);

        for (let i = 0; i <= yAxisValues.length; i++) {
            const yAxisGap = this.computedYPosition(i + 1);
            const textYPosition = yAxisGap + 5;
            
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

    /**
     * 绘制标准线
     */
    private drawThresholdLine() {
        this.ctx.beginPath();
        const y = this.yAxisPositionMap(25);
        
        this.ctx.setLineDash([5, 10]);
        this.ctx.moveTo(this.margin, y);
        this.ctx.lineTo(this.canvas.width, y);
        this.ctx.strokeStyle = "#000"
        this.ctx.stroke();
    }
}