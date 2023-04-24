import React, { useRef, useState } from 'react'
import Modal from '../modal/Modal'
import styles from './SizeInput.module.scss'
import AlertContainer from '../alert/AlertContainer'
type Props = {
    setPixelArtSize: React.Dispatch<React.SetStateAction<{ width: number, height: number } | undefined>>
    maxW: number;
    maxH: number;
    minW: number;
    minH: number;
    skipInput: boolean;
    setSkipInput: React.Dispatch<React.SetStateAction<boolean>>

}

const SizeInput = ({ setPixelArtSize, maxW, maxH, minW, minH, skipInput, setSkipInput }: Props) => {
    const widthRef = useRef<HTMLInputElement>(null)
    const heightRef = useRef<HTMLInputElement>(null)
    const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined)
    return (
        <Modal isActive={skipInput} setIsActive={setSkipInput}>
            <div>
                {alertMessage && <AlertContainer text={alertMessage} />}
                <div className={styles["input--group"]}>
                    <input type="number" placeholder="width" min={minW} max={maxW} ref={widthRef} className={styles["input"]} onChange={(e) => {
                        parseInt(e.target.value) > maxW ?
                            e.target.value = maxW.toString() :
                            parseInt(e.target.value) < minW ?
                                e.target.value = minW.toString() :
                                e.target.value = Math.floor(parseInt(e.target.value)).toString()

                    }} />
                    <p>max:{maxW} min:{minW}</p>
                </div>
                <div className={styles["input--group"]}>
                    <input type="number" placeholder="height" min={minH} max={maxH} ref={heightRef} className={styles["input"]} onChange={(e) => {
                        parseInt(e.target.value) > maxH ?
                            e.target.value = maxH.toString() :
                            parseInt(e.target.value) < minH ?
                                e.target.value = minH.toString() :
                                e.target.value = parseInt(e.target.value).toString()
                    }} />
                    <p>max:{maxH} min:{minH}</p>
                </div>
                <div>
                    <button type="button" className="button button__dark w-100" onClick={
                        () => {
                            let w = parseInt(widthRef.current!.value)
                            let h = parseInt(heightRef.current!.value)
                            if (w < minW || w > maxW || isNaN(w)) {
                                setAlertMessage("Please enter a valid width")
                                setTimeout(() => {
                                    setAlertMessage(undefined)
                                }, 2000)
                            }
                            else if (h < minH || h > maxH || isNaN(h)) {
                                setAlertMessage("Please enter a valid height")
                                setTimeout(() => {
                                    setAlertMessage(undefined)
                                },2000)
                            }
                            else {
                                setPixelArtSize({
                                    width: parseInt(widthRef.current!.value),
                                    height: parseInt(heightRef.current!.value)
                                });
                            }

                        }
                    }>Submit</button>
                </div>
            </div>

        </Modal>
    )
}

export default SizeInput