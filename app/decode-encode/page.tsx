"use client";

import JsonViewer from "@/components/json_viewer";
import Container from "@/components/shared/container";
import clickCopyHandler from "@/utils/handlers/clickCopyHandler";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function DecodeEncodePage() {
    const [result, setResult] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
    const workerRef = useRef<Worker | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollContainerRef.current) {
            setScrollContainer(scrollContainerRef.current);
        }
    }, [result]);

    useEffect(() => {
        // Create worker instance
        workerRef.current = new Worker(new URL('../../workers/decodeEncodeWorker.ts', import.meta.url));
        
        // Handle worker messages
        workerRef.current.onmessage = (e) => {
            const { success, result: workerResult, error } = e.data;
            setIsProcessing(false);
            
            if (success) {
                setResult(workerResult);
            } else {
                setResult(`Error: ${error || 'Unknown error occurred'}`);
            }
        };

        // Handle worker errors
        workerRef.current.onerror = (error) => {
            setIsProcessing(false);
            setResult('Worker error occurred');
            console.error('Worker error:', error);
        };

        // Cleanup worker on component unmount
        return () => {
            if (workerRef.current) {
                workerRef.current.terminate();
            }
        };
    }, []);

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        
        if (!value) {
            setResult('');
            return;
        }

        setIsProcessing(true);
        setResult('Processing...');

        try {
            if (value.startsWith('0')) {
                // Decode blueprint string
                workerRef.current?.postMessage({
                    type: 'decode',
                    data: value
                });
            } else if (value.startsWith('{')) {
                // Encode JSON to blueprint string
                workerRef.current?.postMessage({
                    type: 'encode',
                    data: value
                });
            } else {
                throw new Error('Invalid blueprint string');
            }
        } catch {
            setIsProcessing(false);
            setResult('Invalid input format');
        }
    };
    return (
        <Container>
            <div className="flex flex-col justify-center gap-5">
                <div className="mb-4 p-4 rounded-lg bg-bgLight border-3 border-gray-600 text-white">
                    <h2 className="text-xl font-semibold mb-2">How to Use</h2>
                    <div className="mb-3">
                        <span className="font-bold">Decoding Blueprints:</span>
                        <ol className="list-disc list-inside ml-4 mt-1 space-y-1 text-sm">
                            <li>Copy a blueprint string from Factorio (starts with <span className="font-mono bg-zinc-800 px-1 py-0.5 rounded">0eN...</span>)</li>
                            <li>Paste it in the <span className="font-semibold">Blueprint String Input</span> field</li>
                            <li>Wait for the result to appear</li>
                            <li>Click on the result to copy the decoded JSON or use build it Json Viewer</li>
                        </ol>
                    </div>
                    <div>
                        <span className="font-bold">Encoding JSON:</span>
                        <ol className="list-disc list-inside ml-4 mt-1 space-y-1 text-sm">
                            <li>Paste valid blueprint JSON in the <span className="font-semibold">JSON Input</span> field</li>
                            <li>Wait for the result to appear</li>
                            <li>Click on the result to copy the encoded string and import it into Factorio</li>
                        </ol>
                    </div>
                </div>
                <div className="bg-bgLight mt-2 rounded-2xl p-5 border-gray-600 border-3">
                    <h2 className="text-center">Base64 Blueprint string/Blueprint JSON</h2>
                    <input
                        placeholder="Blueprint string/Blueprint JSON"
                        className="border-b-2 border-white bg-transparent py-3 w-full outline-none"
                        onChange={inputChange}
                    ></input>
                    <div className="h-96 overflow-y-auto mt-5 break-all transition-all">
                        {isProcessing ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                <span className="ml-2">Processing...</span>
                            </div>
                        ) : (
                            <p
                                className="cursor-pointer whitespace-pre-wrap"
                                onClick={(e: React.MouseEvent<HTMLElement>) => {
                                    if (result && !result.startsWith("Error:") && !result.startsWith("Processing...")) {
                                        clickCopyHandler(e).then((ok) =>
                                            ok ? toast.success("Successfully copied") : toast.error("Unable to copy")
                                        );
                                    }
                                }}
                            >
                                {result}
                            </p>
                        )}
                    </div>
                </div>

                {result && result.startsWith('{') && !isProcessing && (
                    <div 
                        ref={scrollContainerRef}
                        className="rounded-2xl p-4 min-h-[200px] bg-bgLight overflow-auto max-h-[400px] border-3 border-gray-600"
                    >
                        <JsonViewer
                            data={JSON.parse(result)}
                            name="blueprint"
                            maxDepth={3}
                            scrollElement={scrollContainer}
                        />
                    </div>
                )}
            </div>
        </Container>
    );
}