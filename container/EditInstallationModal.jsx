"use client";
import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, Grid, TextField } from "@mui/material";
// Date picker
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { editInstallation, getArea, getInstallationDetails } from "@/service";
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

const paperStyle = {
  position: "absolute",
  width: "90%",
  maxWidth: 500,
  maxHeight: "98vh",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  p: 4,
  outline: "none",
  borderRadius: "10px",
};
export default function EditInstallationModal({
  edit,
  setEdit,
  editdata,
  setInstall,
}) {
  const [name, setName] = useState(editdata.customerName);
  const [phone, setPhone] = useState(editdata.customerPhone);
  const [date, setDate] = useState(editdata.duedate);
  const [doorNo, setDoorNo] = useState(editdata.address.doorNo);
  const [street, setStreet] = useState(editdata.address.street);
  const [area, setArea] = useState(editdata.address.area);
  const [pin, setPin] = useState(editdata.address.pin);
  // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  // to get area list from db
  const [areaList, setAreaList] = useState({});
  //get Area list
  let getAreaList = async () => {
    let resp = await getArea();
    setAreaList(resp.getArea);
  };
  useEffect(() => {
    getAreaList();
  }, []);

  useEffect(() => {
    setName(editdata.customerName);
    setPhone(editdata.customerPhone);
    setDate(
      editdata.duedate ? editdata.duedate.split("").splice(0, 10).join("") : ""
    );
    setDoorNo(editdata.address.doorNo);
    setArea(editdata.address.area);
    setStreet(editdata.address.street);
    setPin(editdata.address.pin);
  }, [editdata]);

  const handleClose = () => setEdit(false);

  const getInstallation = async () => {
    let response = await getInstallationDetails();
    console.log("line63", response.getAllCustomerDetails);
    setInstall(response.getAllCustomerDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !date) {
      setMessage(true);
      setContent("Please fill all the fields");
      setType("error");
      return null;
    }
    let data = {
      name,
      phone,
      duedate: date,
      address: { doorNo, area, pin, street },
    };
    data["id"] = editdata._id;
    let res = await editInstallation(data);
    if (res.message !== "Customer Updated Succesfully!") {
      setMessage(true);
      setContent("try again later");
      setType("error");
      return null;
    }
    handleClose();
    setMessage(true);
    setContent("Installation edited successfully!");
    setType("success");
    getInstallation();
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
                <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                sx={{ width: "100%" }}
                type="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              </Grid>
              <Grid item xs={12} sm={6}>
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
              <label>Address</label>
              </Grid>
              <Grid item xs={12} >
              <TextField
                id="outlined-basic"
                label="Door Number"
                variant="outlined"
                sx={{ width: "100%" }}
                type="doorNo"
                name="doorNo"
                value={doorNo}
                onChange={(e) => {
                  setDoorNo(e.target.value);
                }}
              />
              </Grid>
              <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Street"
                variant="outlined"
                sx={{ width: "100%" }}
                type="street"
                name="street"
                value={street}
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
              />
              </Grid>
              <Grid item xs={12}>
              <Box>
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
                id="outlined-basic"
                label="Pin Code"
                variant="outlined"
                sx={{ width: "100%" }}
                type="pin"
                name="pin"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                }}
              />
              </Grid>

              <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Installation Date"
                    name="date"
                    value={dayjs(date)}
                    onChange={(e) => {
                      setDate(e);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
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
