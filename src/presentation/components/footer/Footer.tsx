import React from 'react'
import styles from './Footer.module.scss'
type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer--container']}>
        <div className={styles['footer--left']}>
          <p className={styles['footer--text']}> © Sadiq Qasımzadə </p>
          <div className={styles['footer--icon--container']}>
            <a href='https://github.com/sadiqqasimzade' className={styles['footer--link']}>
              <img src='/imgs/socials/github.png' alt='github' className={styles['footer--icon']} />
            </a>
            <a href='https://www.linkedin.com/in/sadiq-qasımzadə/' className={styles['footer--link']}>
              <img src='/imgs/socials/linkedin.png' alt='linkedin' className={styles['footer--icon']} />
            </a>
          </div>
        </div>

        <div className={styles['footer--right']}>
          <p className={styles['footer--text']}>This Project</p>
          <div className={styles['footer--icon--container']}>
            <a href='https://github.com/sadiqqasimzade/factorio-blueprint' className={styles['footer--link']}>
              <img src='/imgs/socials/github.png' alt='github' className={styles['footer--icon']} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer