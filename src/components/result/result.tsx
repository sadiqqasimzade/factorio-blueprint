import SettingsContext from "@/src/contexts/settings/settingsContext";
import clickCopyHandler from "@/src/utils/handlers/clickCopyHandler";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = { pixelArt: string[][] | number[][]};

export default function Result({ pixelArt }: Props) {
  const [bpstring, setBpstring] = useState<string>("Loading...")
  const { convertTo, quality, blackLampsAllowed, lampBgTile } = useContext(SettingsContext);

  useEffect(() => {
    let worker: Worker;
    
    switch (convertTo) {
      case 'lamp':
        worker = new Worker(new URL('../../workers/lampWorker.ts', import.meta.url));
        worker.postMessage({ 
          color_indexes: pixelArt as number[][], 
          quality, 
          blackLampsAllowed, 
          lampBgTile 
        });
        break;
      case 'tile':
        worker = new Worker(new URL('../../workers/tileWorker.ts', import.meta.url));
        worker.postMessage({ pixelArt: pixelArt as string[][] });
        break;
      case 'platform':
        worker = new Worker(new URL('../../workers/platformWorker.ts', import.meta.url));
        worker.postMessage({ pixelArt: pixelArt as number[][] });
        break;
    }

    if (worker) {
      worker.onmessage = (e) => {
        setBpstring(e.data);
        worker.terminate();
      };

      worker.onerror = (error) => {
        console.error('Worker error:', error);
        toast.error('Error generating blueprint');
        worker.terminate();
      };
    }

    return () => {
      if (worker) {
        worker.terminate();
      }
    };
  }, [convertTo, pixelArt, quality, blackLampsAllowed, lampBgTile]);

  return (
    <div>
      <p className="text-xl">Click on blueprint string to copy</p>
      <p className="break-all overflow-y-auto overflow-x-hidden max-h-64 outline mt-4"
        onClick={(e) => { clickCopyHandler(e).then(result => result ? toast.success('Successfully copied') : toast.error('Unable to copy')) }}>
        {bpstring}
      </p>
    </div>
  );
}
