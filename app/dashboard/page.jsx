"use client";
import React, { forwardRef, useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "../ui/dashboard/pagination/pagination";
// modal
import Button from "@mui/material/Button";
import AddCustomerModel from "@/container/AddCustomerModal";
import { deleteCustomer, findingUser, getAllCustomer } from "@/service";
import EditCustomerModal from "@/container/EditCustomerModal";
// icons
import DeleteIcon from "@mui/icons-material/Delete";
import { FaRegEdit } from "react-icons/fa";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/navigation";
import SkeletonLoader from "@/container/SkeletonLoader";
//alert Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AlertMessage from "@/container/AlertMessage";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  //for Dialog
  const [alert, setAlert] = useState(false);

  const handleClose = () => {
    setAlert(false);
  };

  // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  // Skeleton useState
  const [loading, setLoading] = useState(true);
  const handleOpen = () => setOpen(true);
  let router = useRouter();

  // Edit Functionalities
  const handleEdit = (customer) => {
    setEditData(customer);
    setEdit(true);
  };

  const [editdata, setEditData] = useState({});
  const [customer, setCustomer] = useState([]);
  const [search, setSearch] = useState("");
  // Pagination setup
  const [startIndex, setStartIndex] = useState(0);

  // To get Customer details from DB
  let getCustomerDetails = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return null;
    }
    let res = await findingUser(token);
    if (res.type === "serviceEngineer") {
      return router.push("dashboard/installations");
    }
    let response = await getAllCustomer();
    setCustomer(response.getAllCustomerDetails);
    setLoading(false);
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      getCustomerDetails();
    }
  }, []);

  // Delete functionalities
  const handleDelete = async (item) => {
    let res = await deleteCustomer(item._id);
    if (res.message !== "Deleted Customer details succesfully!") {
      setMessage(true);
      setContent("try again later");
      setType("error");
      return null;
    }
    setMessage(true);
    setContent("Deleted Customer details succesfully!");
    setType("success");
    console.log(res);
    getCustomerDetails();
    handleClose();
  };
  const Table = ({ item, idx }) => {
    return (
      <tr key={idx}>
        <td>{startIndex + idx + 1}</td>
        <td>{item.customerName}</td>
        <td>{item.customerPhone}</td>
        <td>
          {item.lastServicedAt
            ? item.lastServicedAt.split("").splice(0, 10).join("")
            : ""}
        </td>
        <td>
          {item.duedate ? item.duedate.split("").slice(0, 10).join("") : ""}
        </td>
        <td>
          <div className={`${styles.buttons} ${styles.button} ${styles.view}`}>
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
              <VisibilityIcon sx={{ fontSize: "20px" }} />
            </Button>

            <Button
              className={`${styles.button} ${styles.delete}`}
              onClick={() => setAlert(true)}
              title="Delete"
            >
              <DeleteIcon sx={{ fontSize: "20px", color: "crimson" }} />
            </Button>
            {/* Delete alert Dialog */}
            <Dialog
              open={alert}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Are you sure you want to delete this customer?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  onClick={() => handleDelete(item)}
                  autoFocus
                  color="error"
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
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
            placeholder="Search..."
            className={styles.searchfield}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

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
            <td>Service/Installed At</td>
            <td>Due Date</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {!loading && customer.length > 0 && search.length <= 0
            ? customer
                .slice(startIndex, startIndex + 10)
                .map((item, idx) => <Table item={item} idx={idx} key={idx} />)
            : customer.map(
                (item, idx) =>
                  (item.customerName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                    item.customerPhone.includes(search)) && (
                    <Table item={item} idx={idx} key={idx} />
                  )
              )}
        </tbody>
      </table>
      {loading && <SkeletonLoader />}
      <Pagination
        startIndex={startIndex}
        maxlength={customer.length}
        setStartIndex={setStartIndex}
      />
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
      {/* snackbar */}
      <AlertMessage
        open={message}
        setOpen={setMessage}
        message={content}
        messageType={type}
      />
    </div>
  );
};
export default Dashboard;
