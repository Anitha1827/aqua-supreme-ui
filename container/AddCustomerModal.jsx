"use client";
import React, { useEffect, useState } from "react";
import "@/app/ui/dashboard/addcustomer/addcustomer.module.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, Grid, TextField } from "@mui/material";
// Select dropdown
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// formik
import * as yup from "yup";
import { useFormik } from "formik";
import { addNewCustomer, getAllCustomer, getArea } from "@/service";
import AlertMessage from "./AlertMessage";

const validationSchema = yup.object({
  name: yup.string().required("Please Enter Name"),
  phone: yup.string().required("Please Enter Phone Number"),
  doorNo: yup.string().required("Please Enter Door Number"),
  street: yup.string().required("Please Enter Street"),
  area: yup.string().required("Please Select Area"),
  pin: yup.string().required("Please Enter Pin Number"),
  // reminder:yup.string().required("Please Enter Reminder Date")
});

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
  width: isSmallScreen ? "90%" : 400,
  maxHeight: '95vh',
  bgcolor: "background.paper",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  p: 4,
  outline: "none",
  borderRadius: "10px",
  overflowY: "auto",
});

export default function AddCustomerModel({ open, setOpen, setCustomer }) {
  const handleClose = () => setOpen(false);

  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [area, setArea] = useState({});
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [reminder, setReminder] = useState('3')

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getAreaList = async () => {
    let resp = await getArea();
    setArea(resp.getArea);
  };

  useEffect(() => {
    getAreaList();
  }, []);

  let { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      name: "",
      phone: "",
      doorNo: "",
      street: "",
      area: "",
      pin: "",
      // reminder:"",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      let { doorNo, street, area, pin } = data;
      data["address"] = { doorNo, street, area, pin };
      let res = await addNewCustomer(data);

      if (res.message !== "Customer Added Successfully!") {
        setMessage(true);
        setContent("please enter unique phone number");
        setType("error");
        return null;
      }
      handleClose();
      setMessage(true);
      setContent("Customer added successfully!");
      setType("success");
      getCustomerDetails();
    },
  });

  let getCustomerDetails = async () => {
    let res = await getAllCustomer();
    setCustomer(res.getAllCustomerDetails);
  };

  return (
    <div className="modal">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
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
        <Fade in={open}>
          <Box sx={paperStyle(isSmallScreen)}>
            <form className="form-container" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    type="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    fullWidth
                  />
                  {errors.name ? (
                    <div className="error-message">{errors.name}</div>
                  ) : (
                    ""
                  )}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    type="phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                  />
                  {errors.phone ? (
                    <div className="error-message">{errors.phone}</div>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12}>
                  <label
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      color: "gray",
                    }}
                  >
                    Address
                  </label>
                </Grid>
                {/* Address Field */}
                <Grid item xs={12}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Door Number"
                    type="doorNo"
                    name="doorNo"
                    fullWidth
                    multiline
                    maxRows={4}
                    value={values.doorNo}
                    onChange={handleChange}
                  />
                  {errors.doorNo ? (
                    <div style={{ color: "crimson", padding: "5px" }}>
                      {errors.doorNo}
                    </div>
                  ) : (
                    ""
                  )}
                </Grid>
                {/* Address Field */}
                <Grid item xs={12}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Street"
                    type="street"
                    name="street"
                    fullWidth
                    multiline
                    maxRows={4}
                    value={values.street}
                    onChange={handleChange}
                  />
                  {errors.street ? (
                    <div style={{ color: "crimson", padding: "5px" }}>
                      {errors.street}
                    </div>
                  ) : (
                    ""
                  )}
                </Grid>
                {/* Address Field */}
                <Grid item xs={12}>
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Area</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.area}
                        label="area"
                        name="area"
                        onChange={handleChange}
                      >
                        {area.length > 0 &&
                          area.map((val, idx) => (
                            <MenuItem key={idx} value={val.areaName}>
                              {val.areaName}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Box>
                  {errors.area ? (
                    <div style={{ color: "crimson", padding: "5px" }}>
                      {errors.area}
                    </div>
                  ) : (
                    ""
                  )}
                </Grid>
                {/* Address Field */}
                <Grid item xs={12}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Pin Code"
                    type="pin"
                    name="pin"
                    fullWidth
                    multiline
                    maxRows={4}
                    value={values.pin}
                    onChange={handleChange}
                  />
                  {errors.pin ? (
                    <div style={{ color: "crimson", padding: "5px" }}>
                      {errors.pin}
                    </div>
                  ) : (
                    ""
                  )}
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
                  <Button
                    variant="contained"
                    sx={{ width: "100%", marginBottom: "10px" }}
                    type="submit"
                  >
                    Add
                  </Button>
                  <br />
                  <br />
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
