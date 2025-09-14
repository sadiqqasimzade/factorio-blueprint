import SettingsContext from "@/contexts/settings/settingsContext";
import validateFiles from "@/utils/handlers/validateFiles";
import { Upload } from "lucide-react";
import React, { useContext, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";

type AcceptedType = "image" | "video" | "audio" | string;

type FileDropZoneProps = {
    fileType: AcceptedType;
    onFileAccepted: (file: File) => void;
    label?: string;
    description?: string;
    multiple?: boolean;
    disabled?: boolean;
    openPixelArtEditorInstead?: boolean;
};

export default function FileDropZone({
    fileType,
    onFileAccepted,
    label,
    description,
    openPixelArtEditorInstead = true,
    multiple = false,
    disabled = false,
}: FileDropZoneProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isError, setIsError] = useState(false);
    const { setSkipInput } = useContext(SettingsContext);

    const computedAccept = useMemo(() => {
        // If user passes something like "image/*" or a list, keep it
        if (fileType.includes("/")) return fileType;
        return `${fileType}/*`;
    }, [fileType]);

    const titleText = useMemo(
        () => label ?? `Drag & drop your ${fileType} here`,
        [fileType, label]
    );

    const descText = useMemo(
        () => description ?? "or click to browse",
        [description]
    );

    function handleFiles(files: FileList) {
        const result = validateFiles(files, fileType);
        if (typeof result === "string") {
            setIsError(true);
            toast.error(result);
            return;
        }
        setIsError(false);
        onFileAccepted(result);
    }

    function onDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsDragging(false);
        if (disabled) return;
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    }

    function onDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        if (disabled) return;
        setIsDragging(true);
    }

    function onDragEnter(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        if (disabled) return;
        setIsDragging(true);
    }

    function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsDragging(false);
        setIsError(false);
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;
        handleFiles(e.target.files);
    }

    const baseClasses =
        "rounded-xl p-8 text-center transition-all duration-300 border-2 border-dashed cursor-pointer select-none relative overflow-hidden";
    const stateClasses = disabled
        ? "opacity-60 cursor-not-allowed bg-gray-800 border-gray-600"
        : isError
            ? "bg-red-500/10 border-red-500"
            : isDragging
                ? "border-green-500 bg-green-500/10"
                : "border-gray-600 hover:border-green-500/50 bg-gray-800";

    return (
        <div className="space-y-2">
            <input
                type="file"
                ref={inputRef}
                className="hidden"
                accept={computedAccept}
                multiple={multiple}
                onChange={onChange}
                disabled={disabled}
            />

            <div
                className={`${baseClasses} ${stateClasses}`}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onClick={() => !disabled && inputRef.current?.click()}
            >

                <div className="flex flex-col items-center gap-2 relative z-10">
                    <Upload className="w-12 h-12 text-gray-400" />
                    <p className="text-lg text-gray-100 font-bold">{titleText}</p>
                    <p className="text-sm text-gray-400">{descText}</p>
                    <p className="text-xs text-gray-500">Accepted: {computedAccept}</p>
                </div>
            </div>

            {openPixelArtEditorInstead && (
                <button className="w-fit cursor-pointer bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 font-medium py-3 px-6 rounded-lg transition-all duration-300 mt-5" onClick={() => {
                    setSkipInput(true);
                }}>Open Pixel Art Editor Instead</button>
            )}
        </div>
    );
}


