import { AudiogramColors, MarkerType } from "./types";

export class Marker {
    private rightColor:string;
    private leftColor: string;
    private markers:Record<MarkerType, string>;

    constructor(colors:AudiogramColors) {
        this.rightColor = colors.rightColor;
        this.leftColor = colors.leftColor;
        this.markers = this.createMarkers();
    }

    /**
     * 生成标记SVG字符串
     * @param color 16进制颜色值
     * @param tagName svg标签名
     * @param propertyName svg属性名
     * @return svg
     */
    private createMarkerSvgString(
        color:string, 
        tagName: 'polygon' | 'path',
        propertyValue:string
    ) {
        const propertyName = tagName ==='path' ? 'd' : 'points';
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

    private getAcRightCoveredNoResponse(color: string) {
        return `
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="282.99969" height="282.99969" viewBox="0 0 282.99969 282.99969" xml:space="preserve">
            <desc>Created with Fabric.js 3.6.6</desc>
            <defs>
            </defs>
            <g transform="matrix(1 0 0 1 407 312.4)"  >
            <line style="stroke: ${color}; stroke-width: 2; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: ${color}; fill-rule: nonzero; opacity: 1;"  x1="0" y1="0" x2="0" y2="0" />
            </g>
            <g transform="matrix(0.75 0 0 0.75 188.48 101.91)"  >
            <path style="stroke: ${color}; stroke-width: 2; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: ${color}; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(-147.25, -142.06)" d="M 149.5003969523112 25.965333333333334 L 286.81706361897784 258.1553333333333 L 7.68973028564453 258.1553333333333 L 149.5003969523112 25.965333333333334 L 148.50173028564453 101.36466666666666 L 80.59239695231119 216.2113333333333 L 218.90773028564453 218.2086666666667 L 148.50173028564453 101.36466666666666" stroke-linecap="round" />
            </g>
            <g transform="matrix(0.59 -0.49 0.17 0.21 74.12 205.64)"  >
            <path style="stroke: ${color}; stroke-width: 8; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: ${color}; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(-62.2, -20.73)" d="m 20.013628 0 l 84.37401 0 l 0 0 c 11.053215 -1.04756605e-14 20.013626 9.282301 20.013626 20.7326 c 0 11.450296 -8.960411 20.7326 -20.013626 20.7326 l -84.37401 0 l 0 0 c -11.053222 0 -20.013628 -9.282303 -20.013628 -20.7326 c -5.2380687e-15 -11.450298 8.960406 -20.7326 20.013628 -20.7326 z" stroke-linecap="round" />
            </g>
            <g transform="matrix(0.54 0.07 -0.07 0.54 49.11 221.74)"  >
            <polygon style="stroke: ${color}; stroke-width: 8; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: ${color}; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  points="-50,-50 50,50 -50,50 " />
            </g>
            </svg>
        `
    }

    private getAcLeftCoveredNoResponse(color: string){
        return `
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="282.99969" height="282.99969" viewBox="0 0 282.99969 282.99969" xml:space="preserve">
            <desc>Created with Fabric.js 3.6.6</desc>
            <defs>
            </defs>
            <g transform="matrix(1 0 0 1 407 312.4)"  >
            <line style="stroke: ${color}; stroke-width: 2; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: ${color}; fill-rule: nonzero; opacity: 1;"  x1="0" y1="0" x2="0" y2="0" />
            </g>
            <g transform="matrix(0.99 0 0 0.99 111.52 106.52)"  >
            <path style="stroke: ${color}; stroke-width: 2; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: ${color}; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(-150.2, -149.5)" d="M 59.19999694824219 58.5 L 242.1999969482422 58.5 L 242.1999969482422 240.5 L 58.19999694824219 240 L 59.19999694824219 58.5 L 102.69999694824219 102.5 L 102.69999694824219 196 L 196.6999969482422 196 L 196.6999969482422 102.5 L 102.69999694824219 102.5" stroke-linecap="round" />
            </g>
            <g transform="matrix(-0.61 -0.6 0.27 -0.27 221.62 214.43)"  >
            <path style="stroke: ${color}; stroke-width: 8; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: ${color}; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(-62.2, -20.73)" d="m 20.013628 0 l 84.37401 0 l 0 0 c 11.053215 -1.04756605e-14 20.013626 9.282301 20.013626 20.7326 c 0 11.450296 -8.960411 20.7326 -20.013626 20.7326 l -84.37401 0 l 0 0 c -11.053222 0 -20.013628 -9.282303 -20.013628 -20.7326 c -5.2380687e-15 -11.450298 8.960406 -20.7326 20.013628 -20.7326 z" stroke-linecap="round" />
            </g>
            <g transform="matrix(0 -0.59 0.59 0 251.89 246.15)"  >
            <polygon style="stroke: ${color}; stroke-width: 8; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: ${color}; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  points="-50,-50 50,50 -50,50 " />
            </g>
            </svg>
        `;
    }

    private createMarkers() {
        return {
            AC_RIGHT_COVERED: this.createMarkerSvgString(
                this.rightColor,
                'path',
                'M269.9873,249.56934H12.61133L141.2998,21.18066Zm-209.46-28h161.544L141.2998,78.21973Z',
            ),
            AC_RIGHT_UNCOVERED: this.createMarkerSvgString(
                this.rightColor,
                'path',
                'M142,269.38574A127.38574,127.38574,0,1,1,269.38574,142,127.52972,127.52972,0,0,1,142,269.38574Zm0-226.77148A99.38574,99.38574,0,1,0,241.38574,142,99.49826,99.49826,0,0,0,142,42.61426Z',
            ),
            AC_RIGHT_COVERED_NO_RESPONSE: this.getAcRightCoveredNoResponse(this.rightColor),
            AC_RIGHT_UNCOVERED_NO_RESPONSE: this.createMarkerSvgString(
                this.rightColor,
                'path',
                'M176,15.62988a93.31719,93.31719,0,0,0-74.1333,150.064l-56.396,56.39673V170.36133h-28v99.5293H117v-28H65.26831L122.016,185.14221A93.35654,93.35654,0,1,0,176,15.62988Zm0,158.74024A65.37012,65.37012,0,1,1,241.37012,109,65.44452,65.44452,0,0,1,176,174.37012Z',
            ),
            BC_RIGHT_COVERED: this.createMarkerSvgString(
                this.rightColor,
                'polygon',
                '183.914 275 82.364 275 82.364 10 200.636 10 200.636 38 110.364 38 110.364 247 183.914 247 183.914 275',
            ),
            BC_RIGHT_UNCOVERED: this.createMarkerSvgString(
                this.rightColor,
                'polygon',
                '222.064 252.99 32.272 142.5 222.064 32.01 236.152 56.207 87.925 142.5 236.152 228.793 222.064 252.99',
            ),
            BC_RIGHT_COVERED_NO_RESPONSE: this.createMarkerSvgString(
                this.rightColor,
                'polygon',
                '222 32.114 222 4.114 135.016 4.114 135.016 177.92 92.646 220.289 100.472 184.083 73.104 178.167 50.641 282.092 154.565 259.628 148.649 232.261 112.448 240.085 154.533 198 210.296 198 210.296 170 163.016 170 163.016 32.114 222 32.114',
            ),
            BC_RIGHT_UNCOVERED_NO_RESPONSE: this.createMarkerSvgString(
                this.rightColor,
                'polygon',
                '145.076 239.085 208.799 175.361 127.34 93.902 197.829 23.413 178.03 3.614 87.742 93.902 169.201 175.361 125.273 219.29 133.099 183.083 105.731 177.167 83.268 281.092 187.192 258.628 181.276 231.261 145.076 239.085',
            ),
            AC_LEFT_COVERED: this.createMarkerSvgString(
                this.leftColor,
                'path',
                'M254.51172,255.71289H28.08691V29.28711H254.51172Zm-198.42481-28H226.51172V57.28711H56.08691Z',
            ),
            AC_LEFT_UNCOVERED: this.createMarkerSvgString(
                this.leftColor,
                'path',
                'M162.142,142.5l80.5683-80.56836a14.24254,14.24254,0,1,0-20.142-20.142L142,122.35791,61.4317,41.78967a14.24254,14.24254,0,0,0-20.142,20.142L121.858,142.5l-80.5683,80.56824a14.24259,14.24259,0,0,0,20.142,20.14209L142,162.64209l80.5683,80.56824a14.24259,14.24259,0,1,0,20.142-20.14209Z',
            ),
            AC_LEFT_COVERED_NO_RESPONSE: this.getAcLeftCoveredNoResponse(this.leftColor),
            AC_LEFT_UNCOVERED_NO_RESPONSE: this.createMarkerSvgString(
                this.leftColor,
                'polygon',
                '232 122 232 210.256 121.04 99.295 176.168 44.168 156.124 24.124 100.996 79.251 45.893 24.148 25.849 44.192 80.952 99.295 25.824 154.423 45.868 174.467 100.996 119.339 212.656 231 123 231 123 259 260 259 260 122 232 122',
            ),
            BC_LEFT_COVERED: this.createMarkerSvgString(
                this.leftColor,
                'polygon',
                '200.636 274 99.086 274 99.086 246 172.636 246 172.636 37 82.364 37 82.364 9 200.636 9 200.636 274',
            ),
            BC_LEFT_UNCOVERED: this.createMarkerSvgString(
                this.leftColor,
                'polygon',
                '68.535 251.99 54.447 227.793 202.674 141.5 54.447 55.207 68.535 31.01 258.326 141.5 68.535 251.99',
            ),
            BC_LEFT_COVERED_NO_RESPONSE: this.createMarkerSvgString(
                this.leftColor,
                'polygon',
                '136.349 258.628 240.273 281.092 217.81 177.167 190.442 183.083 198.268 219.29 155.897 176.919 155.897 3.114 68.914 3.114 68.914 31.114 127.897 31.114 127.897 169 80.618 169 80.618 197 136.381 197 178.465 239.085 142.265 231.261 136.349 258.628',
            ),
            BC_LEFT_UNCOVERED_NO_RESPONSE: this.createMarkerSvgString(
                this.leftColor,
                'polygon',
                '103.349 257.628 207.273 280.092 184.81 176.167 157.442 182.083 165.268 218.29 121.34 174.361 202.799 92.902 112.511 2.614 92.712 22.413 163.201 92.902 81.742 174.361 145.465 238.085 109.265 230.261 103.349 257.628',
            ),
        } as Record<MarkerType, string>;
    }

    mapMarkSvgResource(markerType: MarkerType) {
        const uri = encodeURIComponent(this.markers[markerType]);
        return `data:image/svg+xml;charset=utf-8,${uri}`;
    }
}