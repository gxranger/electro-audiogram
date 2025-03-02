/**
 * 数据状态
 * reaction 反应
 * cover 遮蔽
 * soundField 声场
 * 当 soundField 为 true 时，cover 和 reaction 默认值为 false
 */
export type PointStatus =  {
    soundField: true;
    cover?: false;
    reaction?: false;
  }
| {
    soundField?: false;
    cover: boolean;
    reaction: boolean;
  };

/**
 * 频率值
 */
export enum FrequencyEnum {
    F125 = 125,
    F250 = 250,
    F500 = 500,
    F1000 = 1000,
    F2000 = 2000,
    F3000 = 3000,
    F4000 = 4000,
    F6000 = 6000,
    F8000 = 8000,
    F10000 = 10000,
    F12000 = 12000
}
export type FrequencyValue = typeof FrequencyEnum[keyof typeof FrequencyEnum];
export type FrequencyLabel = '125' | '250' | '500' | '1k' | '2k' | '3k' | '4k' | '6k' | '8k' | '10k' | '12k';

export type FrequencyLabelMap = {
  [K in FrequencyLabel]: FrequencyEnum;
};

/**
 * 数据描述类型
 */
export interface IPoint {
    /**
     * 频率 (Hz)
     */
    frequency: FrequencyEnum;
    /**
     * 分贝 (dB)
     */  
    decibel: number;
    /**
     * 传导类型，AC气导，BC骨导
     */  
    conductionType: 'AC' | 'BC';
    /**
     * 耳朵方向
     */  
    earDirection: 'LEFT' | 'RIGHT';
    /**
     * 状态
     */  
    status: PointStatus;
}