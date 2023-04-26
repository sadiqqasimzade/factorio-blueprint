import { createContext } from 'react';

type ModalContextProps = {
    showModal: (content: JSX.Element) => void;
    hideModal: () => void;
};

const ModalContext = createContext<ModalContextProps>({
    showModal: () => { },
    hideModal: () => { },
});


export default ModalContext;