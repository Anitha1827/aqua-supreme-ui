"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { findingUser, installationPending } from "@/service";
import { useRouter } from "next/navigation";

const InstallationPendingPage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  // Pagination setup
  const [startIndex, setStartIndex] = useState(0);

  let router = useRouter();

  const getPendingData = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return null;
    }
    let res = await findingUser(token);
    let response = await installationPending();
    let data = response.getpendingdata;
    if(res.type === "serviceEngineer"){
      data = response.getpendingdata.filter(
        (val) =>
          val.isInstallationAssignTo &&
          val.isInstallationAssignTo == res.user.name
      );
    }
    console.log("pending15", response.getpendingdata);
    setData(data);
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
            ? data.slice(startIndex, startIndex + 10).map((data, idx) => (
                <tr key={idx}>
                  <td>{startIndex + idx + 1}</td>
                  <td>{data.customerName}</td>
                  <td>{data.customerPhone}</td>
                  <td>{data.createdAt}</td>
                  <td>{data.duedate ? data.duedate.split("").slice(0, 10).join(""):""}</td>
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
                        {data.lastServicedAt ? data.lastServicedAt.split("").slice(0, 10).join("") : ""}
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
      <Pagination
        startIndex={startIndex}
        maxlength={data.length}
        setStartIndex={setStartIndex}
      />
    </div>
  );
};

export default InstallationPendingPage;
