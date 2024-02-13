import blueprintEncoder from "@/src/utils/convertors/blueprintEncoder";
import imgToBrickBlueprintConvertor from "@/src/utils/convertors/imgToBrickBlueprintConvertor";
import imgToLampBlueprintConvertor from "@/src/utils/convertors/imgToLampBlueprintConvertor";
import clickCopyHandler from "@/src/utils/handlers/clickCopyHandler";
import { calculateColorsForLamps } from "@/src/utils/image/calculateColors";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


type Props = { pixelArt: string[][]; convert_to: "lamp" | "brick" };

export default function Result({ pixelArt, convert_to }: Props) {
  const [bpstring, setBpstring] = useState<string>()
  useEffect(() => {
    setBpstring(blueprintEncoder(
      convert_to === 'lamp'
        ? imgToLampBlueprintConvertor(calculateColorsForLamps(pixelArt))
        : imgToBrickBlueprintConvertor(pixelArt),
    ))
  }, [])

  return (
    <div>
      <p className="text-xl">Click on blueprint string to copy</p>
      <p className="break-all overflow-y-auto overflow-x-hidden max-h-64 outline mt-4"
        onClick={(e) => { clickCopyHandler(e).then(result => result ? toast.success('Succesfully copied') : toast.error('Unable to copy')) }}>
        {bpstring}
      </p>
    </div>
  );
}
