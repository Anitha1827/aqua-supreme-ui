"use client";
import React, { useEffect, useState } from "react";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import SearchIcon from "@mui/icons-material/Search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import { Button } from "@nextui-org/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaRegEdit } from "react-icons/fa";
import AddAreaModal from "@/container/AddAreaModal";
import { deleteArea, getArea } from "@/service";
import EditAreaModal from "@/container/EditAreaModal";

const AreaPage = () => {
  const [search, setSearch] = useState("");
  // Pagination setup
  const [startIndex, setStartIndex] = useState(0);
  //   Modal
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  //   backend data storage
  const [area, setArea] = useState([]);
  const [editdata, setEditData] = useState({})

//   Edit function
    const handleEdit = async(val) => {
        setEditData(val)
        setEdit(true)
    };
    //   Delete functionalities
  const handleDelete = async(val) => {
    let resp = await deleteArea(val._id);
    console.log("deletedArea", resp);
    getAreadata();
};

//fetching data 
  const getAreadata = async () => {
    let resp = await getArea();
    setArea(resp.getArea);
  };
  useEffect(() => {
    getAreadata();
  }, []);

  const handleOpen = () => setOpen(true);



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
            <td>Area Name</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {area.length > 0 && search.length <= 0
           ? area.slice(startIndex, startIndex + 10).map((val, idx) => (
              <tr key={idx}>
                <td>{startIndex + idx + 1}</td>
                <td>{val.areaName}</td>
                <td>
                  <div
                    className={`${styles.buttons} ${styles.button} ${styles.view}`}
                  >
                    <Button
                        onClick={() => handleEdit(val)}
                      className={`${styles.button} ${styles.view}`}
                      title="Edit"
                      color="primary"
                    >
                      <FaRegEdit sx={{ fontSize: "20px" }} />
                    </Button>

                    <Button
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
          area.map((val, idx) => (val.areaName
            .toLowerCase()
            .includes(search.toLowerCase())) && (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{val.areaName}</td>
              <td>
                <div
                  className={`${styles.buttons} ${styles.button} ${styles.view}`}
                >
                  <Button
                      onClick={() => handleEdit(val)}
                    className={`${styles.button} ${styles.view}`}
                    title="Edit"
                    color="primary"
                  >
                    <FaRegEdit sx={{ fontSize: "20px" }} />
                  </Button>

                  <Button
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
          }
        </tbody>
      </table>
      <Pagination
        startIndex={startIndex}
        maxlength={area.length}
        setStartIndex={setStartIndex}
      />
      {/* Add Area Modal */}
      <AddAreaModal open={open} setOpen={setOpen} setArea={setArea} />

      {/* Edit Customer Modal */}
      {editdata.areaName && (
        <EditAreaModal
          edit={edit}
          setEdit={setEdit}
          editdata={editdata}
          setArea={setArea}
        />
      )}
    </div>
  );
};

export default AreaPage;
