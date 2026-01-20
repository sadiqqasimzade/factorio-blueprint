import { useVirtualizer } from "@tanstack/react-virtual";
import { ChevronDown, ChevronRight, Copy } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface JsonViewerProps {
    data: object;
    name?: string;
    depth?: number;
    maxDepth?: number;
    scrollElement?: HTMLElement | null;
}

const VIRTUALIZATION_THRESHOLD = 100; // Use virtualization for arrays/objects with 100+ items

const JsonViewer: React.FC<JsonViewerProps> = ({
    data,
    name = "root",
    depth = 0,
    maxDepth = 3,
    scrollElement
}) => {
    const [isExpanded, setIsExpanded] = useState(depth < maxDepth);
    const parentRef = useRef<HTMLDivElement>(null);
    const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(scrollElement || null);
    
    // Callback ref to find scroll container when element is mounted
    const setParentRef = useCallback((node: HTMLDivElement | null) => {
        parentRef.current = node;
        
        if (!node || typeof window === 'undefined') return;
        
        if (scrollElement) {
            setScrollContainer(scrollElement);
            return;
        }
        
        const findScrollContainer = (element: HTMLElement | null): HTMLElement | null => {
            if (!element || element === document.body || element === document.documentElement) return null;
            
            const style = window.getComputedStyle(element);
            const overflowY = style.overflowY || style.overflow;
            
            if (overflowY === 'auto' || overflowY === 'scroll') {
                return element;
            }
            
            return findScrollContainer(element.parentElement);
        };

        const container = findScrollContainer(node.parentElement);
        if (container && container !== scrollContainer) {
            setScrollContainer(container);
        }
    }, [scrollElement, scrollContainer]);
    
    // Also update when scrollElement prop changes
    useEffect(() => {
        if (scrollElement) {
            setScrollContainer(scrollElement);
        }
    }, [scrollElement]);

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
    const shouldVirtualize = length >= VIRTUALIZATION_THRESHOLD && isExpanded && scrollContainer !== null;

    // Virtual list setup for large arrays/objects
    const virtualizer = useVirtualizer({
        count: shouldVirtualize ? length : 0,
        getScrollElement: useCallback(() => scrollContainer, [scrollContainer]),
        estimateSize: useCallback(() => 32, []), // Estimated height per item
        overscan: 5, // Render 5 extra items above/below viewport
        enabled: shouldVirtualize,
    });

    const renderChildren = () => {
        if (!isExpanded || length === 0) return null;

        if (shouldVirtualize && scrollContainer) {
            // Virtualized rendering for large lists
            const virtualItems = virtualizer.getVirtualItems();
            const totalSize = virtualizer.getTotalSize();

            return (
                <div ref={setParentRef} className="ml-6 border-l border-border pl-4">
                    <div
                        style={{
                            height: `${totalSize}px`,
                            width: '100%',
                            position: 'relative',
                        }}
                    >
                        {virtualItems.map((virtualItem) => {
                            const key = keys[virtualItem.index];
                            return (
                                <div
                                    key={key}
                                    data-index={virtualItem.index}
                                    ref={virtualizer.measureElement}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        transform: `translateY(${virtualItem.start}px)`,
                                    }}
                                >
                                    <JsonViewer
                                        data={data[key as keyof typeof data]}
                                        name={String(key)}
                                        depth={depth + 1}
                                        maxDepth={maxDepth}
                                        scrollElement={scrollContainer}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        } else {
            // Regular rendering for small lists
            return (
                <div ref={setParentRef} className="ml-6 border-l border-border pl-4">
                    {keys.map((key) => (
                        <JsonViewer
                            key={key}
                            data={data[key as keyof typeof data]}
                            name={String(key)}
                            depth={depth + 1}
                            maxDepth={maxDepth}
                            scrollElement={scrollContainer}
                        />
                    ))}
                </div>
            );
        }
    };

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
                {shouldVirtualize && (
                    <span className="text-xs text-muted-foreground ml-2">
                        (virtualized)
                    </span>
                )}
                <button
                    className="h-6 w-6 cursor-pointer p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyValue(data)}
                >
                    <Copy className="h-3 w-3" />
                </button>
            </div>

            {renderChildren()}
        </div>
    );
};

export default JsonViewer;