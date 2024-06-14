"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { installationCompleted } from "@/service";

const InstallationCompletedPage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  // Pagination setup
  const [startIndex, setStartIndex] = useState(0);

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
        <div className={styles.searchcontainer}>
          <SearchIcon className={styles.searchicon} />
          <input
            className={styles.searchfield}
            placeholder="Search..."
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
            <td>CreatedAt</td>
            <td>CompletedAt</td>
            <td>Assigned-To</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {data && search.length <= 0
            ? data.slice(startIndex, startIndex + 10).map((data, idx) => (
                <tr key={idx}>
                  <td>{startIndex + idx + 1}</td>
                  <td>{data.customerName}</td>
                  <td>{data.customerPhone}</td>
                  <td>{data.lastServicedAt.split("").slice(0, 10).join("")}</td>
                  <td>{data.duedate}</td>
                  <td>{data.isInstallationAssignTo}</td>
                  <td>
                    <button className={styles.compbutton}>Completed</button>
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
                        <button className={styles.compbutton}>Completed</button>
                      </td>
                    </tr>
                  )
              )}
        </tbody>
      </table>
      <Pagination
        startIndex={startIndex}
        maxlength={data.length}
        setStartIndex={setStartIndex}
      />
    </div>
  );
};

export default InstallationCompletedPage;
