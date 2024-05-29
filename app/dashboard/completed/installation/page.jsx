"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { installationCompleted } from "@/service";

const InstallationCompletedPage = () => {
  const [data, setData] = useState([]);

  const getCompletedData = async () => {
    let response = await installationCompleted();
    setData(response.getdata);
    console.log("completeddata14", response.getdata);
  };
  useEffect(() => {
    getCompletedData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search a user..." />
      </div>
      <table className={styles.table}>
        <thead>
          <tr style={{fontWeight:"bold"}}>
            <td>Sl.No</td>
            <td>Name</td>
            <td>Contact</td>
            <td>CreatedAt</td>
            <td>CompletedAt</td>
            <td>Assigned-To</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((data, idx) => (
              <tr key={idx}>
                <td>{idx+1}</td>
                <td>{data.customerName}</td>
                <td>{data.customerPhone}</td>
                <td>{data.lastServicedAt.split("").slice(0,10).join("")}</td>
                <td>{data.duedate}</td>
                <td>{data.isInstallationAssignTo}</td>
                <td>
                  <button className={styles.compbutton}>Completed</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default InstallationCompletedPage;
