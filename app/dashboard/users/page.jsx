"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Button from "@mui/material/Button";
import AddUserModel from "@/container/AddUserModel";
import { deleteUser, getNewUser } from "@/service";
import EditUserModal from "@/container/EditUserModal";

const UserPage = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleEdit = (item) => {
    setEdit(true);
    setEditData(item);
    // console.log(item,"item")
  };

  const [editdata, setEditData] = useState({});
  const [tech, setTech] = useState([]);

  let getusesr = async () => {
    let res = await getNewUser();
    console.log("res", res);
    setTech(res.getuser);
  };

  useEffect(() => {
    getusesr();
  }, []);

  const handleDelete = async (item) => {
    let res = await deleteUser(item._id);
    console.log(res);
    getusesr();
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <Search placeholder="Search a user..." />

          <Button onClick={handleOpen} variant="contained">
            Add
          </Button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Sl.No</td>
              <td>Name</td>
              <td>Phone Number</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {tech.length > 0 &&
              tech.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{item.name ? item.name : "test"}</td>
                  <td>{item.phone}</td>
                  <td>Active</td>
                  <td>
                    <div className={styles.buttons}>
                      <Button
                        onClick={() => handleEdit(item)}
                        // variant="contained"
                        className={`${styles.button} ${styles.view}`}
                      >
                        Edit
                      </Button>

                      <Button
                        className={`${styles.button} ${styles.delete}`}
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination />

        {/* Adding user model */}
        <AddUserModel open={open} setOpen={setOpen}  setTech={setTech}/>

        {/* Edit User Modal */}
        {editdata.name && (
          <EditUserModal
            edit={edit}
            setEdit={setEdit}
            editdata={editdata}
            setTech={setTech}
          />
        )}
      </div>
    </>
  );
};

export default UserPage;
