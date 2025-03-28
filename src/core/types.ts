/**
 * 频率值
 */
export const FrequencyEnum = {
  '125Hz': 125,
  '250Hz': 250,
  '500Hz': 500,
  '1kHz': 1000,
  '2kHz': 2000,
  '3kHz': 3000,
  '4kHz': 4000,
  '6kHz': 6000,
  '8kHz': 8000,
  '10kHz': 10000,
  '12kHz': 12000
} as const;

export type FrequencyLabels = keyof typeof FrequencyEnum;
export type FrequencyValues = typeof FrequencyEnum[FrequencyLabels];
export type FrequencyOptions = {
  labels: FrequencyLabels[],
  values: FrequencyValues[],
};

export type PointsOptions = {
  decibelOptions: DecibelOptions,
  frequencyOptions: FrequencyOptions,
}

/**
 * 分贝值
 */
export const DecibelEnum = {
  '-10dB': -10,
  '-5dB': -5,
  '0dB': 0,
  '5dB': 5,
  '10dB': 10,
  '15dB': 15,
  '20dB': 20,
  '25dB': 25,
  '30dB': 30,
  '35dB': 35,
  '40dB': 40,
  '45dB': 45,
  '50dB': 50,
  '55dB': 55,
  '60dB': 60,
  '65dB': 65,
  '70dB': 70,
  '75dB': 75,
  '80dB': 80,
  '85dB': 85,
  '90dB': 90,
  '95dB': 95,
  '100dB': 100,
  '105dB': 105,
  '110dB': 110,
  '115dB': 115,
  '120dB': 120
} as const;

export type DecibelLabels = keyof typeof DecibelEnum; 
export type DecibelValues = typeof DecibelEnum[DecibelLabels];
export type DecibelOptions = {
  labels: DecibelLabels[],
  values: DecibelValues[],
};

export type AxisOptions<L,V> = {
  labels: L[],
  values: V[],
}

type CoveredStatus = 'COVERED' | 'UNCOVERED';
type ResponseStatus = 'NO_RESPONSE';

/**
 * 数据状态
 */
export type PointStatus = CoveredStatus | `${CoveredStatus}_${ResponseStatus}`;

/**
 * 数据描述类型
 */
export type AudiogramData = {
    /**
     * 频率 (Hz)
     */
    frequency: FrequencyValues;
    /**
     * 分贝 (dB)
     */  
    decibel: DecibelValues;
    /**
     * 传导类型，AC气导，BC骨导
     */  
    conductionType: 'AC' | 'BC';
    /**
     * 状态
     */  
    status: PointStatus;
}

export interface IAudiogramOptions {
  mountedEl: HTMLCanvasElement,
  earDirection: 'LEFT' | 'RIGHT';
  primaryColor?: string
}

export type MarkerType = `${AudiogramData['conductionType']}_${IAudiogramOptions['earDirection']}_${PointStatus}`;

export type AudiometricPoint = {
  conductionType: AudiogramData['conductionType'],
  markerType: MarkerType;
  value: readonly [FrequencyValues, DecibelValues];
  position: [number, number],
};

export type AudiogramColors = {
  [color in `${Lowercase<IAudiogramOptions['earDirection']>}Color`]: string;
}