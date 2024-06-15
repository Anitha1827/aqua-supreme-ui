import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, TextField } from "@mui/material";
import AlertMessage from "./AlertMessage";
import { getSpare, updateSpare } from "@/service";

// Modal style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditSparesModal = ({ edit, setEdit, editdata, setSpares }) => {
  const [name, setName] = useState(editdata.spareName);
  const [code, setCode] = useState(editdata.spareNumber);

  // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setName(editdata.spareName), setCode(editdata.spareNumber);
  }, [editdata]);

  const handleClose = () => setEdit(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !code) {
      setMessage(true);
      setContent("please fill all fields");
      setType("error");
      return null;
    }
    let data = { spareName: name, spareNumber: code, id: editdata._id };
    data["id"] = editdata._id;
    let resp = await updateSpare(data);
    if (resp.message !== "Spare updated Successfully!") {
      setMessage(true);
      setContent("try again later");
      setType("error");
      return null;
    }
    handleClose();
    setMessage(true);
    setContent("Spare updated Successfully!");
    setType("success");
    getSparedata();
  };
  // Get Spare data
  const getSparedata = async () => {
    let resp = await getSpare();
    setSpares(resp.getSpare);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={edit}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={edit} className="bg-gray text-black">
          <Box sx={style}>
            <form
              className="flex flex-col gap-2 w-full justify-center"
              onSubmit={handleSubmit}
            >
              <TextField
                id="outlined-basic"
                label="spare Name"
                variant="outlined"
                sx={{ width: "100%" }}
                type="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <br />
              <br />
              <TextField
                id="outlined-basic"
                label="Spare Number"
                variant="outlined"
                sx={{ width: "100%" }}
                type="code"
                name="code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
              <br />
              <br />
              <Button variant="contained" sx={{ width: "100%" }} type="submit">
                update
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
      <AlertMessage
        open={message}
        setOpen={setMessage}
        message={content}
        messageType={type}
      />
    </div>
  );
};

export default EditSparesModal;
