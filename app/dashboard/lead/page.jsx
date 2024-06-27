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
import { deleteLead, findingUser, getLead } from "@/service";
import EditLeadModal from "@/container/EditLeadModal";
import { IoPersonAddOutline } from "react-icons/io5";
import ConvertModal from "@/container/ConvertModal";
import { useRouter } from "next/navigation";
//select dropdown
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const LeadCreation = () => {
  const [search, setSearch] = useState("");
  // this is adding customer modal
  const [open, setOpen] = useState(false);
  // this is for edit modal
  const [edit, setEdit] = useState(false);
  // this is for convert to customer modal
  const [cust, setCust] = useState(false);
  // here what data i want to edit that data will store
  const [editdata, setEditData] = useState({});

  const [filter, setFilter] = useState("all");

  const [lead, setLead] = useState([]);

  // Pagination setup
  const [startIndex, setStartIndex] = useState(0);

  let router = useRouter();

  const handleOpen = () => setOpen(true);

  const handleEdit = async (val) => {
    setEdit(true);
    setEditData(val);
  };

  //convert customer
  const handleConvert = (val) => {
    setCust(true);
    setEditData(val);
  };

  useEffect(() => {
    if (!edit && !cust) {
      setEditData({});
    }
  }, [edit, cust]);
  // Delete functionalities
  const handleDelete = async (val) => {
    let resp = await deleteLead(val._id);
    console.log("deletelead24", resp);
    getLeadData();
  };

  // get lead data
  const getLeadData = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return null;
    }
    let res = await findingUser(token);
    if (res.type === "serviceEngineer") {
      return router.push("/dashboard/installations");
    }

    let resp = await getLead();
    console.log("leads22", resp.getlead);
    setLead(resp.getlead);
  };

  useEffect(() => {
    getLeadData();
  }, []);

  // code optimization for table row
  const Table = ({ val, idx }) => {
    return(
      <tr key={idx}>
      <td>{startIndex + idx + 1}</td>
      <td>{val.name}</td>
      <td>{val.phone}</td>

      <span className={styles.tabletd} title={val.feedback}>
        <td>{val.feedback}</td>
      </span>

      <td>{val.createdAt}</td>
      <td>{val.handleBy}</td>
      <td>
        <div className={`${styles.buttons} ${styles.button} ${styles.view}`}>
          {/* Edit button */}
          <Button onClick={() => handleEdit(val)} title="Edit Data">
            <FaRegEdit sx={{ fontSize: "20px" }} />
          </Button>

          {/* Convert to customer */}
          <Button
            onClick={() => handleConvert(val)}
            title="Convert to customer"
          >
            <IoPersonAddOutline sx={{ fontSize: "20px" }} />
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
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Filter</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="filter"
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="owner">Owner</MenuItem>
                <MenuItem value="all">All</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
            <td>Remarks</td>
            <td>Created At</td>
            <td>HandleBy</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {lead.length > 0 &&
            (search.length <= 0
              ? lead
                  .slice(startIndex, startIndex + 10)
                  .map(
                    (val, idx) =>
                      (filter == "all" || val.handleBy === filter) && (
                        <Table val={val} idx={idx} key={idx} />
                      )
                  )
              : lead.map(
                  (val, idx) =>
                    (val.name.toLowerCase().includes(search.toLowerCase()) ||
                      val.phone.includes(search)) &&
                    (filter == "all" || val.handleBy === filter) && (
                      <Table val={val} idx={idx} key={idx} />
                    )
                ))}
        </tbody>
      </table>
      <Pagination
        startIndex={startIndex}
        maxlength={lead.length}
        setStartIndex={setStartIndex}
      />
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

      {/* Convert to customer */}
      {editdata.name && (
        <ConvertModal
          cust={cust}
          setCust={setCust}
          editdata={editdata}
          setLead={setLead}
        />
      )}
    </div>
  );
};

export default LeadCreation;
