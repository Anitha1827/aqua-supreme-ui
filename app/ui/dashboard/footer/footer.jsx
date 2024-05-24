import React from 'react'
import styles from "./footer.module.css"

const Footer = () => {
  return (
    <div className={styles.container}>
        <div className={styles.logo}>LOGO</div>
        <div className={styles.text}>@ All Right reserved.</div>
    </div>
  )
}

export default Footer