import ElectroAudiogram from './core/ElectroAudiogram';

// 获取 Canvas 元素
const canvas = document.getElementById('audiogramCanvas') as HTMLCanvasElement;

// 初始化
const audiogram = new ElectroAudiogram(canvas);
audiogram.renderData([
    {
        frequency: 125,
        decibel: 25,
        conductionType: 'BC',
        earDirection: 'RIGHT',
        status: 'COVERED',
    },
    {
        frequency: 250,
        decibel: 65,
        conductionType: 'BC',
        earDirection: 'RIGHT',
        status: 'UNCOVERED',
    },
    {
        frequency: 125,
        decibel: 25,
        conductionType: 'AC',
        earDirection: 'RIGHT',
        status: 'COVERED',
    },
    {
        frequency: 250,
        decibel: 65,
        conductionType: 'AC',
        earDirection: 'RIGHT',
        status: 'UNCOVERED',
    }
])