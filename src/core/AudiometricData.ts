import { DecibelEnum, DecibelOptions, FrequencyEnum, FrequencyOptions, AudiogramData, MarkerType, PointsOptions, Point } from "./types"

export class AudiometricData {
    private getFrequencyOptions(): FrequencyOptions {
        return {
            labels: Object.keys(FrequencyEnum) as (keyof typeof FrequencyEnum)[],
            values: Object.values(FrequencyEnum),
        }
    }

    private getDecibelOptions(): DecibelOptions {
        return {
            labels: Object.keys(DecibelEnum) as (keyof typeof DecibelEnum)[],
            values: Object.values(DecibelEnum),
        }
    }

    getPointsOptions():PointsOptions {
        return {
            decibelOptions: this.getDecibelOptions(),
            frequencyOptions: this.getFrequencyOptions(),
        }
    }

    createPoint(point: AudiogramData) {
        return {
            conductionType: point.conductionType,
            markerType: `${point.conductionType}_${point.earDirection}_${point.status}` as MarkerType,
            value: [point.frequency, point.decibel] as const,
        }
    }
}