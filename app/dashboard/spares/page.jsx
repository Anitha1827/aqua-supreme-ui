"use client";
import React, { useEffect, useState } from "react";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import SearchIcon from "@mui/icons-material/Search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import { Button } from "@nextui-org/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaRegEdit } from "react-icons/fa";
import AddSparesModal from "@/container/AddSparesModal";
import { deleteSpare, findingUser, getSpare } from "@/service";
import EditSparesModal from "@/container/EditSparesModal";
import { useRouter } from "next/navigation";

const Spares = () => {
  let router = useRouter();
  const [search, setSearch] = useState("");
  // Pagination setup
  const [startIndex, setStartIndex] = useState(0);
  //   Modal
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  //   backend data storage
  const [spares, setSpares] = useState([]);
  //   edited data state
  const [editdata, setEditData] = useState({});

  // Get Spare data
  const getSparedata = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return null;
    }
    let res = await findingUser(token);
    if (res.type === "serviceEngineer") {
      return router.push("/dashboard/installations");
    }

    let resp = await getSpare();
    setSpares(resp.getSpare);
  };

  //   edit function
  const handleEdit = async (spares) => {
    setEditData(spares);
    setEdit(true);
  };

  //   Delete functionalities
  const handleDelete = async (sprs) => {
    let res = await deleteSpare(sprs._id);
    console.log("line28", res);
    getSparedata();
  };
  useEffect(() => {
    getSparedata();
  }, []);

  const handleOpen = () => setOpen(true);
  //optimization code for table row
  const Table = ({ sprs, idx }) => {
    <tr key={idx}>
      <td>{startIndex + idx + 1}</td>
      <td>{sprs.spareName}</td>
      <td>{sprs.spareNumber}</td>
      <td>
        <div className={`${styles.buttons} ${styles.button} ${styles.view}`}>
          <Button
            onClick={() => handleEdit(sprs)}
            className={`${styles.button} ${styles.view}`}
            title="Edit"
            color="primary"
          >
            <FaRegEdit sx={{ fontSize: "20px" }} />
          </Button>

          <Button
            className={`${styles.button} ${styles.delete}`}
            onClick={() => handleDelete(sprs)}
            title="Delete"
          >
            <DeleteIcon sx={{ fontSize: "20px", color: "crimson" }} />
          </Button>
        </div>
      </td>
    </tr>;
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
            <td>spare Name</td>
            <td>spare Number</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {spares.length > 0 && search.length <= 0
            ? spares
                .slice(startIndex, startIndex + 10)
                .map((sprs, idx) => <Table sprs={sprs} idx={idx} key={idx} />)
            : spares.map(
                (sprs, idx) =>
                  (sprs.spareName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                    sprs.spareNumber.includes(search)) && (
                    <Table sprs={sprs} idx={idx} key={idx} />
                  )
              )}
        </tbody>
      </table>
      <Pagination
        startIndex={startIndex}
        maxlength={spares.length}
        setStartIndex={setStartIndex}
      />
      {/* Add Spares Modal */}
      <AddSparesModal open={open} setOpen={setOpen} setSpares={setSpares} />

      {/* Edit Customer Modal */}
      {editdata.spareName && (
        <EditSparesModal
          edit={edit}
          setEdit={setEdit}
          editdata={editdata}
          setSpares={setSpares}
        />
      )}
    </div>
  );
};

export default Spares;
