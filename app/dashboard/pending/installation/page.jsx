"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { installationPending } from "@/service";
import { useRouter } from "next/navigation";

const InstallationPendingPage = () => {
  const [data, setData] = useState([]);

  let router = useRouter()

  const getPendingData = async () => {
    let response = await installationPending();
    console.log("pending15", response.getpendingdata);
    setData(response.getpendingdata);
  };

  useEffect(() => {
    getPendingData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search a user..." />
      </div>
      <table className={styles.table}>
        <thead>
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
          {data &&
            data.map((data, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{data.customerName}</td>
                <td>{data.customerPhone}</td>
                <td>{data.lastServicedAt.split("").slice(0,10).join("")}</td>
                <td>{data.duedate}</td>
                <td>{data.isInstallationAssignTo}</td>
                <td>
                  <button className={styles.pendbutton}>Pending</button>
                </td>
                <td>
                  <div className={styles.buttons}>
                    <button className={styles.addbutton} onClick={()=> router.push(`/dashboard/installations/${data._id}`)}>Update</button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default InstallationPendingPage;
