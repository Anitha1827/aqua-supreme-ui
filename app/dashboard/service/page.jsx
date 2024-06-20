"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import AddServiceModal from "@/container/AddServiceModal";
import EditServiceModal from "@/container/EditServiceModal";
import { deleteService, getService } from "@/service";
import { useRouter } from "next/navigation";
import { IoPersonAddOutline } from "react-icons/io5";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AssignServiceModal from "@/container/AssignServiceModal";
import { FaRegEdit } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/Delete";

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
  // Pagination setup
  const [startIndex, setStartIndex] = useState(0);

  const handleAssign = (id) => {
    setAssign(true);
    setId(id);
  };

  const handleEdit = (item) => {
    setEditData(item);
    setEdit(true);
  };

  let getservicemodal = async () => {
    let res = await getService();
    console.log("line39", res.getAllServiceDetails);
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
            <td>Created At</td>
            <td>Service Date</td>
            <td>Service Engineer</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {service.length > 0 && search.length <= 0
            ? service.slice(startIndex, startIndex + 10).map((item, idx) => (
                <tr key={idx}  className={`${
                  item.isInstallationAssignTo &&
                  item.isInstallationAssignTo.length > 0
                    ? "Assigned"
                    : "notAssigned"
                }`}>
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
                    <div
                      className={`${styles.buttons} ${styles.button} ${styles.view}`}
                    >
                      <Button
                        onClick={() => handleEdit(item)}
                        className={`${styles.button} ${styles.view}`}
                        title="Edit"
                        color="primary"
                      >
                        <FaRegEdit sx={{ fontSize: "20px" }} />
                      </Button>
                      {/* Assign person button */}
                      <Button
                        onClick={() => handleAssign(item._id)}
                        title="Assign technician"
                      >
                        <IoPersonAddOutline sx={{ fontSize: "20px" }} />
                      </Button>

                      {/* status update button */}
                      <Button
                        onClick={() =>
                          router.push(`/dashboard/service/${item._id}`)
                        }
                        title="Status Update"
                      >
                        <TaskAltIcon sx={{ fontSize: "20px" }} />
                      </Button>
                      <button
                        className={`${styles.button} ${styles.delete}`}
                        onClick={() => handleDelete(item)}
                        title="Delete"
                      >
                        <DeleteIcon
                          sx={{ fontSize: "20px", color: "crimson" }}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            : service.map(
                (item, idx) =>
                  (item.customerName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                    item.customerPhone.includes(search)) && (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
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
                        <div
                          className={`${styles.buttons} ${styles.button} ${styles.view}`}
                        >
                          <Button
                            onClick={() => handleEdit(item)}
                            className={`${styles.button} ${styles.view}`}
                            title="Edit"
                            color="primary"
                          >
                            <FaRegEdit sx={{ fontSize: "20px" }} />
                          </Button>
                          {/* Assign person button */}
                          <Button
                            onClick={() => handleAssign(item._id)}
                            title="Assign technician"
                          >
                            <IoPersonAddOutline sx={{ fontSize: "20px" }} />
                          </Button>

                          {/* status update button */}
                          <Button
                            onClick={() =>
                              router.push(`/dashboard/service/${item._id}`)
                            }
                            title="Status Update"
                          >
                            <TaskAltIcon sx={{ fontSize: "20px" }} />
                          </Button>
                          <button
                            className={`${styles.button} ${styles.delete}`}
                            onClick={() => handleDelete(item)}
                            title="Delete"
                          >
                            <DeleteIcon
                              sx={{ fontSize: "20px", color: "crimson" }}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
              )}
        </tbody>
      </table>
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
    </div>
  );
};

export default ServiceCalls;
