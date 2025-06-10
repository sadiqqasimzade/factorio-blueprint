import { createContext } from 'react';

type ModalContextProps = {
    showModal: (content: React.ReactNode) => void;
    hideModal: () => void;
    modalIsActive: () => boolean;
};

const ModalContext = createContext<ModalContextProps>({
    hideModal: () => { },
    showModal: () => { },
    modalIsActive:()=>false
})


export default ModalContext;