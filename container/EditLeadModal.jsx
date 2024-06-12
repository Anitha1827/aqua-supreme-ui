"use client"
import React, { useEffect, useState } from 'react'
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, TextField } from "@mui/material";
import { getLead, updateLead } from '@/service';

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


const EditLeadModal = ({edit,setEdit,editdata,setLead}) => {
    const[name, setName] = useState(editdata.name);
    const[phone, setPhone] = useState(editdata.phone);

    useEffect(()=>{
        setName(editdata.name);
        setPhone(editdata.phone)
    },[editdata])

    const handleClose = () => setEdit(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!name|| !phone){
            return alert("please fill all fields")
        }
        let data = {name, phone, id:editdata._id}
        data["id"] = editdata._id;
        let resp = await updateLead(data);
        if(resp.message !== "lead updated successfully!"){
            alert("try again later");
        }
        handleClose();
        getLeadData();
    }

    // get lead data
    const getLeadData = async() =>{
        let resp  = await getLead();
        console.log("editedlead37", resp.getlead)
        setLead(resp.getlead);
    }
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
              label="Product Name"
              variant="outlined"
              sx={{ width: "100%" }}
              type="name"
              name="name"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
            />
            <br/>
            <br/>
              <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              sx={{ width: "100%" }}
              type="phone"
              name="phone"
              value={phone}
              onChange={(e)=>{setPhone(e.target.value)}}
            />
            <br/>
            <br/>
            <Button variant="contained" sx={{ width: "100%" }} type="submit">
              update
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  </div>
  )
}

export default EditLeadModal