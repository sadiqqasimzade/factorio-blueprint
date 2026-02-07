import clickCopyHandler from "@/utils/handlers/clickCopyHandler";
import { toast } from "react-toastify";

interface VideoResultProps {
    resultRef: React.RefObject<HTMLParagraphElement | null>;
}

export default function VideoResult({ resultRef }: VideoResultProps) {
    return (
        <div className="space-y-2">
            <p className="text-sm font-semibold">Result</p>
            <p
                ref={resultRef}
                onClick={(e) => { clickCopyHandler(e).then(result => result ? toast.success('Successfully copied') : toast.error('Unable to copy')) }}
                className="max-h-80 overflow-y-auto rounded-md border border-neutral-700 bg-neutral-800/50 p-3 text-sm break-all cursor-pointer hover:border-blue-500 transition-colors"
            />
            <p className="text-xs text-neutral-400">Click the result to copy</p>
        </div>
    );
}
