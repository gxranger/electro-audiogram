import { FrequencyEnum } from "./types";

export class Frequency {
    private static labelMap = {
        [FrequencyEnum.F125]: '125',
        [FrequencyEnum.F250]: '250',
        [FrequencyEnum.F500]: '500',
        [FrequencyEnum.F1000]: '1k',
        [FrequencyEnum.F2000]: '2k',
        [FrequencyEnum.F3000]: '3k',
        [FrequencyEnum.F4000]: '4k',
        [FrequencyEnum.F6000]: '6k',
        [FrequencyEnum.F8000]: '8k',
        [FrequencyEnum.F10000]: '10k',
        [FrequencyEnum.F12000]: '12k'
    };

    static getLabel(frequencyValue: FrequencyEnum): string {
        return this.labelMap[frequencyValue];
    }
}