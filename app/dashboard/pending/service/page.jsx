"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { findingUser, getServicePendingData } from "@/service";
import { useRouter } from "next/navigation";

const ServicePendingPage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  // Pagination setup
  const [startIndex, setStartIndex] = useState(0);

  let router = useRouter();

  let getPendingDetails = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return null;
    }
    let res = await findingUser(token);
    let response = await getServicePendingData();
    let data = response.getAllServiceDetails;
    if (res.type === "serviceEngineer") {
      data = response.getAllServiceDetails.filter(
        (val) => val.serviceAssignTo && val.serviceAssignTo == res.user.name
      );
    }
    setData(data);
  };

  useEffect(() => {
    getPendingDetails();
  }, []);

  //code optimization for table row
  const Table = ({ data, idx }) => {
    <tr key={idx}>
      <td>{startIndex + idx + 1}</td>
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
            onClick={() => router.push(`/dashboard/service/${data._id}`)}
          >
            Update
          </button>
        </div>
      </td>
    </tr>;
  };
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
      <Pagination
        startIndex={startIndex}
        maxlength={data.length}
        setStartIndex={setStartIndex}
      />
    </div>
  );
};

export default ServicePendingPage;
