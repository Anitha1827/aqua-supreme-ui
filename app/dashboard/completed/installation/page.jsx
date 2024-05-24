import React from 'react'
import styles from "@/app/ui/dashboard/users/users.module.css"
import Search from '@/app/ui/dashboard/search/search'
import Link from 'next/link'
import Pagination from '@/app/ui/dashboard/pagination/pagination'

const InstallationCompletedPage = () => {
  return (
    <div className={styles.container}>
    <div className={styles.top}>
      <Search placeholder="Search a user..."/>
      <Link href="/dashboard/users/add">
      <button className={styles.addbutton}>Add New</button>
      </Link>
      
    </div>
    <table className={styles.table}>
      <thead >
        <tr>
          <td>Sl.No</td>
          <td>Name</td>
          <td>Contact</td>
          <td>Created At</td>
          <td>Date</td>
          <td>Assign-To</td>
          <td>Status</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>
            Anitha
          </td>
          <td>1234567890</td>
          <td>18-05-2024</td>
          <td>23-05-2024</td>
          <td>Anitha</td>
          <td>
            <button className={styles.compbutton}>Completed</button>
          </td>
          <td>
            <div className={styles.buttons}>
            <Link href="/">
            <button className={`${styles.button} ${styles.view}`}>Edit</button>
            </Link>
            <button className={`${styles.button} ${styles.delete}`}>Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination/>
  </div>
  )
}

export default InstallationCompletedPage