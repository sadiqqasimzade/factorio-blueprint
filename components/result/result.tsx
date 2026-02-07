import SettingsContext from "@/contexts/settings/settingsContext";
import clickCopyHandler from "@/utils/handlers/clickCopyHandler";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type Props = { pixelArt: string[][] | number[][] };

export default function Result({ pixelArt }: Props) {
  const [bpstring, setBpstring] = useState<string>("Loading...");
  const { convertTo, quality, blackLampsAllowed, lampBgTile } =
    useContext(SettingsContext);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    let worker: Worker | null = null;

    switch (convertTo) {
      case "lamp":
        worker = new Worker(
          new URL("../../workers/lampWorker.ts", import.meta.url)
        );
        worker.postMessage({
          color_indexes: pixelArt as number[][],
          quality,
          blackLampsAllowed,
          lampBgTile,
        });
        break;
      case "tile":
        worker = new Worker(
          new URL("../../workers/tileWorker.ts", import.meta.url)
        );
        worker.postMessage({ pixelArt: pixelArt as string[][] });
        break;
      case "platform":
        worker = new Worker(
          new URL("../../workers/platformWorker.ts", import.meta.url)
        );
        worker.postMessage({ pixelArt: pixelArt as number[][] });
        break;
    }

    workerRef.current = worker;

    if (worker) {
      worker.onmessage = (e: MessageEvent<string>) => {
        setBpstring(e.data);
        worker?.terminate();
        workerRef.current = null;
      };

      worker.onerror = () => {
        toast.error("Error generating blueprint");
        worker?.terminate();
        workerRef.current = null;
      };
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, [convertTo, pixelArt, quality, blackLampsAllowed, lampBgTile]);

  return (
    <div>
      <p className="text-xl">Click on blueprint string to copy</p>
      <p
        className="break-all overflow-y-auto overflow-x-hidden max-h-64 outline mt-4 cursor-pointer whitespace-pre-wrap"
        onClick={(e) => {
          clickCopyHandler(e).then((ok) =>
            ok ? toast.success("Successfully copied") : toast.error("Unable to copy")
          );
        }}
      >
        {bpstring}
      </p>
    </div>
  );
}
