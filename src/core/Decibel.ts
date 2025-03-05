import { DecibelEnum } from "./types";

export class Decibel {
    private labels = Object.keys(DecibelEnum).filter(key => isNaN(Number(key)));
    private values = Object.keys(DecibelEnum).filter(key => !isNaN(Number(key)));
    private valueMap = new Map();
    public yAisGap = 0;

    constructor() {
        this.initMapData();
    }

    /**
     * 初始化映射数据
     */
    private initMapData() {
        this.values
        .filter(item => !item.includes('5'))
        .sort((a,b) => +a-(+b))
        .forEach((value, index) => {
            const count = index + 2;
            this.valueMap.set(+value, count);
            if (+value !== DecibelEnum["120dB"]) {
                this.valueMap.set(+value + 5, count + 0.5);
            }
        });
    }

    private getMap(decibelValue:DecibelEnum) {
        return this.valueMap.get(decibelValue)
    }

    getLabels() {
        return this.labels;
    }

    syncAisGap(yAisGap:number) {
        this.yAisGap = yAisGap;
    }

    /**
     * 映射Y点位置
     * @param DecibelEnum decibelValue 分贝值
     * @return number
     */
    mapYPosition(decibelValue:DecibelEnum) {
        return (this.yAisGap * this.getMap(decibelValue)) - 5;
    }
}