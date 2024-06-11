"use client";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import { getServiceReminderCustomer } from "@/service";
import { FaRegEdit } from "react-icons/fa";
import { Button } from "@mui/material";
import EditDueDateModal from "@/container/EditDueDateModal";

const ServiceReminder = () => {
  const [search, setSearch] = useState("");
  const [reminder, setReminder] = useState({});
  const [open, setOpen] = useState(false);
  const [editdata, setEditdata] = useState({});

  const handleOpen = (remind) => {
   setEditdata(remind)
    setOpen(true);
  }
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
    let resp = await getServiceReminderCustomer();
    let data = resp.data.filter((val) => val.duedate && val.duedate.length > 0);
    // Sort the customers array
    const sortedCustomers = sortByDueDate(data);
    setReminder(sortedCustomers);
  };
  useEffect(() => {
    getservicereminder();
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
            <td>Phone Number</td>
            <td>last service Date</td>
            <td>dueDate</td>
            <td>service Count</td>
          </tr>
        </thead>
        <tbody>
          {reminder.length > 0 &&
            reminder.map((remind, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{remind.customerName}</td>
                <td>{remind.customerPhone}</td>
                <td>{remind.lastServicedAt}</td>
                <td>
                  {remind.duedate}
                  <Button
                    onClick={()=> handleOpen(remind)}
                    className={`${styles.button} ${styles.view}`}
                    title="Edit"
                    color="primary"
                  >
                    <FaRegEdit sx={{ fontSize: "20px" }} />
                  </Button>
                </td>
                <td>{remind.serviceCount}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Edit Duedate modal */}
      {editdata.duedate && (
        <EditDueDateModal open={open} setOpen={setOpen} editdata={editdata} setReminder={setReminder} />
      )}
    </div>
  );
};

export default ServiceReminder;