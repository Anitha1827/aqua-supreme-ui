"use client";
import React, { forwardRef, useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { Button } from "@mui/material";
import AddInstallationModal from "@/container/AddInstallationModal.jsx";
import {
  deleteInstallation,
  findingUser,
  getInstallationDetails,
} from "@/service";
import EditInstallationModal from "@/container/EditInstallationModal";
// icons
import { FaRegEdit } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/Delete";
import { IoPersonAddOutline } from "react-icons/io5";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AssignInstallationModal from "@/container/AssignInstallationModal";
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

const Installations = () => {
  let router = useRouter();
  const [open, setOpen] = useState(false);
  const [install, setInstall] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editdata, setEditData] = useState({});
  const [assign, setAssign] = useState(false);
  const [id, setId] = useState("");
  const [search, setSearch] = useState("");
  // Pagination setup
  const [startIndex, setStartIndex] = useState(0);
  // Skeleton useState
  const [loading, setLoading] = useState(true);
  //for Dialog
  const [alert, setAlert] = useState(false);

  const handleClose = () => {
    setAlert(false);
  };

  // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  // user type
  const [usertype, setUserType] = useState("Service Engineer");

  const handleEdit = (inst) => {
    setEdit(true);
    setEditData(inst);
    // console.log("pageline20", inst);
  };

  const handleOpen = () => setOpen(true);

  const handleAssign = (id) => {
    setAssign(true);
    setId(id);
  };

  useEffect(() => {
    if (assign === false) {
      getInstallation();
    }
  }, [assign]);

  const getInstallation = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return null;
    }
    let res = await findingUser(token);
    if (res.type == "admin") {
      setUserType("Admin");
    } else if (res.type == "Owner") {
      setUserType("Owner");
    }

    let response = await getInstallationDetails();
    console.log("page23", response);
    let data = response.getAllCustomerDetails;
    if (res.type === "serviceEngineer") {
      data = response.getAllCustomerDetails.filter(
        (val) =>
          val.isInstallationAssignTo &&
          val.isInstallationAssignTo == res.user.name
      );
    }
    setInstall(data);
    setLoading(false);
  };

  // Delete Functionalities
  const handleDelete = async (inst) => {
    let res = await deleteInstallation(inst._id);
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
    getInstallation();
    handleClose();
  };

  //code Optimization for table row
  const Table = ({ inst, idx }) => {
    return (
      <tr
        key={idx}
        className={`${
          inst.isInstallationAssignTo && inst.isInstallationAssignTo.length > 0
            ? "Assigned"
            : "notAssigned"
        }`}
      >
        <td>{startIndex + idx + 1}</td>
        <td>{inst.customerName}</td>
        <td>{inst.customerPhone}</td>
        <td>{inst.createdAt}</td>
        <td>
          {inst.duedate ? inst.duedate.split("").slice(0, 10).join("").split("-").reverse().join("/") : ""}
        </td>
        <td>
          {inst.isInstallationAssignTo
            ? inst.isInstallationAssignTo
            : "NotAssigned"}
        </td>
        <td>
          <div className={`${styles.buttons} ${styles.button} ${styles.view}`}>
            {/* Edit button */}
            {usertype !== "Service Engineer" && (
              <Button onClick={() => handleEdit(inst)} title="Edit Data">
                <FaRegEdit sx={{ fontSize: "20px" }} />
              </Button>
            )}
            {/* Assign person button */}
            {usertype !== "Service Engineer" && (
              <Button
                onClick={() => handleAssign(inst._id)}
                title="Assign technician"
              >
                <IoPersonAddOutline sx={{ fontSize: "20px" }} />
              </Button>
            )}
            {/* status update button */}
            <Button
              onClick={() =>
                router.push(`/dashboard/installations/${inst._id}`)
              }
              title="Update Status"
            >
              <TaskAltIcon sx={{ fontSize: "20px" }} />
            </Button>
            {/* Delete button */}
            {usertype !== "Service Engineer" && (
              <Button
                aria-label="delete"
                // size="large"
                className={`${styles.button} ${styles.delete}`}
                onClick={() => setAlert(true)}
                title="Delete"
              >
                <DeleteIcon sx={{ fontSize: "20px", color: "crimson" }} />
              </Button>
            )}
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
                  onClick={() => handleDelete(inst)}
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
            <td>Contact</td>
            <td>Created At</td>
            <td>Installation Date</td>
            <td>Service Engineer</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {!loading && install.length > 0 && search.length <= 0
            ? install
                .slice(startIndex, startIndex + 10)
                .map((inst, idx) => <Table inst={inst} idx={idx} key={idx} />)
            : install.map(
                (inst, idx) =>
                  (inst.customerName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                    inst.customerPhone.includes(search)) && (
                    <Table inst={inst} idx={idx} key={idx} />
                  )
              )}
        </tbody>
      </table>
      {loading && <SkeletonLoader />}
      <Pagination
        startIndex={startIndex}
        maxlength={install.length}
        setStartIndex={setStartIndex}
      />

      {/* Add new Installation modal */}
      <AddInstallationModal
        open={open}
        setOpen={setOpen}
        setInstall={setInstall}
      />
      {/* Edit Installation data */}
      {editdata.customerName && (
        <EditInstallationModal
          edit={edit}
          setEdit={setEdit}
          editdata={editdata}
          setInstall={setInstall}
        />
      )}

      {/* Assign TO Modal */}

      {id && (
        <AssignInstallationModal
          assign={assign}
          setAssign={setAssign}
          id={id}
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

export default Installations;
