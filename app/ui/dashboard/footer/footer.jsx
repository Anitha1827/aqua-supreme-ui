import React from 'react'
import styles from "./footer.module.css"

const Footer = () => {
  return (
    <div className={styles.container}>
        <div className={styles.logo}>Aqua Supreme Pure</div>
        <div className={styles.text}>@ All Right reserved.</div>
    </div>
  )
}

export default Footer