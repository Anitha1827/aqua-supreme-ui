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
import DeleteIcon from "@mui/icons-material/Delete";
import { FaRegEdit } from "react-icons/fa";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleOpen = () => setOpen(true);
  let router = useRouter();

  // Edit Functionalities
  const handleEdit = (customer) => {
    setEdit(true);
    setEditData(customer);
  };

  const [editdata, setEditData] = useState({});
  const [customer, setCustomer] = useState([]);

  // To get Customer details from DB
  let getCustomerDetails = async () => {
    let res = await getCustomer();
    setCustomer(res.getAllCustomerDetails);
  };
  useEffect(() => {
    getCustomerDetails();
  }, []);

  // Delete functionalities
  const handleDelete = async (item) => {
    let res = await deleteCustomer(item._id);
    console.log(res);
    getCustomerDetails();
  };

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
          <tr style={{ fontWeight: "bold" }}>
            <td>Sl.No</td>
            <td>Name</td>
            <td>Phone Number</td>
            <td>Service/InstalledAt</td>
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
                  <div
                    className={`${styles.buttons} ${styles.button} ${styles.view}`}
                  >
                    <Button
                      onClick={() => handleEdit(item)}
                      className={`${styles.button} ${styles.view}`}
                      title="Edit"
                      color="primary"
                    >
                      <FaRegEdit sx={{ fontSize: "20px" }} />
                    </Button>

                    {/* Details */}
                    <Button
                      title="Customer Details"
                      onClick={() =>
                        router.push(`/dashboard/customerdetails/${item._id}`)
                      }
                    >
                      <SettingsAccessibilityIcon sx={{ fontSize: "20px" }} />
                    </Button>

                    <Button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(item)}
                      title="Delete"
                    >
                      <DeleteIcon sx={{ fontSize: "20px", color: "crimson" }} />
                    </Button>
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
