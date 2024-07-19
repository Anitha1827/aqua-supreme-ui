"use client";
import React, { forwardRef, useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import AddProductModal from "@/container/AddProductModal";
import { deleteProduct, findingUser, getAllProduct } from "@/service";
// icons
import { FaRegEdit } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/Delete";
import EditProductModel from "@/container/EditProductModel";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
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

const ProductPage = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [product, setProduct] = useState([]);
  // edit
  const [edit, setEdit] = useState(false); //modal state
  const [editdata, setEditData] = useState({});
  // Pagination setup
  const [startIndex, setStartIndex] = useState(0);
  //skeleton useState
  const [loading, setLoading] = useState(true);
  let router = useRouter();

  //for Dialog
  const [alert, setAlert] = useState(false);

  const handledeleteClose = () => {
    setAlert(false);
  };

  // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  // Get Products
  let getProduct = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return null;
    }
    let res = await findingUser(token);
    if (res.type === "serviceEngineer") {
      return router.push("/dashboard/installations");
    }

    let resp = await getAllProduct();
    console.log("produPage17", resp.getproduct);
    setProduct(resp.getproduct);
    setLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, []);

  // Edit Functionalities
  let handleEdit = async (prod) => {
    setEdit(true);
    setEditData(prod);
  };

  // Delete functionalities
  let handleDelete = async (prod) => {
    let res = await deleteProduct(prod._id);
    if (res.message !== "Product Deleted Successfully !") {
      setMessage(true);
      setContent("try again later");
      setType("error");
      return null;
    }
    setMessage(true);
    setContent("Product Deleted Successfully !");
    setType("success");
    handledeleteClose();
    console.log("deletefun32", res);
    getProduct();
  };

  //code optimization for table row
  const Table = ({ prod, idx }) => {
    return (
      <tr key={idx}>
        <td>{startIndex + idx + 1}</td>
        <td>{prod.productname}</td>
        <td>{prod.productmodel}</td>
        <td>
          <div className={`${styles.buttons} ${styles.button} ${styles.view}`}>
            {/* Edit button */}
            <Button onClick={() => handleEdit(prod)} title="Edit Data">
              <FaRegEdit sx={{ fontSize: "20px" }} />
            </Button>

            {/* Delete button */}
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
                onClick={() => handleDelete(prod)}
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

        <Button
          onClick={handleOpen}
          variant="contained"
          className={styles.addbutton}
          style={{
            textTransform: "uppercase",
            padding: "10px",
            background: "#5d57c9",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Add
        </Button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr style={{ fontWeight: "bold" }}>
            <td>Sl.No</td>
            <td>Name</td>
            <td>Modal</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {!loading && product.length > 0 && search.length <= 0
            ? product
                .slice(startIndex, startIndex + 10)
                .map((prod, idx) => <Table prod={prod} idx={idx} key={idx} />)
            : product.map(
                (prod, idx) =>
                  (prod.productname
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                    prod.productmodel.includes(search)) && (
                    <Table prod={prod} idx={idx} key={idx} />
                  )
              )}
        </tbody>
      </table>
      {loading && <SkeletonLoader />}
      <Pagination
        startIndex={startIndex}
        maxlength={product.length}
        setStartIndex={setStartIndex}
      />

      {/* Add product modal */}
      <AddProductModal open={open} setOpen={setOpen} setProduct={setProduct} />

      {/* Edit product modal */}
      {editdata.productname && (
        <EditProductModel
          edit={edit}
          setEdit={setEdit}
          editdata={editdata}
          setProduct={setProduct}
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

export default ProductPage;
