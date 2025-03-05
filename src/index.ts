import ElectroAudiogram from './core/ElectroAudiogram';

// 获取 Canvas 元素
const canvas = document.getElementById('audiogramCanvas') as HTMLCanvasElement;

// 初始化
const audiogram = new ElectroAudiogram(canvas);
