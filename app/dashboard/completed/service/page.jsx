"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { findingUser, getServiceCompleted } from "@/service";
import { useRouter } from "next/navigation";

const ServiceCompletedPage = () => {
  let router = useRouter();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  // Pagination setup
  const [startIndex, setStartIndex] = useState(0);

  let getCompletedData = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return null;
    }
    let res = await findingUser(token);
    let response = await getServiceCompleted();
    let data = response.getAllServiceDetails;
    if (res.type === "serviceEngineer") {
      data = response.getAllServiceDetails.filter(
        (val) =>
          val.isInstallationAssignTo &&
          val.isInstallationAssignTo == res.user.name
      );
    }
    setData(data);
    console.log("completedpage14", response.getAllServiceDetails);
  };

  useEffect(() => {
    getCompletedData();
  }, []);

  //code optimization for table row
  const Table = ({ item, idx }) => {
    return(
      <tr key={idx}>
      <td>{startIndex + idx + 1}</td>
      <td>{item.customerName}</td>
      <td>{item.customerPhone}</td>
      <td>{item.createdAt}</td>
      <td>{item.updatedAt}</td>
      <td>{item.serviceAssignTo}</td>
      <td>
        <button className={styles.compbutton}>Completed</button>
      </td>
    </tr>
    );
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
          <tr style={{ fontWeight: "bolder" }}>
            <td>Sl.No</td>
            <td>Name</td>
            <td>Contact</td>
            <td>CreatedAt</td>
            <td>CompletedAt</td>
            <td>Service Engineer</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {data && search.length <= 0
            ? data
                .slice(startIndex, startIndex + 10)
                .map((item, idx) => <Table item={item} idx={idx} key={idx} />)
            : data.map(
                (item, idx) =>
                  (item.customerName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                    item.customerPhone.includes(search)) && (
                    <Table item={item} idx={idx} key={idx} />
                  )
              )}
          <tr></tr>
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

export default ServiceCompletedPage;
