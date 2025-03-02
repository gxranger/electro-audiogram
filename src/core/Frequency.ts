import { FrequencyEnum, FrequencyLabel, FrequencyLabelMap, FrequencyValue } from "./types";

export class Frequency {
    private static labelMap:FrequencyLabelMap = {
        '125': FrequencyEnum.F125,
        '250': FrequencyEnum.F250,
        '500': FrequencyEnum.F500,
        '1k': FrequencyEnum.F1000,
        '2k': FrequencyEnum.F2000,
        '3k': FrequencyEnum.F3000,
        '4k': FrequencyEnum.F4000,
        '6k': FrequencyEnum.F6000,
        '8k': FrequencyEnum.F8000,
        '10k': FrequencyEnum.F10000,
        '12k': FrequencyEnum.F12000
    };

    private static labelText = Object.keys(this.labelMap) as FrequencyLabel[];

    static getIndexOfLabel(index: number) {
        return this.labelText[index];
    }

    static getGap(width:number, scaleRatio: number) {
        return (width / this.labelText.length) * scaleRatio;
    }

    static getMapPosition(frequencyValue:FrequencyValue) {
        const frequencyValues = Object.values(FrequencyEnum);
        return frequencyValues.indexOf(frequencyValue) + 1;
    }
}