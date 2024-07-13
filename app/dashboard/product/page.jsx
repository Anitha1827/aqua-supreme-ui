"use client";
import React, { useEffect, useState } from "react";
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
  const[loading, setLoading] = useState(true)
  let router = useRouter();

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
    setLoading(false)
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
    console.log("deletefun32", res);
    getProduct();
  };

  //code optimization for table row
  const Table = ({ prod, idx }) => {
    return(
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
            onClick={() => handleDelete(prod)}
            title="Delete"
          >
            <DeleteIcon sx={{ fontSize: "20px", color: "crimson" }} />
          </Button>
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

        <Button onClick={handleOpen}  variant="contained"
          className={styles.addbutton}>
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
      {loading && <SkeletonLoader/>}
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
    </div>
  );
};

export default ProductPage;
