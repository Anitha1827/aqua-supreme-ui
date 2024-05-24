"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "../ui/dashboard/search/search";
import Pagination from "../ui/dashboard/pagination/pagination";
// modal
import Button from "@mui/material/Button";
import AddCustomerModel from "@/container/AddCustomerModal";
import { deleteCustomer, getCustomer } from "@/service";
import EditCustomerModal from "@/container/EditCustomerModal";
// icons
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleEdit = (customer) => {
    setEdit(true);
    setEditData(customer);
    console.log("customer20", customer);
  };

  const [editdata, setEditData] = useState({});
  const [customer, setCustomer] = useState([]);

  let getCustomerDetails = async () => {
    let res = await getCustomer();
    console.log(res.getAllCustomerDetails, "custmodal26");
    setCustomer(res.getAllCustomerDetails);
  };
  useEffect(() => {
    getCustomerDetails();
  }, []);

  const handleDelete = async (item) => {
    let res = await deleteCustomer(item._id);
    console.log(res);
    getCustomerDetails();
  };

  console.log("customer35", customer);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search a user..." />
        <Button
          onClick={handleOpen}
          variant="contained"
          className={styles.addbutton}
        >
          Add
        </Button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Sl.No</td>
            <td>Name</td>
            <td>Phone Number</td>
            <td>Service/Installed At</td>
            <td>Due Date</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {customer.length > 0 &&
            customer.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.customerName}</td>
                <td>{item.customerPhone}</td>
                <td>
                  {item.lastServicedAt
                    ? item.lastServicedAt.split("").splice(0, 10).join("")
                    : "24-05-2024"}
                </td>
                <td>{item.duedate}</td>
                <td>
                  <div className={styles.buttons}>
                    <Button
                      onClick={() => handleEdit(item)}
                      className={`${styles.button} ${styles.view}`}
                    >
                      <FaRegEdit />
                    </Button>

                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(item)}
                    >
                      <MdOutlineDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination />
      {/* Add Customer Modal */}
      <AddCustomerModel
        open={open}
        setOpen={setOpen}
        setCustomer={setCustomer}
      />

      {/* Edit Customer Modal */}
      {editdata.customerName && (
        <EditCustomerModal
          edit={edit}
          setEdit={setEdit}
          editdata={editdata}
          setCustomer={setCustomer}
        />
      )}
    </div>
  );
};

export default Dashboard;
