import ModalContext from '@/src/contexts/modalContext';
import { useContext, useEffect, useRef } from 'react'
import { toast } from 'react-toastify';

type Props = {
    setPixelArtSize: React.Dispatch<React.SetStateAction<{ width: number, height: number } | undefined>>
    maxW: number;
    maxH: number;
    minW: number;
    minH: number;
    setSkipInput: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SizeInput({ setPixelArtSize, maxW, maxH, minW, minH, setSkipInput }: Props) {
    const { showModal, hideModal, modalIsActive } = useContext(ModalContext)
    const widthRef = useRef<HTMLInputElement>(null)
    const heightRef = useRef<HTMLInputElement>(null)
    
    useEffect(() => {
        showModal(
            <div className='flex flex-col place-content-center text-black w-56'>
                <div>
                    <input type="number" placeholder="width" min={minW} max={maxW} ref={widthRef} className="bg-transparent w-full p-2 outline-none border-b-2" />
                    <p>max:{maxW} min:{minW}</p>
                </div>
                <div>
                    <input type="number" placeholder="height" min={minH} max={maxH} ref={heightRef} className="bg-transparent w-full p-2 outline-none border-b-2" />
                    <p>max:{maxH} min:{minH}</p>
                </div>
                <div>
                    <button type="button" className='p-2 w-full bg-blue-400 hover:bg-blue-600 text-black hover:text-white transition-colors mt-5 rounded-md' onClick={
                        () => {
                            const w = parseInt(widthRef.current!.value)
                            const h = parseInt(heightRef.current!.value)
                            if (w < minW || w > maxW || isNaN(w)) {
                                toast.error("Please enter a valid width")
                            }
                            else if (h < minH || h > maxH || isNaN(h)) {
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
            </div>
        )
    }, [])

    useEffect(() => {
        !modalIsActive() && setSkipInput(false)
    }, [modalIsActive()])

    return (
        <></>
    )
}