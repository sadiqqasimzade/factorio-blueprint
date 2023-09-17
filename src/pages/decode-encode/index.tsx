import Container from "@/src/components/shared/container";
import blueprintDecoder from "@/src/utils/convertors/blueprintDecoder";
import BlueprintEncoder from "@/src/utils/convertors/blueprintEncoder";
import clickCopyHandler from "@/src/utils/handlers/clickCopyHandler";
import Head from "next/head";
import { useRef} from "react";
import { toast } from "react-toastify";

export default function DecodeEncodePage() {
    const resultRef = useRef<HTMLParagraphElement>(null);


    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const p = resultRef.current as HTMLParagraphElement;
        const value = e.target.value;
        try {
            if (value.startsWith('0')) {
                p.innerText = JSON.stringify(blueprintDecoder(e.target.value), null, 2);
            }
            else if (value.startsWith('{')) {
                p.innerText = BlueprintEncoder(JSON.parse(e.target.value))
            }
            else {
                throw new Error('Invalid blueprint string')
            }
        } catch (error) {
            p.innerText = 'Cant parse given blueprint sting to json';
        }
    };

    return (
        <Container>
            <Head>
                <title>Decode/Encode Blueprint</title>
            </Head>
            <div className="flex flex-col justify-center gap-5">
                <p className="text-2xl font-bold">Paste Blueprint JSON to encode or Blueprint String to decode it</p>
                <p>You can click on result to copy it</p>
                <div className="bg-gradient-to-b from-gray-800 to-zinc-800 mt-2 rounded-2xl p-5 border-gray-600 border-4">
                    <h2 className="text-center">Base64 Blueprint string/Blueprint JSON</h2>
                    <input
                        placeholder="Blueprint string"
                        className="border-b-2 border-white bg-transparent py-3 w-full outline-none"
                        onChange={inputChange}
                    ></input>
                    <p
                        className="h-96 overflow-y-auto mt-5 break-all transition-all"
                        ref={resultRef}
                        onClick={(e) => { clickCopyHandler(e).then(result => result ? toast.success('Succesfully copied') : toast.error('Unable to copy')) }}>
                    </p>
                </div>
            </div>
        </Container>
    )
}