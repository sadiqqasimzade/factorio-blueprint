
interface VideoPreviewProps {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    progressRef: React.RefObject<HTMLSpanElement | null>;
    isGenerating: boolean;
}

export default function VideoPreview({ canvasRef, progressRef, isGenerating }: VideoPreviewProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <p className="text-sm text-neutral-300">Current Frame</p>
                <div className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-4">
                    <canvas ref={canvasRef} className="max-w-full" />
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-sm text-neutral-300">Status</p>
                <div className="flex items-center justify-between rounded-md border border-neutral-700 bg-neutral-800/50 px-3 py-2">
                    <span className="text-sm">Progress: <span ref={progressRef}>Waiting input</span></span>
                    {isGenerating && <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />}
                </div>
            </div>
        </div>
    );
}
