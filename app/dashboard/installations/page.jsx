"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { Button } from "@mui/material";
import AddInstallationModal from "@/container/AddInstallationModal.jsx";
import { deleteInstallation, getInstallationDetails } from "@/service";
import EditInstallationModal from "@/container/EditInstallationModal";
// icons
import { FaRegEdit } from "react-icons/fa";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { IoPersonAddOutline } from "react-icons/io5";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AssignInstallationModal from "@/container/AssignInstallationModal";
import { useRouter } from "next/navigation";


const Installations = () => {
  let router = useRouter();
  const [open, setOpen] = useState(false);
  const [install, setInstall] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editdata, setEditData] = useState({});
  const [assign, setAssign] = useState(false)
  const [status,setStatus] = useState([])

  const handleEdit = (inst) => {
    setEdit(true);
    setEditData(inst);
    // console.log("pageline20", inst);
  };

  const handleOpen = () => setOpen(true);
  const handleAssign = () => setAssign(true)
  
  useEffect(() => {
    getInstallation();
  }, []);

  const getInstallation = async () => {
    let response = await getInstallationDetails();
    console.log("page23", response);
    setInstall(response.getAllCustomerDetails);
    setStatus(response.getAllCustomerDetails)
  };

  // Delete Functionalities
  const handleDelete = async (inst) => {
    let res = await deleteInstallation(inst._id);
    console.log(res);
    getInstallation();
  };
 
  return (
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
            <td>Created At</td>
            <td>Installation Date</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {install.length > 0 &&
            install.map((inst, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{inst.customerName}</td>
                <td>{inst.customerPhone}</td>
                <td>{inst.duedate}</td>
                <td>
                  {inst.lastServicedAt
                    ? inst.lastServicedAt.split("").slice(0, 10).join("")
                    : "24-05-2024"}
                </td>
                <td>
                  <div className={`${styles.buttons} ${styles.button} ${styles.view}`}>
                    {/* Edit button */}
                    <Button
                      onClick={() => handleEdit(inst)}
                    >
                      <FaRegEdit />
                    </Button >
                      {/* Assign person button */}
                    <Button onClick={handleAssign} >
                    <IoPersonAddOutline />
                    </Button>

                    {/* status update button */}
                    <Button status={status} setStatus={setStatus} onClick={() => router.push(`/dashboard/installations/${inst._id}`)}>
                      <TaskAltIcon />
                    </Button>
                    {/* Delete button */}
                    <IconButton
                      aria-label="delete"
                      size="large"
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(inst)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination />

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

      <AssignInstallationModal assign={assign} setAssign={setAssign}/>
    </div>
  );
};

export default Installations;
