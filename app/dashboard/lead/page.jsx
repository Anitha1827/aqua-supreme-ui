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
import SkeletonLoader from "@/container/SkeletonLoader";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css
// call icon
import CallIcon from "@mui/icons-material/Call";
import { DateRangePicker } from "react-date-range";

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
  // skeleton useState
  const [loading, setLoading] = useState(true);

  let router = useRouter();

  const handleOpen = () => setOpen(true);

  //  date picker
  const [dateRangeValue, setDateRangeValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const handleSelect = (ranges) => {
    const { selection } = ranges;
    setDateRangeValue({
      startDate: selection.startDate,
      endDate: selection.endDate,
    });
  };

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
    setLoading(false);
  };

  useEffect(() => {
    getLeadData();
  }, []);

  // code optimization for table row
  const Table = ({ val, idx }) => {
    return (
      <tr key={idx}>
        <td>{startIndex + idx + 1}</td>
        <td>{val.name}</td>
        <td>
          {" "}
          <a className={styles.phoneLink} href={`tel:${val.phone}`}>
            <CallIcon />
          </a>{" "}
          {val.phone}{" "}
        </td>

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
          <Box sx={{ minWidth: 120, marginLeft: 1 }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="filter-select-label">
                <small color="blue">Filter</small>
              </InputLabel>
              <Select
                labelId="filter-select-label"
                id="filter-select"
                value={filter}
                label="Filter"
                onChange={(e) => setFilter(e.target.value)}
                className={styles.filterSelect}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="owner">Owner</MenuItem>
                <MenuItem value="all">All</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div style={{ height: "150px", width: "400px" }}>
          <DateRangePicker
            ranges={[
              {
                startDate: dateRangeValue.startDate,
                endDate: dateRangeValue.endDate,
                key: "selection",
              },
            ]}
            onChange={handleSelect}
            showMonthAndYearPickers={false} // Hide month and year pickers
            showDateDisplay={false} // Hide date display at the top
            months={1} // Display only one month
            weekStartsOn={1} // Start the week on Monday
            weekdayDisplayFormat=" "
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
            <td>Remarks</td>
            <td>Created At</td>
            <td>Handle By</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            lead.length > 0 &&
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
      {loading && <SkeletonLoader />}
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
