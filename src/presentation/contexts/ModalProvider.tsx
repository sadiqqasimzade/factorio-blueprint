import { useState } from "react";
import ModalContext from "./ModalContext";
import styles from "./Modal.module.scss";

const ModalProvider: React.FC = ({ children }) => {
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

    const showModal = (content: JSX.Element) => {
        setModalContent(content);
    };

    const hideModal = () => {
        setModalContent(null);
    };

    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            {children}
            {modalContent && (
                <div className={`${styles["modal--container"]} `} onClick={hideModal}>
                    <div className={styles["modal--inner"]} onClick={(e) => { e.stopPropagation(); }}>
                        <div className={styles["modal--content"]}>
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};

export default ModalProvider;