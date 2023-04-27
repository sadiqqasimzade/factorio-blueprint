import { createContext } from 'react';

type AlertContextProps = {
    addAlert: (text: string, type: 'success' | 'error') => void;
};

const AlertContext = createContext<AlertContextProps>({
    addAlert: (): void => { },
});


export default AlertContext;