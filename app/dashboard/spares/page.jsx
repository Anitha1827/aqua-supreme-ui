"use client";
import React, { forwardRef, useEffect, useState } from "react";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import SearchIcon from "@mui/icons-material/Search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import { Button } from "@nextui-org/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaRegEdit } from "react-icons/fa";
import AddSparesModal from "@/container/AddSparesModal";
import { deleteSpare, findingUser, getSpare } from "@/service";
import EditSparesModal from "@/container/EditSparesModal";
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

const Spares = () => {
  let router = useRouter();
  const [search, setSearch] = useState("");
  // Pagination setup
  const [startIndex, setStartIndex] = useState(0);
  //   Modal
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  //   backend data storage
  const [spares, setSpares] = useState([]);
  //   edited data state
  const [editdata, setEditData] = useState({});
  // sketelon useState
  const [loading, setLoading] = useState(true);

  //for Dialog
  const [alert, setAlert] = useState(false);

  const handledeleteClose = () => {
    setAlert(false);
  };

  // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  // Get Spare data
  const getSparedata = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return null;
    }
    let res = await findingUser(token);
    if (res.type === "serviceEngineer") {
      return router.push("/dashboard/installations");
    }

    let resp = await getSpare();
    setSpares(resp.getSpare);
    setLoading(false);
  };

  //   edit function
  const handleEdit = async (spares) => {
    setEditData(spares);
    setEdit(true);
  };

  //   Delete functionalities
  const handleDelete = async (sprs) => {
    let res = await deleteSpare(sprs._id);
    if (res.message !== "Deleted spares details Successfully!") {
      setMessage(true);
      setContent("try again later");
      setType("error");
      return null;
    }
    setMessage(true);
    setContent("Deleted spares details Successfully!");
    setType("success");
    handledeleteClose();
    console.log("line28", res);
    getSparedata();
  };
  useEffect(() => {
    getSparedata();
  }, []);

  const handleOpen = () => setOpen(true);
  //optimization code for table row
  const Table = ({ sprs, idx }) => {
    return (
      <tr key={idx}>
        <td>{startIndex + idx + 1}</td>
        <td>{sprs.spareName}</td>
        <td>{sprs.spareNumber}</td>
        <td>
          <div className={`${styles.buttons} ${styles.button} ${styles.view}`}>
            <Button
              onClick={() => handleEdit(sprs)}
              className={`${styles.button} ${styles.view}`}
              title="Edit"
              color="primary"
            >
              <FaRegEdit sx={{ fontSize: "20px" }} />
            </Button>

            <Button
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
                onClick={() => handleDelete(sprs)}
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
          style={{
            textTransform: "uppercase",
            padding: "15px",
            background: "#5d57c9",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          <b>Add</b>
        </Button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr style={{ fontWeight: "bold" }}>
            <td>Sl.No</td>
            <td>spare Name</td>
            <td>spare Number</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {!loading && spares.length > 0 && search.length <= 0
            ? spares
                .slice(startIndex, startIndex + 10)
                .map((sprs, idx) => <Table sprs={sprs} idx={idx} key={idx} />)
            : spares.map(
                (sprs, idx) =>
                  (sprs.spareName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                    sprs.spareNumber.includes(search)) && (
                    <Table sprs={sprs} idx={idx} key={idx} />
                  )
              )}
        </tbody>
      </table>
      {loading && <SkeletonLoader />}
      <Pagination
        startIndex={startIndex}
        maxlength={spares.length}
        setStartIndex={setStartIndex}
      />
      {/* Add Spares Modal */}
      <AddSparesModal open={open} setOpen={setOpen} setSpares={setSpares} />

      {/* Edit Customer Modal */}
      {editdata.spareName && (
        <EditSparesModal
          edit={edit}
          setEdit={setEdit}
          editdata={editdata}
          setSpares={setSpares}
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

export default Spares;
