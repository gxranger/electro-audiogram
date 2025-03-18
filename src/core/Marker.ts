import { MarkerColors } from "./types";

export class Marker {
    private leftColor = '#003491';
    private rightColor = '#e82600';

    
    constructor(colors?:MarkerColors) {
        if (colors) {
            this.leftColor = colors.LEFT;
            this.rightColor = colors.RIGHT;
        }
    }

    private drawMarkerSvg(
        color:string, 
        tagName: 'polygon' | 'path',
        propertyName: 'points' | 'd',
        propertyValue:string
    ) {
        return `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 282.99969 282.99969">
                    <defs>
                    <style>.cls-1{fill:none;}.cls-2{fill:${color};}</style>
                    </defs>
                    <g id="图层_2" data-name="图层 2">
                    <g id="图层_1-2" data-name="图层 1">
                    <rect class="cls-1" width="282.99969" height="282.99969"/>
                    <${tagName} class="cls-2" ${propertyName}="${propertyValue}"/>
                    </g>
                    </g>
                    </svg>
                `;
    }

    renderMarker() {
        return {
            RIGHT: {
                BC: {
                    COVERED: this.drawMarkerSvg(
                        this.rightColor,
                        'polygon',
                        'points',
                        '183.914 275 82.364 275 82.364 10 200.636 10 200.636 38 110.364 38 110.364 247 183.914 247 183.914 275',
                    ),
                    UNCOVERED: this.drawMarkerSvg(
                        this.rightColor,
                        'polygon',
                        'points',
                        '222.064 252.99 32.272 142.5 222.064 32.01 236.152 56.207 87.925 142.5 236.152 228.793 222.064 252.99',
                    ),
                },
                AC: {
                    COVERED: this.drawMarkerSvg(
                        this.rightColor,
                        'path',
                        'd',
                        'M269.9873,249.56934H12.61133L141.2998,21.18066Zm-209.46-28h161.544L141.2998,78.21973Z',
                    ),
                    UNCOVERED: this.drawMarkerSvg(
                        this.rightColor,
                        'path',
                        'd',
                        'M142,269.38574A127.38574,127.38574,0,1,1,269.38574,142,127.52972,127.52972,0,0,1,142,269.38574Zm0-226.77148A99.38574,99.38574,0,1,0,241.38574,142,99.49826,99.49826,0,0,0,142,42.61426Z',
                    ),
                }
            }
        }
    }

}