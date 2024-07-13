"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { findingUser, installationCompleted } from "@/service";
import { useRouter } from "next/navigation";
import SkeletonLoader from "@/container/SkeletonLoader";

const InstallationCompletedPage = () => {
  let router = useRouter();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  // Pagination setup
  const [startIndex, setStartIndex] = useState(0);
  // Skeleton useState
  const [loading, setLoading] = useState(true);

  const getCompletedData = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return null;
    }
    let res = await findingUser(token);
    let response = await installationCompleted();
    let data = response.getdata;
    if (res.type === "serviceEngineer") {
      data = response.getdata.filter(
        (val) =>
          val.isInstallationAssignTo &&
          val.isInstallationAssignTo == res.user.name
      );
    }
    setData(data);
    setLoading(false)
    console.log("completeddata14", response.getdata);
  };
  useEffect(() => {
    getCompletedData();
  }, []);

  //code optimization for table row
  const Table = ({ data, idx }) => {
    return(
      <tr key={idx}>
      <td>{startIndex + idx + 1}</td>
      <td>{data.customerName}</td>
      <td>{data.customerPhone}</td>
      <td>{data.lastServicedAt.split("").slice(0, 10).join("")}</td>
      <td>
        {data.duedate ? data.duedate.split("").slice(0, 10).join("") : ""}
      </td>
      <td>{data.isInstallationAssignTo}</td>
      <td>
        <button className={styles.compbutton}>Completed</button>
      </td>
    </tr>
    )
  };

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
            <td>Created At</td>
            <td>Completed At</td>
            <td>Assigned-To</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
        {!loading && data && search.length <= 0
            ? data
                .slice(startIndex, startIndex + 10)
                .map((data, idx) => <Table data={data} idx={idx} key={idx} />)
            : data.map(
                (data, idx) =>
                  (data.customerName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                    data.customerPhone.includes(search)) && (
                    <Table data={data} idx={idx} key={idx} />
                  )
              )}
        </tbody>
      </table>
      {loading && <SkeletonLoader/>}
      <Pagination
        startIndex={startIndex}
        maxlength={data.length}
        setStartIndex={setStartIndex}
      />
    </div>
  );
};

export default InstallationCompletedPage;
