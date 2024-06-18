import React, { useEffect, useState } from 'react'
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, TextField } from "@mui/material";
import AlertMessage from './AlertMessage';
import { getArea, updateArea } from '@/service';

const EditAreaModal = ({edit, setEdit,editdata,setArea}) => {
    const [areaName, setAreaname] = useState(editdata.areaName)
    useEffect(()=>{
        setAreaname(editdata.areaName)
    },[editdata])
    // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  const handleClose = () => setEdit(false);
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!areaName){
        setMessage(true);
      setContent("Please fill Area field");
      setType("error");
      return null;
    }
    let data = {areaName, id:editdata._id};
    data["id"] = editdata._id;
    let resp = await updateArea(data)
    if (resp.message !== "Area Updated successfully!") {
        setMessage(true);
        setContent("try again later");
        setType("error");
        return null;
      }
      handleClose();
      setMessage(true);
      setContent("Area Edited successfully!");
      setType("success");
      getAreadata();
  };

  const getAreadata = async () => {
    let resp = await getArea();
    setArea(resp.getArea);
  };
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
                label="Area Name"
                variant="outlined"
                sx={{ width: "100%" }}
                type="areaName"
                name="areaName"
                value={areaName}
                onChange={(e) => {
                  setAreaname(e.target.value);
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
  )
}

export default EditAreaModal