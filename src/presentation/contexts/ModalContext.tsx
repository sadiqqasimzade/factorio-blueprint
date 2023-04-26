import { createContext } from 'react';

type ModalContextProps = {
    showModal: (content: JSX.Element) => void;
    hideModal: () => void;
    getContent: () => boolean;
};

const ModalContext = createContext<ModalContextProps>({
    showModal: (): void => { },
    hideModal: (): void => { },
    getContent: (): boolean => { return true}
});


export default ModalContext;