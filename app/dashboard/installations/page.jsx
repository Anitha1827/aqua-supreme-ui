"use client";
import React, { useEffect, useState } from "react";
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
    getInstallation();
  }, []);

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
    if(res.type === "serviceEngineer"){
      data = response.getAllCustomerDetails.filter(
        (val) =>
          val.isInstallationAssignTo &&
          val.isInstallationAssignTo == res.user.name
      );
    }
    setInstall(data);
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
            <td>Contact</td>
            <td>Created At</td>
            <td>Installation Date</td>
            <td>Service Engineer</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {install.length > 0 && search.length <= 0
            ? install.slice(startIndex, startIndex + 10).map((inst, idx) => (
                <tr
                  key={idx}
                  className={`${
                    inst.isInstallationAssignTo &&
                    inst.isInstallationAssignTo.length > 0
                      ? "Assigned"
                      : "notAssigned"
                  }`}
                >
                  <td>{startIndex + idx + 1}</td>
                  <td>{inst.customerName}</td>
                  <td>{inst.customerPhone}</td>
                  <td>{inst.createdAt}</td>
                  <td>
                    {inst.duedate
                      ? inst.duedate.split("").slice(0, 10).join("")
                      : ""}
                  </td>
                  <td>
                    {inst.isInstallationAssignTo
                      ? inst.isInstallationAssignTo
                      : "NotAssigned"}
                  </td>
                  <td>
                    <div
                      className={`${styles.buttons} ${styles.button} ${styles.view}`}
                    >
                      {/* Edit button */}
                      <Button
                        onClick={() => handleEdit(inst)}
                        title="Edit Data"
                      >
                        <FaRegEdit sx={{ fontSize: "20px" }} />
                      </Button>
                      {/* Assign person button */}
                      <Button
                        onClick={() => handleAssign(inst._id)}
                        title="Assign technician"
                      >
                        <IoPersonAddOutline sx={{ fontSize: "20px" }} />
                      </Button>

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
                      <Button
                        aria-label="delete"
                        // size="large"
                        className={`${styles.button} ${styles.delete}`}
                        onClick={() => handleDelete(inst)}
                        title="Delete"
                      >
                        <DeleteIcon
                          sx={{ fontSize: "20px", color: "crimson" }}
                        />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            : install.map(
                (inst, idx) =>
                  (inst.customerName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                    inst.customerPhone.includes(search)) && (
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
                        {inst.isInstallationAssignTo
                          ? inst.isInstallationAssignTo
                          : "NotAssigned"}
                      </td>
                      <td>
                        <div
                          className={`${styles.buttons} ${styles.button} ${styles.view}`}
                        >
                          {/* Edit button */}
                          <Button
                            onClick={() => handleEdit(inst)}
                            title="Edit Data"
                          >
                            <FaRegEdit sx={{ fontSize: "20px" }} />
                          </Button>
                          {/* Assign person button */}
                          <Button
                            onClick={() => handleAssign(inst._id)}
                            title="Assign technician"
                          >
                            <IoPersonAddOutline sx={{ fontSize: "20px" }} />
                          </Button>

                          {/* status update button */}
                          <Button
                            onClick={() =>
                              router.push(
                                `/dashboard/installations/${inst._id}`
                              )
                            }
                            title="Update Status"
                          >
                            <TaskAltIcon sx={{ fontSize: "20px" }} />
                          </Button>
                          {/* Delete button */}
                          <Button
                            aria-label="delete"
                            // size="large"
                            className={`${styles.button} ${styles.delete}`}
                            onClick={() => handleDelete(inst)}
                            title="Delete"
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
    </div>
  );
};

export default Installations;
