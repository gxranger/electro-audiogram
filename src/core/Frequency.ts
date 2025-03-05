import { FrequencyEnum } from "./types";

export class Frequency {
    private labels = Object.keys(FrequencyEnum).filter(key => isNaN(Number(key)));
    private values = Object.keys(FrequencyEnum).filter(key => !isNaN(Number(key)));

    getLabels() {
        return this.labels;
    }

    mapPosition() {

    }

    // indexToValueMapping(index: number) {
    //     const label = this.getEnumKeyByEnumValue(FrequencyEnum, 1000);;
    //     return FrequencyEnum.
    // }
    // static getIndexOfLabel(index: number) {
    //     return this.labelText[index];
    // }

    // static getGap(width:number, scaleRatio: number) {
    //     return (width / this.labelText.length) * scaleRatio;
    // }

    // static getMapPosition(frequencyValue:FrequencyValue) {
    //     const frequencyValues = Object.values(FrequencyEnum);
    //     return frequencyValues.indexOf(frequencyValue) + 1;
    // }

    // private computedXPosition(count: number){
    //     return  (this.frequencyGap * count) + this.margin;
    // }
}