"use client";
import React, { useEffect, useState } from "react";
import "@/app/ui/dashboard/addcustomer/addcustomer.module.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, TextField } from "@mui/material";
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

const validataionSchema = yup.object({
  name: yup.string().required("Please Enter Name"),
  phone: yup.string().required("please Enter Phone Number"),
  doorNo: yup.string().required("Please Enter door Number"),
  street: yup.string().required("Please Enter Streat"),
  area: yup.string().required("Please Enter Area"),
  pin: yup.string().required("Please Enter Pin Number"),
});

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
  overflow: "auto",
  height: "70vh",
};

export default function AddCustomerModel({ open, setOpen, setCustomer }) {
  //   Modal
  const handleClose = () => setOpen(false);

  // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  //for area list
  const [area, setArea] = useState({});
  // Get area list
  let getAreaList = async () => {
    let resp = await getArea();
    setArea(resp.getArea);
  };

  useEffect(() => {
    getAreaList();
  }, []);

  // Formik
  let { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      name: "",
      phone: "",
      doorNo: "",
      street: "",
      area: "",
      pin: "",
    },
    validationSchema: validataionSchema,
    onSubmit: async (data) => {
      console.log("data", data);
      let { doorNo, street, area, pin } = data;
      data["address"] = { doorNo, street, area, pin };
      let res = await addNewCustomer(data);
      if (res.message !== "Customer Added Successfully!") {
        setMessage(true);
        setContent("try again later");
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
    <div>
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
      >
        <Fade in={open} className="bg-gray text-black">
          <Box sx={style}>
            <form className="form-container" onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <div style={{ margin: "10px", width: "100%" }}>
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
                </div>
                <div style={{ margin: "10px", width: "100%" }}>
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
                </div>
              </div>
              <label
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  color: "gray",
                }}
              >
                Address
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <div style={{ margin: "10px", width: "100%" }}>
                  {/* Address Field */}

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
                </div>

                <div style={{ margin: "10px", width: "100%" }}>
                  {/* Address Field */}
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
                  {errors.address ? (
                    <div style={{ color: "crimson", padding: "5px" }}>
                      {errors.address}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <div style={{ margin: "10px", width: "100%" }}>
                  {/* Address Field */}
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Area
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.area}
                        label="area"
                        name="area"
                        onChange={handleChange}
                      >
                        {area.length > 0 && area.map((val, idx) => (
                          <MenuItem key={idx} value={val.areaName}>{val.areaName}</MenuItem>
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
                </div>

                <div style={{ margin: "10px", width: "100%" }}>
                  {/* Address Field */}
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
                </div>
              </div>
              <br />
              <br />
              <Button variant="contained" sx={{ width: "100%" }} type="submit">
                Add
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
}
