export {};

declare global {
    interface ColorRGB {
        r: number;
        g: number;
        b: number;
    }

    var __webglFluidColors: ColorRGB[] | undefined;
    var __webglFluidColorIndex: number | undefined;
}