import { CoordinateCanvas } from "./CoordinateCanvas";
import { Marker } from "./Marker";
import { AudiogramData, IAuduigramOptions, MarkerType } from "./types";

export default class ElectroAudiogram {
    private coordinateCanvas: CoordinateCanvas;
    private marker: Marker;

    private existingPoints = new Map<string,readonly [number, number]>();

    private earDirection: IAuduigramOptions['earDirection'];
    private colors = {
        rightColor: '#e82600',
        leftColor: '#003491',
    }

    

    constructor(options:IAuduigramOptions) {
        const { 
            mounedEl,
            earDirection,
            primaryColor,
         } = options;

        this.coordinateCanvas = new CoordinateCanvas(mounedEl);

        this.earDirection = earDirection;

        if (primaryColor) {
            Reflect.set(this.colors, this.earDirection, primaryColor);
        }
        
        this.marker = new Marker(this.colors);
    }
    
    private groupDataByConductionType(auduigramList: AudiogramData[]) {
        return auduigramList.reduce(
            (pre, cur) => {
                const groupKey = cur.conductionType;

                if (!pre.has(groupKey)) {
                    pre.set(groupKey, []);
                }
                pre.get(groupKey)!.push(cur);

                return pre;
            }, 
            new Map<AudiogramData['conductionType'], AudiogramData[]>(),
        );
    }

    private createCanvasPoint(item: AudiogramData, canvas: CoordinateCanvas) {
        return {
            conductionType: item.conductionType,
            marker: this.marker.mapMarkSvgResource(
                `${item.conductionType}_${this.earDirection}_${item.status}` as MarkerType
            ),
            position: [
                canvas.frequencyValueToXPointMap.get(item.frequency)!,
                canvas.decibelValueToYPointMap.get(item.decibel)!,
            ] as const
        };
    }

    private drawMarker(ctx: CanvasRenderingContext2D, point: ReturnType<typeof this.createCanvasPoint>) {
        const [x, y] = point.position;
        const img = new Image();
        img.src = point.marker;
    
        // 处理重叠点
        const offset = this.existingPoints.has(`${x},${y}`) ? -18 : 0;
        if (offset === 0) this.existingPoints.set(`${x},${y}`, point.position);
    
        img.onload = () => ctx.drawImage(img, x + offset, y - 10, 20, 20);
    }

    private createSorter() {
        return (a: { conductionType: string }, b: { conductionType: string }) => {
            if (a.conductionType === 'AC' && b.conductionType === 'BC') return -1;
            if (a.conductionType === 'BC' && b.conductionType === 'AC') return 1;
            return 0;
        };
    }

    render(auduigramList: AudiogramData[]) {
        if (!auduigramList?.length || auduigramList.length === 0) {
            throw new Error('渲染数据不能为空！');
        }

        this.coordinateCanvas.initialize();
        this.existingPoints.clear();

        const canvas = this.coordinateCanvas;
        const ctx = canvas.ctx;
        const currentColor = Reflect.get(this.colors, `${this.earDirection.toLowerCase()}Color`);

        const grouped = this.groupDataByConductionType(auduigramList);

        grouped.forEach((group,conductionType) => {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = currentColor;
            ctx.setLineDash(conductionType === 'AC' ? [5, 3] : []);
            
            group
            .map(item => this.createCanvasPoint(item, canvas))
            .sort(this.createSorter())
            .forEach(point => {
                this.drawMarker(ctx, point);
                ctx.lineTo(point.position[0] + 10, point.position[1]);
            });

            ctx.stroke();
        });
    }
}