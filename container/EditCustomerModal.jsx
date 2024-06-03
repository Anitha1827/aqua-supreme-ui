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
import { editCustomer, getCustomer } from "@/service";

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

export default function EditCustomerModal({
  edit,
  setEdit,
  editdata,
  setCustomer,
}) {
  const [name, setName] = useState(editdata.customerName);
  const [phone, setPhone] = useState(editdata.customerPhone);
  const [address, setAddress] = useState(editdata.address);
  const [date, setDate] = useState(editdata.lastServicedAt);

  useEffect(()=>{
    setName(editdata.customerName)
    setPhone(editdata.customerPhone)
    setAddress(editdata.address)
    setDate(editdata.lastServicedAt)
  },[editdata])
  //   Modal
  const handleClose = () => setEdit(false);

  let getusesr = async () => {
    let res = await getCustomer();
    console.log("res", res);
    setCustomer(res.getAllCustomerDetails);
  };
  
  const handleSubmit = async() => {
    if(!name || !phone || !address || !date){
      return alert("Please Fill all Field")
    }
    let data = {name,phone, address, date}
    data["id"] = editdata._id;
    let res = await editCustomer(data);
    if (res.message !== "Customer Updated Succesfully!") {
      alert("try again later");
    }
    handleClose();
    getusesr();
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <div style={{ width: "100%", margin: "10px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    type="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                  />
                </div>

                <div style={{ width: "100%", margin: "10px" }}>
                  <TextField
                    id="outlined-basic"
                    label="phone Number"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    type="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <div style={{ width: "100%", margin: "10px" }}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Address"
                    type="address"
                    name="address"
                    fullWidth
                    multiline
                    maxRows={4}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>
                <div style={{ width: "100%", margin: "10px" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        fullWidth
                        label="Service/Install At"
                        name="date"
                        value={dayjs(date)}
                        onChange={(e) => {
                          setDate(e.target.value);
                          // handleChange({
                          //   target: { name: "date", value: date.format() },
                          // });
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>

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
