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
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditInstallationModal({ edit, setEdit, editdata, setInstall}) {
  const [name, setName] = useState(editdata.customerName);
  const [phone, setPhone] = useState(editdata.customerPhone);
  const [date, setDate] = useState(editdata.duedate);
  const [doorNo, setDoorNo] = useState(editdata.address.doorNo);
  const [street, setStreet] = useState(editdata.address.street)
  const [area, setArea] = useState(editdata.address.area);
  const [pin, setPin] = useState(editdata.address.pin);

  useEffect(()=>{
    setName(editdata.customerName);
    setPhone(editdata.customerPhone)
    setDate(editdata.duedate ? editdata.duedate.split("").splice(0,10).join("") : "");
    setDoorNo(editdata.address.doorNo);
    setArea(editdata.address.area)
    setStreet(editdata.address.street)
    setPin(editdata.address.pin)
  },[editdata])

  const handleClose = () => setEdit(false);

  const getInstallation = async () => {
    let response = await getInstallationDetails();
    console.log("line63", response.getAllCustomerDetails);
    setInstall(response.getAllCustomerDetails);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!name || !phone || !date){
      return alert("Please fill all the fields")
    }
    let data = {name,phone,duedate:date,address:{doorNo,area,pin,street}}
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
              <div style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}>
                <div style={{ width: "100%", margin: "10px" }}>
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
                </div>
                <div style={{ width: "100%", margin: "10px" }}>
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
                </div>
              </div>
              <label style={{display:"flex", justifyContent:"center", color:"black"}}>Address</label>
             <div style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}>
              <div style={{ width: "100%", margin: "10px" }}>
              <TextField
                id="outlined-basic"
                label="Door Number"
                variant="outlined"
                sx={{ width: "100%" }}
                type="doorNo"
                name="doorNo"
                value={doorNo}
                onChange={(e)=>{setDoorNo(e.target.value)}}
              />
              </div>
              <div style={{ width: "100%", margin: "10px" }}>
              <TextField
                id="outlined-basic"
                label="Street"
                variant="outlined"
                sx={{ width: "100%" }}
                type="street"
                name="street"
                value={street}
                onChange={(e)=>{setStreet(e.target.value)}}
              />
              </div>
             </div>
              
              <div style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }} >
              <div style={{ width: "100%", margin: "10px" }}>
              <TextField
                id="outlined-basic"
                label="Area"
                variant="outlined"
                sx={{ width: "100%" }}
                type="area"
                name="area"
                value={area}
                onChange={(e)=>{setArea(e.target.value)}}
              />
              </div>
              <div style={{ width: "100%", margin: "10px" }}>
              <TextField
                id="outlined-basic"
                label="Pin Code"
                variant="outlined"
                sx={{ width: "100%" }}
                type="pin"
                name="pin"
                value={pin}
                onChange={(e)=>{setPin(e.target.value)}}
              />
              </div>
              </div>
              
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Installation Date"
                    name="date"
                    value={dayjs(date)}
                    onChange={(e)=>{
                     setDate(e)
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
