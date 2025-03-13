import SettingsContext from "@/src/contexts/settings/settingsContext";
import blueprintEncoder from "@/src/utils/convertors/blueprintEncoder";
import imgToLampBlueprintConvertor from "@/src/utils/convertors/imgToLampBlueprintConvertor";
import imgToPlatformBlueprintConvertor from "@/src/utils/convertors/imgToPlatformBlueprintConvertor";
import imgToTileBlueprintConvertor from "@/src/utils/convertors/imgToTileBlueprintConvertor";
import clickCopyHandler from "@/src/utils/handlers/clickCopyHandler";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


type Props = { pixelArt: string[][] | number[][]};

export default function Result({ pixelArt }: Props) {
  const [bpstring, setBpstring] = useState<string>()
  const { convertTo, quality, blackLampsAllowed, lampBgTile } = useContext(SettingsContext);
  useEffect(() => {
    let blueprint;
    switch (convertTo) {
      case 'lamp':
        blueprint = imgToLampBlueprintConvertor({ color_indexes: pixelArt as number[][], quality, blackLampsAllowed, lampBgTile });
        break;
      case 'tile':
        blueprint = imgToTileBlueprintConvertor(pixelArt as string[][]);
        break;
      case 'platform':
        blueprint = imgToPlatformBlueprintConvertor(pixelArt as number[][]);
        break;
    }

    setBpstring(blueprintEncoder(blueprint));
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
