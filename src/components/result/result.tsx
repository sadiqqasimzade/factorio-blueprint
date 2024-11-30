import blueprintEncoder from "@/src/utils/convertors/blueprintEncoder";
import imgToBrickBlueprintConvertor from "@/src/utils/convertors/imgToBrickBlueprintConvertor";
import imgToLampBlueprintConvertor from "@/src/utils/convertors/imgToLampBlueprintConvertor";
import clickCopyHandler from "@/src/utils/handlers/clickCopyHandler";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


type Props = { pixelArt: string[][] | number[][]; convert_to: "lamp" | "brick"; quality: number };

export default function Result({ pixelArt, convert_to, quality }: Props) {
  const [bpstring, setBpstring] = useState<string>()
  useEffect(() => {
    setBpstring(blueprintEncoder(
      convert_to === 'lamp'
        ? imgToLampBlueprintConvertor(pixelArt as number[][], quality)
        : imgToBrickBlueprintConvertor(pixelArt as string[][]),
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
