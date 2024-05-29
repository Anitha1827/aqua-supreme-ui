"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { getServiceCompleted } from "@/service";

const ServiceCompletedPage = () => {
  const [data, setData] = useState([]);

  let getCompletedData = async () => {
    let response = await getServiceCompleted();
    setData(response.getAllServiceDetails);
    console.log("completedpage14", response.getAllServiceDetails);
  };

  useEffect(() => {
    getCompletedData();
  }, []);
  console.log("responsedata23", data);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search a user..." />
      </div>
      <table className={styles.table}>
        <thead>
          <tr style={{fontWeight:"bolder"}}>
            <td>Sl.No</td>
            <td>Name</td>
            <td>Contact</td>
            <td>CreatedAt</td>
            <td>CompletedAt</td>
            <td>Technician</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, idx) => (
              <tr key={idx}>
                <td>{idx+1}</td>
                <td>{item.customerName}</td>
                <td>{item.customerPhone}</td>
                <td>{item.createdAt}</td>
                <td>{item.serviceDate.split("").slice(0,10).join("")}</td>
                <td>{item.serviceAssignTo}</td>
                <td>
                  <button className={styles.compbutton}>Completed</button>
                </td>
              </tr>
            ))}
          <tr></tr>
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default ServiceCompletedPage;
