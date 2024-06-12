"use client";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import styles from "@/app/ui/dashboard/users/users.module.css";
// modal
import Button from "@mui/material/Button";
import AddLeadModal from "@/container/AddLeadModal";
import { FaRegEdit } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteLead, getLead } from "@/service";
import EditLeadModal from "@/container/EditLeadModal";

const LeadCreation = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editdata, setEditData] = useState({});

  const [lead, setLead] = useState({});

  const handleOpen = () => setOpen(true);

  const handleEdit = async (val) => {
    setEdit(true);
    setEditData(val);
  };

  // Delete functionalities
  const handleDelete = async (val) => {
    let resp = await deleteLead(val._id);
    console.log("deletelead24", resp);
    getLeadData();
  };

  // get lead data
  const getLeadData = async () => {
    let resp = await getLead();
    console.log("leads22", resp.getlead);
    setLead(resp.getlead);
  };

  useEffect(() => {
    getLeadData();
  }, []);
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
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {lead.length > 0 && (search.length <= 0 ?
          lead.map((val, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{val.name}</td>
              <td>{val.phone}</td>
              <td>
                <div
                  className={`${styles.buttons} ${styles.button} ${styles.view}`}
                >
                  {/* Edit button */}
                  <Button onClick={() => handleEdit(val)} title="Edit Data">
                    <FaRegEdit sx={{ fontSize: "20px" }} />
                  </Button>

                  {/* Delete button */}
                  <Button
                    aria-label="delete"
                    // size="large"
                    className={`${styles.button} ${styles.delete}`}
                    onClick={() => handleDelete(val)}
                    title="Delete"
                  >
                    <DeleteIcon sx={{ fontSize: "20px", color: "crimson" }} />
                  </Button>
                </div>
              </td>
            </tr>
          ))
          :
          lead.map((val, idx) => (val.name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
            val.phone.includes(search)) && (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{val.name}</td>
              <td>{val.phone}</td>
              <td>
                <div
                  className={`${styles.buttons} ${styles.button} ${styles.view}`}
                >
                  {/* Edit button */}
                  <Button onClick={() => handleEdit(val)} title="Edit Data">
                    <FaRegEdit sx={{ fontSize: "20px" }} />
                  </Button>

                  {/* Delete button */}
                  <Button
                    aria-label="delete"
                    // size="large"
                    className={`${styles.button} ${styles.delete}`}
                    onClick={() => handleDelete(val)}
                    title="Delete"
                  >
                    <DeleteIcon sx={{ fontSize: "20px", color: "crimson" }} />
                  </Button>
                </div>
              </td>
            </tr>
          )))
            }
        </tbody>
      </table>
      <Pagination />
      {/* Add Customer Modal */}
      <AddLeadModal open={open} setOpen={setOpen} setLead={setLead} />

      {/* Edit Customer Modal */}
      {editdata.name && (
        <EditLeadModal
          edit={edit}
          setEdit={setEdit}
          editdata={editdata}
          setLead={setLead}
        />
      )}
    </div>
  );
};

export default LeadCreation;
