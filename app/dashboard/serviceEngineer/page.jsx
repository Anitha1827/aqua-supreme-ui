"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Button from "@mui/material/Button";
import AddUserModel from "@/container/AddUserModel";
import { deleteUser, getNewUser } from "@/service";
import EditUserModal from "@/container/EditUserModal";
import { FaRegEdit } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [search, setSearch] = useState("");

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
          <div className={styles.searchcontainer}>
            <SearchIcon className={styles.searchicon} />
            <input
              className={styles.searchfield}
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Button onClick={handleOpen} variant="contained">
            Add
          </Button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr style={{ fontWeight: "bold" }}>
              <td>Sl.No</td>
              <td>Name</td>
              <td>Phone Number</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {tech.length > 0 && search.length <= 0
              ? tech.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{item.name ? item.name : "test"}</td>
                    <td>{item.phone}</td>
                    <td>Active</td>
                    <td>
                      <div
                        className={`${styles.buttons} ${styles.button} ${styles.view}`}
                      >
                        <Button
                          onClick={() => handleEdit(item)}
                          variant="contained"
                          className={`${styles.buttons} ${styles.view}`}
                          title="Edit"
                        >
                          <FaRegEdit sx={{ fontSize: "20px" }} />
                        </Button>

                        <Button
                          className={`${styles.button} ${styles.delete}`}
                          onClick={() => handleDelete(item)}
                          title="Delete"
                          variant="contained"
                        >
                          <DeleteIcon
                            sx={{ fontSize: "20px", color: "crimson" }}
                          />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              : tech.map(
                  (item, idx) =>
                    (item.name
                      .toLowerCase()
                      .includes(search.toLocaleLowerCase()) ||
                      item.phone.includes(search)) && (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{item.name ? item.name : "test"}</td>
                        <td>{item.phone}</td>
                        <td>Active</td>
                        <td>
                          <div
                            className={`${styles.buttons} ${styles.button} ${styles.view}`}
                          >
                            <Button
                              onClick={() => handleEdit(item)}
                              variant="contained"
                              className={`${styles.buttons} ${styles.view}`}
                              title="Edit"
                            >
                              <FaRegEdit sx={{ fontSize: "20px" }} />
                            </Button>

                            <Button
                              className={`${styles.button} ${styles.delete}`}
                              onClick={() => handleDelete(item)}
                              title="Delete"
                              variant="contained"
                            >
                              <DeleteIcon
                                sx={{ fontSize: "20px", color: "crimson" }}
                              />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                )}
          </tbody>
        </table>
        <Pagination />

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
      </div>
    </>
  );
};

export default UserPage;