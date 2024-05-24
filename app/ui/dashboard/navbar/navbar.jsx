"use client"
import React from 'react'
import styles from "./navbar.module.css"
import { usePathname } from 'next/navigation'
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from 'react-icons/md'
import Image from 'next/image'
import styles2 from  "../navbar/sidebar/sidebar.module.css"


const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <div className={styles.title}>
      {pathname.split("/").pop()}
      </div>
      <div className={styles.menu}>
      <div className={styles.icons}>
          {/* <MdOutlineChat size={20}/> */}
          <MdNotifications size={30}/>
          {/* <MdPublic size={20}/> */}
        </div>
      <div className={`${styles2.user}`}>
        <Image
          className={styles2.userImage}
          src="/noavatar.png"
          alt=""
          width="50"
          height="50"
        />
        <div className={styles2.userDetail}>
          <span className={styles2.username}>Anitha</span>
          <span className={styles2.userTitle}>Administrator</span>
        </div>
      </div>
        
      </div>
    </div>
  )
}

export default Navbar