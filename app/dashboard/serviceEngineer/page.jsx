"use client";
import React, { forwardRef, useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Button from "@mui/material/Button";
import AddUserModel from "@/container/AddUserModel";
import { deleteUser, findingUser, getNewUser } from "@/service";
import EditUserModal from "@/container/EditUserModal";
import { FaRegEdit } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/Delete";
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

const UserPage = () => {
  let router = useRouter();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleOpen = () => setOpen(true);
  //for Dialog
  const [alert, setAlert] = useState(false);

  const handledeleteClose = () => {
    setAlert(false);
  };

  // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  // Pagination setup
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleEdit = (item) => {
    setEdit(true);
    setEditData(item);
    // console.log(item,"item")
  };

  const [editdata, setEditData] = useState({});
  const [tech, setTech] = useState([]);
  const [search, setSearch] = useState("");

  let getusesr = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return null;
    }
    let res = await findingUser(token);
    if (res.type === "serviceEngineer") {
      return router.push("/dashboard/installations");
    }

    let response = await getNewUser();
    console.log("res", response);
    setTech(response.getuser);
    setLoading(false);
  };

  useEffect(() => {
    getusesr();
  }, []);

  const handleDelete = async (item) => {
    let res = await deleteUser(item._id);
    if (res.message !== "User details Deleted Successfully!") {
      setMessage(true);
      setContent("try again later");
      setType("error");
      return null;
    }
    setMessage(true);
    setContent("User details Deleted Successfully!");
    setType("success");
    console.log(res);
    handledeleteClose();
    getusesr();
  };
  //code optimization for table row
  const Table = ({ item, idx }) => {
    return (
      <tr key={idx}>
        <td>{startIndex + idx + 1}</td>
        <td>{item.name ? item.name : "test"}</td>
        <td>{item.phone}</td>
        <td>{item.email}</td>
        <td>
          <div className={`${styles.buttons} ${styles.button} ${styles.view}`}>
            <Button onClick={() => handleEdit(item)} title="Edit Data">
              <FaRegEdit sx={{ fontSize: "20px" }} />
            </Button>

            <Button
              aria-label="delete"
              // size="large"
              className={`${styles.button} ${styles.delete}`}
              onClick={() => setAlert(true)}
              title="Delete"
            >
              <DeleteIcon sx={{ fontSize: "20px", color: "crimson" }} />
            </Button>
          </div>
          {/* Delete alert Dialog */}
          <Dialog
            open={alert}
            TransitionComponent={Transition}
            keepMounted
            onClose={handledeleteClose}
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
              <Button onClick={handledeleteClose}>Cancel</Button>
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
    <>
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
              <td>email</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {!loading && tech.length > 0 && search.length <= 0
              ? tech
                  .slice(startIndex, startIndex + 10)
                  .map((item, idx) => <Table item={item} idx={idx} key={idx} />)
              : tech.map(
                  (item, idx) =>
                    (item.name
                      .toLowerCase()
                      .includes(search.toLocaleLowerCase()) ||
                      item.phone.includes(search)) && (
                      <Table item={item} idx={idx} key={idx} />
                    )
                )}
          </tbody>
        </table>
        {loading && <SkeletonLoader />}
        <Pagination
          startIndex={startIndex}
          maxlength={tech.length}
          setStartIndex={setStartIndex}
        />

        {/* Adding user model */}
        <AddUserModel open={open} setOpen={setOpen} setTech={setTech} />

        {/* Edit User Modal */}
        {editdata.name && (
          <EditUserModal
            edit={edit}
            setEdit={setEdit}
            editdata={editdata}
            setTech={setTech}
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
    </>
  );
};

export default UserPage;
