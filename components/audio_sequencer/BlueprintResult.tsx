"use client";

import clickCopyHandler from "@/utils/handlers/clickCopyHandler";
import { forwardRef } from "react";
import { toast } from "react-toastify";

interface BlueprintResultProps {
  statusText: string;
  isGenerating: boolean;
  onCopyClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export const BlueprintResult = forwardRef<
  HTMLParagraphElement,
  BlueprintResultProps
>(function BlueprintResult(
  { statusText, isGenerating, onCopyClick },
  ref
) {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    clickCopyHandler(e).then((result) =>
      result
        ? toast.success("Successfully copied")
        : toast.error("Unable to copy")
    );
    onCopyClick(e);
  };

  return (
    <section className="rounded-xl border border-neutral-700 bg-neutral-900/60 p-6 space-y-6">
      <div className="space-y-2">
        <p className="text-sm text-neutral-300">Status</p>
        <div className="flex items-center justify-between rounded-md border border-neutral-700 bg-neutral-800/50 px-3 py-2">
          <span className="text-sm">Progress: {statusText}</span>
          {isGenerating && (
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
          )}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold">Blueprint Result</p>
        <p
          ref={ref}
          onClick={handleClick}
          className="max-h-80 overflow-y-auto rounded-md border border-neutral-700 bg-neutral-800/50 p-3 text-sm break-all cursor-pointer hover:border-blue-500 transition-colors min-h-[100px]"
        />
        <p className="text-xs text-neutral-400">Click the result to copy</p>
      </div>
    </section>
  );
});
