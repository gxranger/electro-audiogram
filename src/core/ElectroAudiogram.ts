import { AudiometricData } from "./AudiometricData";
import { Coordinate } from "./Coordinate";
import { Marker } from "./Marker";
import { AudiogramColors, AudiogramData, Point } from "./types";

export default class ElectroAudiogram {

    private audiometricData: AudiometricData;
    private coordinate: Coordinate;
    private marker: Marker;

    private existingPoints = new Map<string,readonly [number, number]>();

    private leftColor = '#003491';
    private rightColor = '#e82600';

    constructor(canvas: HTMLCanvasElement, colors?:AudiogramColors) {
        this.audiometricData = new AudiometricData();

        this.coordinate = new Coordinate(
            canvas,
            this.audiometricData.getPointsOptions(),
        );
        this.coordinate.initCanvas();

        if (colors) {
            this.rightColor = colors.rightColor;
            this.leftColor = colors.leftColor;
        }

        this.marker = new Marker({
            leftColor: this.leftColor,
            rightColor: this.rightColor,
        });
    }

    private convertToPointList(data: AudiogramData[]) {
        return data
        .map(item => this.audiometricData.createPoint(item))
        .map(item => {
            const [frequencyValue,decibelValue] = item.value;

            const xPosition = this.coordinate.mapFrequencyValueToXPosition.get(frequencyValue)!;
            const yPosition = this.coordinate.mapDecibelValueToYPosition.get(decibelValue)!;

            return {
                conductionType: item.conductionType,
                marker: this.marker.mapMarkSvgResource(item.markerType),
                value: [xPosition, yPosition] as const,
            };
        });
    }

    renderData(data: AudiogramData[]) {
        if (data.length) {
            this.coordinate.ctx.beginPath();
            this.coordinate.ctx.lineWidth = 2;
            this.coordinate.ctx.strokeStyle = data[0].earDirection === 'RIGHT' ? this.rightColor : this.leftColor;

            this.convertToPointList(data).forEach(item => this.addMarker(item));

            this.coordinate.ctx.stroke();
        } else {
            throw new Error('请传入完整的听力数据');
        }
    }

    /**
     * 绘制标记点
     * @param frequencyValue 频率值
     * @param decibelValue 分贝值
     */
    addMarker(point: Point) {
        const img = new Image();
        const [x,y] = point.value;

        if (point.conductionType === 'AC'){
            this.coordinate.ctx.setLineDash([5, 3]);
        } else {
            this.coordinate.ctx.setLineDash([]);
        }

        img.src = point.marker;

        this.coordinate.ctx.lineTo(x + 10, y);

        // 若骨导和气导坐标数据重合则设置X轴偏移量
        if (this.existingPoints.has(`${x},${y}`)) {
            img.onload = () => this.coordinate.ctx.drawImage(img, x - 18, y - 10, 20, 20);
        } else {
            this.existingPoints.set(`${x},${y}`, point.value);

            img.onload = () => this.coordinate.ctx.drawImage(img, x, y - 10, 20, 20);
        }
    }
}