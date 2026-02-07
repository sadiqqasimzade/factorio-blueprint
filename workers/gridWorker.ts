import { calculateClosestColorsInCanvas } from "../utils/image/calculateColors";

type WorkerMessage = {
    type: 'generate_empty' | 'calculate_from_canvas';
    data: {
        sizex?: number;
        sizey?: number;
        imageData?: ImageData;
        allowedColors: string[];
    };
};

function createCanvasFromImageData(imageData: ImageData): HTMLCanvasElement {
    // Create regular canvas element for image processing
    const canvas = new OffscreenCanvas(imageData.width, imageData.height);
    const ctx = canvas.getContext('2d')!;
    ctx.putImageData(imageData, 0, 0);
    return canvas as unknown as HTMLCanvasElement;
}

self.addEventListener('message', (e: MessageEvent<WorkerMessage>) => {
    try {
        const { type, data } = e.data;
        
        if (type === 'generate_empty') {
            const { sizex, sizey, allowedColors } = data;
            if (!sizex || !sizey || !allowedColors || allowedColors.length === 0) {
                self.postMessage([]);
                return;
            }
            
            // Create a new array for each row to avoid reference sharing
            // Fixed: should be [height][width] not [width][height]
            const grid = Array(sizey).fill(null).map(() => 
                Array(sizex).fill(allowedColors[0])
            );
            self.postMessage(grid);
        } 
        else if (type === 'calculate_from_canvas') {
            const { imageData, allowedColors } = data;
            if (!imageData || !allowedColors || allowedColors.length === 0) {
                self.postMessage([]);
                return;
            }
            
            const canvas = createCanvasFromImageData(imageData);
            const colors = calculateClosestColorsInCanvas(canvas, allowedColors);
            self.postMessage(colors);
        }
    } catch (error) {
        console.error('Grid worker error:', error);
        self.postMessage([]);
    }
}); 