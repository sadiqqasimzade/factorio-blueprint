import { ChevronDown, ChevronRight, Copy } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface JsonViewerProps {
    data: object;
    name?: string;
    depth?: number;
    maxDepth?: number;
}

const JsonViewer: React.FC<JsonViewerProps> = ({
    data,
    name = "root",
    depth = 0,
    maxDepth = 3
}) => {
    const [isExpanded, setIsExpanded] = useState(depth < maxDepth);

    const getValueType = (value: object): string => {
        if (value === null) return "null";
        if (Array.isArray(value)) return "array";
        return typeof value;
    };

    const getValueColor = (type: string): string => {
        switch (type) {
            case "string": return "text-green-600 dark:text-green-400";
            case "number": return "text-blue-600 dark:text-blue-400";
            case "boolean": return "text-purple-600 dark:text-purple-400";
            case "null": return "text-red-600 dark:text-red-400";
            default: return "text-foreground";
        }
    };

    const formatValue = (value: object, type: string): string => {
        if (type === "string") return `"${value}"`;
        if (type === "null") return "null";
        return String(value);
    };

    const copyValue = async (value: object) => {
        try {
            await navigator.clipboard.writeText(JSON.stringify(value, null, 2));
            toast.success("Copied to clipboard");
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    if (data === null || typeof data !== "object") {
        const type = getValueType(data as object);
        return (
            <div className="flex items-center gap-2 py-1">
                <span className="text-muted-foreground font-mono text-sm">{name}:</span>
                <span className={getValueColor(type)}>
                    {formatValue(data as object, type)}
                </span>
                <button
                    className="h-6 w-6 cursor-pointer p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyValue(data as object)}
                >
                    <Copy className="h-3 w-3" />
                </button>
            </div>
        );
    }

    const isArray = Array.isArray(data);
    const keys = isArray ? data.map((_, i) => i) : Object.keys(data);
    const length = keys.length;

    return (
        <div className="group">
            <div className="flex items-center gap-1 py-1">
                <button
                    className="h-6 w-6 cursor-pointer p-0"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {length > 0 ? (
                        isExpanded ? (
                            <ChevronDown className="h-3 w-3" />
                        ) : (
                            <ChevronRight className="h-3 w-3" />
                        )
                    ) : null}
                </button>
                <span className="text-muted-foreground font-mono text-sm">{name}:</span>
                <span className="text-muted-foreground font-mono text-sm">
                    {isArray ? `Array[${length}]` : `Object{${length}}`}
                </span>
                <button
                    className="h-6 w-6 cursor-pointer p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyValue(data)}
                >
                    <Copy className="h-3 w-3" />
                </button>
            </div>

            {isExpanded && length > 0 && (
                <div className="ml-6 border-l border-border pl-4">
                    {keys.map((key) => (
                        <JsonViewer
                            key={key}
                            data={data[key as keyof typeof data]}
                            name={String(key)}
                            depth={depth + 1}
                            maxDepth={maxDepth}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default JsonViewer;