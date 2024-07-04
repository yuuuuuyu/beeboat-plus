export declare function RGBToHex(r: number, g: number, b: number): string;
export declare function extendHex(shortHex: string): string;
export declare function toRGBObject(rgbStr: any): {
    red: any;
    green: any;
    blue: any;
};
export declare function hexToRGB(hex: any): (string | number)[];
export declare function toRGBArray(rgbStr: any): any;
export declare function RGBToHSB(r: any, g: any, b: any): number[];
export declare function HSBToRGB(h: any, s: any, b: any): number[];
export declare function RGBToHSL(r: any, g: any, b: any): number[];
export declare function HSLToRGB(h: any, s: any, l: any): number[];
export declare function changeLightness(delta: any, hslStr: any): string;
export declare function toHSLArray(hslStr: any): any;
