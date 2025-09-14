import blueprintDecoder from "../utils/convertors/blueprintDecoder";
import BlueprintEncoder from "../utils/convertors/blueprintEncoder";

// Define the message event type
type WorkerMessage = {
    type: 'decode' | 'encode';
    data: string;
};

// Listen for messages from the main thread
self.addEventListener('message', (e: MessageEvent<WorkerMessage>) => {
    const { type, data } = e.data;
    
    try {
        if (type === 'decode') {
            // Decode blueprint string to JSON
            const decoded = blueprintDecoder(data);
            self.postMessage({
                success: true,
                result: JSON.stringify(decoded, null, 2)
            });
        } else if (type === 'encode') {
            // Encode JSON to blueprint string
            const parsed = JSON.parse(data);
            const encoded = BlueprintEncoder(parsed);
            self.postMessage({
                success: true,
                result: encoded
            });
        }
    } catch (error) {
        self.postMessage({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});
