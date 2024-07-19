"use client";
import React, { forwardRef, useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import AddServiceModal from "@/container/AddServiceModal";
import EditServiceModal from "@/container/EditServiceModal";
import { deleteService, findingUser, getService } from "@/service";
import { useRouter } from "next/navigation";
import { IoPersonAddOutline } from "react-icons/io5";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AssignServiceModal from "@/container/AssignServiceModal";
import { FaRegEdit } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/Delete";
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

const ServiceCalls = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editdata, setEditData] = useState({});
  const [service, setService] = useState([]);
  const handleOpen = () => setOpen(true);
  const [assign, setAssign] = useState(false);
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");
  //for Dialog
  const [alert, setAlert] = useState(false);

  const handleClose = () => {
    setAlert(false);
  };

  // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  // Pagination setup
  const [startIndex, setStartIndex] = useState(0);
  // Skeleton useState
  const [loading, setLoading] = useState(true);

  // user type
  const [usertype, setUserType] = useState("Service Engineer");

  const handleAssign = (id) => {
    setAssign(true);
    setId(id);
  };

  const handleEdit = (item) => {
    setEditData(item);
    setEdit(true);
  };

  let getservicemodal = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return null;
    }
    let res = await findingUser(token);
    let response = await getService();
    if (res.type == "admin") {
      setUserType("Admin");
    } else if (res.type == "Owner") {
      setUserType("Owner");
    }
    console.log("line39", response.getAllServiceDetails);
    let data = response.getAllServiceDetails;
    if (res.type === "serviceEngineer") {
      data = response.getAllServiceDetails.filter(
        (val) => val.serviceAssignTo && val.serviceAssignTo == res.user.name
      );
    }
    setService(data);
    setLoading(false);
  };
  useEffect(() => {
    if (assign === false) {
      getservicemodal();
    }
  }, [assign]);

  const handleDelete = async (item) => {
    let res = await deleteService(item._id);
    if (res.message !== "Service Deleted Succesfully!") {
      setMessage(true);
      setContent("try again later");
      setType("error");
      return null;
    }
    setMessage(true);
    setContent("Service Deleted Succesfully!");
    setType("success");
    console.log(res);
    getservicemodal();
    handleClose();
  };
  //code optimization for table row
  const Table = ({ item, idx }) => {
    return (
      <tr
        key={idx}
        className={`${
          item.serviceAssignTo && item.serviceAssignTo.length > 0
            ? "Assigned"
            : "notAssigned"
        }`}
      >
        <td>{startIndex + idx + 1}</td>
        <td>{item.customerName}</td>
        <td>{item.customerPhone}</td>
        <td>{item.createdAt}</td>
        <td>
          {item.serviceDate
            ? item.serviceDate.split("").slice(0, 10).join("")
            : ""}
        </td>
        <td>{item.serviceAssignTo ? item.serviceAssignTo : "NotAssigned"}</td>
        <td>
          <div className={`${styles.buttons} ${styles.button} ${styles.view}`}>
            {usertype !== "Service Engineer" && (
              <Button
                onClick={() => handleEdit(item)}
                className={`${styles.button} ${styles.view}`}
                title="Edit"
                color="primary"
              >
                <FaRegEdit sx={{ fontSize: "20px" }} />
              </Button>
            )}
            {/* Assign person button */}
            {usertype !== "Service Engineer" && (
              <Button
                onClick={() => handleAssign(item._id)}
                title="Assign technician"
              >
                <IoPersonAddOutline sx={{ fontSize: "20px" }} />
              </Button>
            )}

            {/* status update button */}
            <Button
              onClick={() => router.push(`/dashboard/service/${item._id}`)}
              title="Status Update"
            >
              <TaskAltIcon sx={{ fontSize: "20px" }} />
            </Button>
            {usertype !== "Service Engineer" && (
              <button
                className={`${styles.button} ${styles.delete}`}
                onClick={() => setAlert(true)}
                title="Delete"
              >
                <DeleteIcon sx={{ fontSize: "20px", color: "crimson" }} />
              </button>
            )}
          </div>
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
        {usertype !== "Service Engineer" && (
          <Button
            onClick={handleOpen}
            variant="contained"
            className={styles.addbutton}
          >
            Add
          </Button>
        )}
      </div>
      <table className={styles.table}>
        <thead>
          <tr style={{ fontWeight: "bold" }}>
            <td>Sl.No</td>
            <td>Name</td>
            <td>Phone Number</td>
            <td>Created At</td>
            <td>Service Date</td>
            <td>Service Engineer</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {!loading && service.length > 0 && search.length <= 0
            ? service
                .slice(startIndex, startIndex + 10)
                .map((item, idx) => <Table item={item} idx={idx} key={idx} />)
            : service.map(
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
        maxlength={service.length}
        setStartIndex={setStartIndex}
      />
      <AddServiceModal open={open} setOpen={setOpen} setService={setService} />
      {editdata.customerName && (
        <EditServiceModal
          edit={edit}
          setEdit={setEdit}
          editdata={editdata}
          setService={setService}
        />
      )}

      {/* Assign Technician modal */}
      {id && (
        <AssignServiceModal assign={assign} setAssign={setAssign} id={id} />
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

export default ServiceCalls;
