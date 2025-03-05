/**
 * 频率值
 */
export enum FrequencyEnum {
  "125Hz" = 125,
  "250Hz" = 250,
  "500Hz" = 500,
  "1kHz" = 1000,
  "2kHz" = 2000,
  "3kHz" = 3000,
  "4kHz" = 4000,
  "6kHz" = 6000,
  "8kHz" = 8000,
  "10kHz" = 10000,
  "12kHz" = 12000
}


/**
 * 分贝值
 */
export enum DecibelEnum {
  "-10dB" = -10,
  "-5dB" = -5,
  "0dB" = 0,
  "5dB" = 5,
  "10dB" = 10,
  "15dB" = 15,
  "20dB" = 20,
  "25dB" = 25,
  "30dB" = 30,
  "35dB" = 35,
  "40dB" = 40,
  "45dB" = 45,
  "50dB" = 50,
  "55dB" = 55,
  "60dB" = 60,
  "65dB" = 65,
  "70dB" = 70,
  "75dB" = 75,
  "80dB" = 80,
  "85dB" = 85,
  "90dB" = 90,
  "95dB" = 95,
  "100dB" = 100,
  "105dB" = 105,
  "110dB" = 110,
  "115dB" = 115,
  "120dB" = 120
}

/**
 * 数据状态
 * reaction 反应
 * cover 掩蔽
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
    decibel: DecibelEnum;
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