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
    const canvas = new OffscreenCanvas(imageData.width, imageData.height);
    const ctx = canvas.getContext('2d')!;
    ctx.putImageData(imageData, 0, 0);
    return canvas as unknown as HTMLCanvasElement;
}

self.addEventListener('message', (e: MessageEvent<WorkerMessage>) => {
    const { type, data } = e.data;
    
    if (type === 'generate_empty') {
        const { sizex, sizey, allowedColors } = data;
        if (!sizex || !sizey) return;
        
        // Create a new array for each row to avoid reference sharing
        const grid = Array(sizex).fill(null).map(() => 
            Array(sizey).fill(allowedColors[0])
        );
        self.postMessage(grid);
    } 
    else if (type === 'calculate_from_canvas') {
        const { imageData, allowedColors } = data;
        if (!imageData) return;
        
        const canvas = createCanvasFromImageData(imageData);
        const colors = calculateClosestColorsInCanvas(canvas, allowedColors);
        self.postMessage(colors);
    }
}); 