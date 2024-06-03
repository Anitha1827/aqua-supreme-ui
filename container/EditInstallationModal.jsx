"use client";
import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, TextField } from "@mui/material";
// Date picker
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { editInstallation, getInstallationDetails } from "@/service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditInstallationModal({ edit, setEdit, editdata, setInstall}) {
  const [name, setName] = useState(editdata.customerName);
  const [phone, setPhone] = useState(editdata.customerPhone);
  const [date, setDate] = useState(editdata.lastServicedAt);

  useEffect(()=>{
    setName(editdata.customerName);
    setPhone(editdata.customerPhone)
    setDate(editdata.lastServicedAt)
  },[editdata])

  const handleClose = () => setEdit(false);

  const getInstallation = async () => {
    let response = await getInstallationDetails();
    console.log("line63", response);
    setInstall(response.getAllCustomerDetails);
  };

  const handleSubmit = async() => {
    if(!name || !phone || !date){
      return alert("Please fill all the fields")
    }
    let data = {name,phone,date}
    data["id"] = editdata._id;
      let res = await editInstallation(data);
      if (res.message !== "Customer Updated Succesfully!") {
        alert("try again later");
      }
      handleClose();
      getInstallation();
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
                label="Name"
                variant="outlined"
                sx={{ width: "100%" }}
                type="name"
                name="name"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
              />
             
              <br />
              <br />
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
              
              <br />
              <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Service/Install At"
                    name="date"
                    value={dayjs(date)}
                    onChange={(e)=>{
                     setDate(e.target.value)
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
             
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
  );
}
