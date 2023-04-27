import { PropsWithChildren, useEffect, useState } from "react";
import AlertContext from "./AlertContext";
import styles from './Alert.module.scss'



const AlertProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [alertContent, setAlertContent] = useState<{
        text: string,
        type: string,
    }[]>([]);
    const addAlert = (text: string, type: 'success' | 'error'): void => {
        setAlertContent(prevAlertContent => [...prevAlertContent, { text, type }])
    };

    useEffect(() => {
        if (alertContent.length > 0) {
            setTimeout(() => {
                setAlertContent(prevAlertContent => prevAlertContent.slice(1))
            }, 3000)
        }
        return () => {
        }
    }, [alertContent])

    return (
        <AlertContext.Provider value={{ addAlert }}>
            {children}
            {alertContent.length > 0 && (
                <div className={styles['alert--container']}>
                    {alertContent.map((alert, index) => (
                        <div className={`${styles['alert']} ${styles[`alert--${alert.type}`]}`} key={index} >
                            <p className={styles['alert--text']}>{alert.text}</p>
                        </div>
                    ))}
                </div>
            )}
        </AlertContext.Provider>
    );
};

export default AlertProvider;