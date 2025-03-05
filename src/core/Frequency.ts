import { FrequencyEnum } from "./types";

export class Frequency {
    private labels = Object.keys(FrequencyEnum).filter(key => isNaN(Number(key)));
    private values = Object.keys(FrequencyEnum).filter(key => !isNaN(Number(key)));
    private valueMap = new Map();
    private xAisGap = 0;

    constructor() {
        this.initMapData();
    }

    /**
     * 初始化映射数据
     */
    private initMapData() {
        this.values.forEach((value, index) => {
            const count = index + 1;
            this.valueMap.set(+value, count);
        });
    }

    getLabels() {
        return this.labels;
    }

    syncAisGap(xAisGap:number) {
        this.xAisGap = xAisGap;
    }

    private getMap(decibelValue:FrequencyEnum) {
        return this.valueMap.get(decibelValue)
    }

    /**
     * 映射X点位置
     * @param DecibelEnum decibelValue 分贝值
     * @return number
     */
    mapXPosition(frequencyValue:FrequencyEnum) {
        return (this.xAisGap * this.getMap(frequencyValue)) - 5;
    }
}