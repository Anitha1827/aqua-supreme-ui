"use client";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import { findingUser, getServiceReminderCustomer } from "@/service";
import { FaRegEdit } from "react-icons/fa";
import { Button } from "@mui/material";
import EditDueDateModal from "@/container/EditDueDateModal";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { useRouter } from "next/navigation";
import SkeletonLoader from "@/container/SkeletonLoader";

const ServiceReminder = () => {
  let router = useRouter();
  const [search, setSearch] = useState("");
  const [reminder, setReminder] = useState({});
  const [open, setOpen] = useState(false);
  const [editdata, setEditdata] = useState({});
  // Pagination setup
  const [startIndex, setStartIndex] = useState(0);
  // Skeleton useState
  const [loading, setLoading] = useState(true);

  const handleOpen = (remind) => {
    setEditdata(remind);
    setOpen(true);
  };
  // Function to parse date in MM/DD/YYYY format
  function parseDate(dateStr) {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
  }

  // Function to sort customers by due date
  function sortByDueDate(customers) {
    return customers.sort(
      (a, b) => parseDate(a.duedate) - parseDate(b.duedate)
    );
  }

  // get service reminder data
  const getservicereminder = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return null;
    }
    let res = await findingUser(token);
    if (res.type === "serviceEngineer") {
      return router.push("/dashboard/installations");
    }

    let resp = await getServiceReminderCustomer();
    let data = resp.data.filter(
      (val) =>
        val.duedate && val.duedate.length > 0 && val.duedateReassignedCount <= 3
    );
    // Sort the customers array
    const sortedCustomers = sortByDueDate(data);
    setReminder(sortedCustomers);
    setLoading(false)
  };
  useEffect(() => {
    getservicereminder();
  }, []);

  //code optimization for table row
  const Table = ({ remind, idx }) => {
    return(<tr key={idx}>
      <td>{startIndex + idx + 1}</td>
      <td>{remind.customerName}</td>
      <td>{remind.customerPhone}</td>
      <td>{remind.lastServicedAt}</td>
      <td>
        {remind.duedate ? remind.duedate.split("").slice(0, 10).join("") : ""}
        <Button
          onClick={() => handleOpen(remind)}
          className={`${styles.button} ${styles.view}`}
          title="Edit"
          color="primary"
        >
          <FaRegEdit sx={{ fontSize: "20px" }} />
        </Button>
      </td>
      <td>{remind.serviceCount}</td>
    </tr>);
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
            <td>Phone Number</td>
            <td>Last Service Date</td>
            <td>DueDate</td>
            <td>Service Count</td>
          </tr>
        </thead>
        <tbody>
        {!loading && reminder.length > 0 &&
            (search.length <= 0
              ? reminder
                  .slice(startIndex, startIndex + 10)
                  .map((remind, idx) => (
                    <Table remind={remind} idx={idx} key={idx} />
                  ))
              : reminder.map(
                  (remind, idx) =>
                    (remind.customerName
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                      remind.customerPhone.includes(search)) && (
                      <Table remind={remind} idx={idx} key={idx} />
                    )
                ))}
        </tbody>
      </table>
      {loading && <SkeletonLoader/>}
      <Pagination
        startIndex={startIndex}
        maxlength={reminder.length}
        setStartIndex={setStartIndex}
      />
      {/* Edit Duedate modal */}
      {editdata.duedate && (
        <EditDueDateModal
          open={open}
          setOpen={setOpen}
          editdata={editdata}
          setReminder={setReminder}
        />
      )}
    </div>
  );
};

export default ServiceReminder;
