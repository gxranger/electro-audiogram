/**
 * 数据描述类型
 */
export interface IPoint {
    /**
     * 频率 (Hz)
     */
    frequency: number;
    /**
     * 分贝 (dB)
     */  
    decibel: number;
    /**
     * 传导类型，AC气导，BC骨导
     */  
    conductionType: 'AC' | 'BC';
}