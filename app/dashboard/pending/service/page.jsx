"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { getServicePendingData } from "@/service";
import { useRouter } from "next/navigation";

const ServicePendingPage = () => {
  const [data, setData] = useState();

  let router = useRouter();

  let getPendingDetails = async () => {
    let response = await getServicePendingData();
    setData(response.getAllServiceDetails);
  };

  useEffect(() => {
    getPendingDetails();
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
            <td>UpdatedAt</td>
            <td>Assigned-To</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((data, idx) => (
              <tr key={idx}>
                <td>{idx+1}</td>
                <td>{data.customerName}</td>
                <td>{data.customerPhone}</td>
                <td>{data.createdAt}</td>
                <td>{data.serviceDate.split("").slice(0,10).join("")}</td>
                <td>{data.serviceAssignTo}</td>
                <td>
                  <button className={styles.pendbutton}>Pending</button>
                </td>
                <td>
                  <div className={styles.buttons}>
                    <button className={styles.addbutton} onClick={()=>router.push(`/dashboard/service/${data._id}`)}>
                      Update
                    </button>
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

export default ServicePendingPage;
