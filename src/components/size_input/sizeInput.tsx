import ModalContext from '@/src/contexts/modal/modalContext';
import SettingsContext from '@/src/contexts/settings/settingsContext';
import { useContext, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

type Props = {
    setPixelArtSize: React.Dispatch<React.SetStateAction<{ width: number, height: number } | undefined>>
}

export default function SizeInput({ setPixelArtSize }: Props) {
    const { showModal, hideModal, modalIsActive } = useContext(ModalContext)
    const { maxWidth, maxHeight, minWidth, minHeight, setSkipInput } = useContext(SettingsContext);

    const widthRef = useRef<HTMLInputElement>(null)
    const heightRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        showModal(
            <div className='flex flex-col place-content-center text-black w-56'>
                <div>
                    <input type="number" placeholder="width" min={minWidth} max={maxWidth} ref={widthRef} className="bg-transparent w-full p-2 outline-none border-b-2" />
                    <p>max:{maxWidth} min:{minWidth}</p>
                </div>
                <div>
                    <input type="number" placeholder="height" min={minHeight} max={maxHeight} ref={heightRef} className="bg-transparent w-full p-2 outline-none border-b-2" />
                    <p>max:{maxHeight} min:{minHeight}</p>
                </div>
                <div>
                    <button type="button" className='p-2 w-full bg-blue-400 hover:bg-blue-600 text-black hover:text-white transition-colors mt-5 rounded-md' onClick={
                        () => {
                            const w = parseInt(widthRef.current!.value)
                            const h = parseInt(heightRef.current!.value)
                            if (w < minWidth || w > maxWidth || isNaN(w)) {
                                toast.error("Please enter a valid width")
                            }
                            else if (h < minHeight || h > maxHeight || isNaN(h)) {
                                toast.error("Please enter a valid height")
                            }
                            else {
                                setPixelArtSize({
                                    width: parseInt(widthRef.current!.value),
                                    height: parseInt(heightRef.current!.value)
                                });
                                hideModal()
                            }
                        }
                    }>Submit</button>
                </div>
            </div >
        )
    }, [])

    useEffect(() => {
        !modalIsActive() && setSkipInput(false)
    }, [modalIsActive()])

    return (
        <></>
    )
}