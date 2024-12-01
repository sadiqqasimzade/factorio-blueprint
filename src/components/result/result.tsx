import SettingsContext from "@/src/contexts/settings/settingsContext";
import blueprintEncoder from "@/src/utils/convertors/blueprintEncoder";
import imgToTileBlueprintConvertor from "@/src/utils/convertors/imgToTileBlueprintConvertor";
import imgToLampBlueprintConvertor from "@/src/utils/convertors/imgToLampBlueprintConvertor";
import clickCopyHandler from "@/src/utils/handlers/clickCopyHandler";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


type Props = { pixelArt: string[][] | number[][]};

export default function Result({ pixelArt }: Props) {
  const [bpstring, setBpstring] = useState<string>()
  const { convertTo, quality, blackLampsAllowed } = useContext(SettingsContext);
  useEffect(() => {
    setBpstring(blueprintEncoder(
      convertTo === 'lamp'
        ? imgToLampBlueprintConvertor(pixelArt as number[][], quality, blackLampsAllowed)
        : imgToTileBlueprintConvertor(pixelArt as string[][]),
    ))
  }, [])

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
