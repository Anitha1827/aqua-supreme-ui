"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { getServicePendingData } from "@/service";
import { useRouter } from "next/navigation";

const ServicePendingPage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

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
        <div className={styles.searchcontainer}>
          <SearchIcon className={styles.searchicon} />
          <input
            className={styles.searchfield}
            placeholder="search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr style={{ fontWeight: "bold" }}>
            <td>Sl.No</td>
            <td>Name</td>
            <td>Contact</td>
            <td>UpdatedAt</td>
            <td>Assigned-To</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data && search.length <= 0
            ? data.map((data, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{data.customerName}</td>
                  <td>{data.customerPhone}</td>
                  <td>{data.updatedAt}</td>
                  <td>{data.serviceAssignTo}</td>
                  <td>
                    <button className={styles.pendbutton}>Pending</button>
                  </td>
                  <td>
                    <div className={styles.buttons}>
                      <button
                        className={styles.addbutton}
                        onClick={() =>
                          router.push(`/dashboard/service/${data._id}`)
                        }
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            : data.map(
                (data, idx) =>
                  (data.customerName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                    data.customerPhone.includes(search)) && (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{data.customerName}</td>
                      <td>{data.customerPhone}</td>
                      <td>{data.createdAt}</td>
                      <td>
                        {data.serviceDate.split("").slice(0, 10).join("")}
                      </td>
                      <td>{data.serviceAssignTo}</td>
                      <td>
                        <button className={styles.pendbutton}>Pending</button>
                      </td>
                      <td>
                        <div className={styles.buttons}>
                          <button
                            className={styles.addbutton}
                            onClick={() =>
                              router.push(`/dashboard/service/${data._id}`)
                            }
                          >
                            Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
              )}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default ServicePendingPage;
