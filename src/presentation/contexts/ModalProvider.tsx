import { PropsWithChildren, useEffect, useState } from "react";
import ModalContext from "./ModalContext";
import styles from "./Modal.module.scss";

const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

    const showModal = (content: JSX.Element): void => {
        setModalContent(content);
    };

    const hideModal = (): void => {
        setModalContent(null);
    };

    const getContent = (): boolean => {
        return modalContent !== null;
    }
    useEffect(() => {
        function handekeydown(e: KeyboardEvent) {
            if (e.key == "Escape") {
                setModalContent(null);
                window.removeEventListener("keydown", handekeydown);
            }
        }
        window.addEventListener("keydown", handekeydown);

        return () => window.removeEventListener("keydown", handekeydown);
    }, []);


    return (
        <ModalContext.Provider value={{ showModal, hideModal, getContent }}>
            {children}
            {modalContent && (
                <div className={`${styles["modal--container"]} `} onClick={hideModal}>
                    <div className={styles["modal--inner"]} onClick={(e) => { e.stopPropagation(); }}>
                        <div className={styles["modal--content"]}>
                            {modalContent}
                        </div>
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};

export default ModalProvider;