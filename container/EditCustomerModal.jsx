"use client";
import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, Grid, TextField } from "@mui/material";
import { editCustomer, getAllCustomer, getArea } from "@/service";
import AlertMessage from "./AlertMessage";
// Select dropdown
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const modalStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const paperStyle = (isSmallScreen) => ({
  position: "absolute",
  top: isSmallScreen ? "5%" : "50%",
  left: "50%",
  transform: isSmallScreen ? "translate(-50%, 0)" : "translate(-50%, -50%)",
  width: isSmallScreen ? "40%" : 400,
  maxHeight: '95vh',
  bgcolor: "background.paper",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  p: 4,
  outline: "none",
  borderRadius: "10px",
  overflowY: "auto",
});

export default function EditCustomerModal({
  edit,
  setEdit,
  editdata,
  setCustomer,
}) {
  const [name, setName] = useState(editdata.customerName);
  const [phone, setPhone] = useState(editdata.customerPhone);
  const [doorNo, setDoorNo] = useState(editdata.address.doorNo);
  const [street, setStreet] = useState(editdata.address.street);
  const [area, setArea] = useState(editdata.address.area);
  const [pin, setPin] = useState(editdata.address.pin);
  const [reminder, setReminder] = useState(editdata.reminderMonth);
  // to get area list from db
  const [areaList, setAreaList] = useState({});
  // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setName(editdata.customerName);
    setPhone(editdata.customerPhone);
    setDoorNo(editdata.address.doorNo);
    setStreet(editdata.address.street);
    setArea(editdata.address.area);
    setPin(editdata.address.pin);
    setReminder(editdata.reminderMonth);
  }, [editdata]);
  //   Modal
  const handleClose = () => setEdit(false);

  let getusesr = async () => {
    let res = await getAllCustomer();
    console.log("res", res);
    setCustomer(res.getAllCustomerDetails);
  };

  //get Area list
  let getAreaList = async () => {
    let resp = await getArea();
    setAreaList(resp.getArea);
  };
  useEffect(() => {
    getAreaList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let {doorNo,street,area,pin} = data
    let data = { name, phone, reminderMonth: reminder };
    data["address"] = { doorNo, street, area, pin };
    data["id"] = editdata._id;
    let res = await editCustomer(data);
    if (res.message !== "Customer Updated Succesfully!") {
      setMessage(true);
      setContent("try again later");
      setType("error");
      return null;
    }
    handleClose();
    setMessage(true);
    setContent("Customer Edited successfully!");
    setType("success");
    getusesr();
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
        style={modalStyle}
      >
        <Fade in={edit} className="bg-gray text-black">
          <Box sx={paperStyle}>
            <form
              className="flex flex-col gap-2 w-full justify-center"
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                sx={{ width: "100%" }}
                type="phone"
                name="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              </Grid>
              <Grid item xs={12}>
              <TextField
                id="outlined-multiline-flexible"
                label="Door Number"
                type="doorNo"
                name="doorNo"
                fullWidth
                multiline
                maxRows={4}
                value={doorNo}
                onChange={(e) => {
                  setDoorNo(e.target.value);
                }}
              />
              </Grid>
              <Grid item xs={12}>
              <TextField
                id="outlined-multiline-flexible"
                label="Street"
                type="Street"
                name="street"
                fullWidth
                multiline
                maxRows={4}
                value={street}
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
              />
              </Grid>
              <Grid item xs={12}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Area</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={area}
                    label="area"
                    name="area"
                    onChange={(e) => {
                      setArea(e.target.value);
                    }}
                  >
                    {areaList.length > 0 &&
                      areaList.map((val, idx) => (
                        <MenuItem key={idx} value={val.areaName}>
                          {val.areaName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
              </Grid>
              <Grid item xs={12}>
              <TextField
                id="outlined-multiline-flexible"
                label="Pin Code"
                type="pin"
                name="pin"
                fullWidth
                multiline
                maxRows={4}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {/* service reminder month*/}
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Service reminder Months
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={reminder}
                    label="reminder"
                    name="reminder"
                    onChange={(e) => {
                      setReminder(e.target.value);
                    }}
                  >
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              </Grid>
              <Grid item xs={12}>
              <Button variant="contained" sx={{ width: "100%" }} type="submit">
                update
              </Button>
              </Grid>
              </Grid>
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
}
