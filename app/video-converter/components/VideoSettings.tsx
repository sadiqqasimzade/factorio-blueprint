import FileDropZone from "@/components/drag_and_drop/FileDropZone";
import QualitySelector from "@/components/dropdown/QualitySelector";

interface VideoSettingsProps {
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
    width: number;
    height: number;
    setWidth: (value: number) => void;
    setHeight: (value: number) => void;
    aspectRatio: number;
    skippedFrames: number;
    setSkippedFrames: (value: number) => void;
    screenUps: number;
    setScreenUps: (value: number) => void;
    loopWithoutBlankFrame: boolean;
    setLoopWithoutBlankFrame: (value: boolean) => void;
    quality: number;
    setQuality: (value: number) => void;
    readyToStart: boolean;
    handleVideoInput: (file: File) => void;
    handleGifInput: (file: File) => void;
    isGenerating: boolean;
    onConvert: () => void;
    convertButtonRef: React.RefObject<HTMLButtonElement | null>;
}

export default function VideoSettings({
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    width,
    height,
    setWidth,
    setHeight,
    aspectRatio,
    skippedFrames,
    setSkippedFrames,
    screenUps,
    setScreenUps,
    loopWithoutBlankFrame,
    setLoopWithoutBlankFrame,
    quality,
    setQuality,
    readyToStart,
    handleVideoInput,
    handleGifInput,
    isGenerating,
    onConvert,
    convertButtonRef
}: VideoSettingsProps) {
    return (
        <section className="rounded-xl border border-neutral-700 bg-neutral-900/60 p-6 space-y-6">
            <div className="flex flex-col gap-2">
                <FileDropZone
                    fileType="video/*,.gif"
                    label="Drag & drop your video or GIF here"
                    description="or click to browse"
                    openPixelArtEditorInstead={false}
                    onFileAccepted={(file) => {
                        if (file.type === 'image/gif') {
                            handleGifInput(file)
                        }
                        else {
                            handleVideoInput(file)
                        }
                    }}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm text-neutral-300">Width</label>
                    <input
                        type="number"
                        className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={width}
                        disabled={!readyToStart}
                        onChange={(e) => {
                            const newWidth = Math.min(maxWidth, Number(e.target.value));
                            setWidth(newWidth);
                            setHeight(Math.min(maxHeight, Math.round(newWidth / aspectRatio)));
                        }}
                        min={minWidth}
                        max={maxWidth}
                    />
                    <p className="text-xs text-neutral-400">min: {minWidth} • max: {maxWidth}</p>
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-neutral-300">Height</label>
                    <input
                        type="number"
                        className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={height}
                        disabled={!readyToStart}
                        onChange={(e) => {
                            const newHeight = Math.min(maxHeight, Number(e.target.value));
                            setHeight(newHeight);
                            setWidth(Math.min(maxWidth, Math.round(newHeight * aspectRatio)));
                        }}
                        min={minHeight}
                        max={maxHeight}
                    />
                    <p className="text-xs text-neutral-400">min: {minHeight} • max: {maxHeight}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm text-neutral-300">Skip Frames</label>
                    <input
                        type="number"
                        className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={skippedFrames}
                        disabled={!readyToStart}
                        min={0}
                        onChange={(e) => {
                            setSkippedFrames(Number(e.target.value))
                        }}
                    />
                    <p className="text-xs text-neutral-400">Skip frames to reduce result size. UPS adjusts to maintain speed.</p>
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-neutral-300">Screen UPS</label>
                    <input
                        type="number"
                        className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={screenUps}
                        disabled={!readyToStart}
                        min={1}
                        max={60}
                        onChange={(e) => {
                            setScreenUps(Number(e.target.value))
                        }}
                    />
                    <p className="text-xs text-neutral-400">Max 60</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                    <QualitySelector value={quality} onChange={setQuality} disabled={!readyToStart} className="my-2" />
                </div>
                <div className="space-y-2 flex gap-2">
                    <input
                        id="loop-without-blank"
                        type="checkbox"
                        className="h-4 w-4 rounded border-neutral-700 bg-neutral-800 text-blue-500 focus:ring-blue-500"
                        checked={loopWithoutBlankFrame}
                        disabled={!readyToStart}
                        onChange={(e) => {
                            setLoopWithoutBlankFrame(e.target.checked)
                        }}
                    />
                    <label htmlFor="loop-without-blank" className="text-sm text-neutral-300">Loop without blank frame</label>
                </div>

            </div>

            <div className="pt-2">
                <button
                    ref={convertButtonRef}
                    disabled={!readyToStart || isGenerating}
                    className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={onConvert}
                >
                    Convert
                </button>
            </div>
        </section>
    );
}
