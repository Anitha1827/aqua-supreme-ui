"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { installationPending } from "@/service";
import { useRouter } from "next/navigation";

const InstallationPendingPage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  let router = useRouter();

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
        <div className={styles.searchcontainer}>
        <SearchIcon className={styles.searchicon} />
          <input
            className={styles.searchfield}
            placeholder="Search..."
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
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
          {data && search.length <= 0
            ? data.map((data, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{data.customerName}</td>
                  <td>{data.customerPhone}</td>
                  <td>{data.createdAt.split("").slice(0, 10).join("")}</td>
                  <td>{data.duedate.split("").slice(0, 10).join("")}</td>
                  <td>{data.isInstallationAssignTo}</td>
                  <td>
                    <button className={styles.pendbutton}>Pending</button>
                  </td>
                  <td>
                    <div className={styles.buttons}>
                      <button
                        className={styles.addbutton}
                        onClick={() =>
                          router.push(`/dashboard/installations/${data._id}`)
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
                      <td>
                        {data.lastServicedAt.split("").slice(0, 10).join("")}
                      </td>
                      <td>{data.duedate}</td>
                      <td>{data.isInstallationAssignTo}</td>
                      <td>
                        <button className={styles.pendbutton}>Pending</button>
                      </td>
                      <td>
                        <div className={styles.buttons}>
                          <button
                            className={styles.addbutton}
                            onClick={() =>
                              router.push(
                                `/dashboard/installations/${data._id}`
                              )
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

export default InstallationPendingPage;
