import { createContext } from 'react';

type ModalContextProps = {
    // eslint-disable-next-line no-unused-vars
    showModal: (content: JSX.Element) => void;
    hideModal: () => void;
    modalIsActive: () => boolean;
};

const ModalContext = createContext<ModalContextProps>({
    hideModal: () => { },
    showModal: () => { },
    modalIsActive:()=>false
})


export default ModalContext;