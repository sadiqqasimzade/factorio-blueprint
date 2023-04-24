import styles from './Alert.module.scss'


type Props = {
    text: string;
}

const AlertContainer = ({ text }: Props) => {

    return (
        <div className={styles['alert--container']}>
            <div className={styles['alert']} >
                <p className={styles['alert--text']}>{text}</p>
            </div>
        </div>
    )
}

export default AlertContainer