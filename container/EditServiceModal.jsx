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
import { editDuedate, editService, getService } from "@/service";
import dayjs from "dayjs";

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

export default function EditServiceModal({
  edit,
  setEdit,
  editdata,
  setService,
}) {
  const [phone, setPhone] = useState(editdata.customerPhone);
  const [date, setDate] = useState(editdata.lastServicedAt);

  useEffect(()=>{
    setPhone(editdata.customerPhone)
    setDate(editdata.lastServicedAt)
  },[editdata])
  
  //   Modal
  const handleClose = () => setEdit(false);

  let getservice = async () => {
    let res = await getService();
    console.log("res", res);
    setService(res.getAllServiceDetails);
  };

  const handleSubmit = async () => {
    if (phone.length !== 10) {
      return alert("Please Fill valid Phone Number");
    }
    let data = {phone };
    data["id"] = editdata._id;
    let res = await editService(data);
    if (res.message !== "Service Updated Successfully!") {
      alert("try again later");
    }
    if(editdata.data !== date){
    let val = {date}
    let res = await editDuedate(val)
    if (res.message !== "Service due date Updated Successfully!") {
      alert("try again later");
    }
    }
    handleClose();
    getservice();
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
                label="Phone Number"
                variant="outlined"
                sx={{ width: "100%" }}
                type="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <br />
              <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Service Date"
                    name="date"
                    value={dayjs(date)}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <br />
              <br />
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
