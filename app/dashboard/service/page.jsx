"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { Button } from "@mui/material";
import AddServiceModal from "@/container/AddServiceModal";
import EditServiceModal from "@/container/EditServiceModal";
import { deleteService, getService } from "@/service";
import { useRouter } from "next/navigation";
import { IoPersonAddOutline } from "react-icons/io5";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AssignServiceModal from "@/container/AssignServiceModal";
import { FaRegEdit } from "react-icons/fa";
import DeleteIcon from '@mui/icons-material/Delete';


const ServiceCalls = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editdata, setEditData] = useState({});
  const [service, setService] = useState([]);
  const handleOpen = () => setOpen(true);
  const [assign, setAssign] = useState(false)
  const handleAssign = () => setAssign(true)

  const handleEdit = (item) => {
    setEditData(item);
    setEdit(true);
  };

  let getservicemodal = async () => {
    let res = await getService();
    setService(res.getAllServiceDetails);
  };
  useEffect(() => {
    getservicemodal();
  }, []);

  const handleDelete = async (item) => {
    let res = await deleteService(item._id);
    console.log(res);
    getservicemodal();

  };


  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search a user..." />
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
          <tr>
            <td>Sl.No</td>
            <td>Name</td>
            <td>Phone Number</td>
            <td>Created At</td>
            <td>Service Date</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {service.length > 0 &&
            service.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.customerName}</td>
                <td>{item.customerPhone}</td>
                <td>{item.createdAt}</td>
                <td>
                  {item.serviceDate
                    ? item.serviceDate.split("").slice(0, 10).join("")
                    : "23-05-2024"}
                </td>
                <td>
                  <div className={styles.buttons}>
                    <Button
                      onClick={() => handleEdit(item)}
                      className={`${styles.button} ${styles.view}`}
                    >
                       <FaRegEdit />
                    </Button>
                     {/* Assign person button */}
                     <Button onClick={handleAssign} >
                    <IoPersonAddOutline />
                    </Button>

                    {/* status update button */}
                    <Button onClick={() => router.push(`/dashboard/service/${item._id}`)}>
                      <TaskAltIcon />
                    </Button>
                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(item)}
                    >
                       <DeleteIcon fontSize="inherit" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination />
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
      <AssignServiceModal assign={assign} setAssign={setAssign}/>
    </div>
  );
};

export default ServiceCalls;
