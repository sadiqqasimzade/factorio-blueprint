import { PropsWithChildren, useEffect, useState } from "react";
import ModalContext from "./modalContext";

const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

    const showModal = (content: JSX.Element): void => {
        setModalContent(content);
    };

    const hideModal = (): void => {
        setModalContent(null);
    };

    const modalIsActive = (): boolean => {
        return modalContent !== null;
    }

    useEffect(() => {
        function handleKeydown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setModalContent(null);
                window.removeEventListener("keydown", handleKeydown);
            }
        }
        window.addEventListener("keydown", handleKeydown);

        return () => window.removeEventListener("keydown", handleKeydown);
    }, []);


    return (
        <ModalContext.Provider value={{ showModal, hideModal,modalIsActive }}>
            {children}
            {modalContent && (
                <div className='fixed w-full h-full bg-black bg-opacity-60 flex justify-center items-center transition-transform duration-500 will-change-transform top-0 left-0' onClick={hideModal}>
                    <div className='bg-white min-w-[100px] min-h-[100px] rounded-[50px]' onClick={(e) => { e.stopPropagation(); }}>
                        <div className='p-8'>
                            {modalContent}
                        </div>
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};

export default ModalProvider;