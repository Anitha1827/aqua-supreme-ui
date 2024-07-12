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

// formik
import * as yup from "yup";
import { useFormik } from "formik";
import {
  addNewInstallation,
  getAllProduct,
  getArea,
  getInstallationDetails,
} from "@/service";
import AlertMessage from "./AlertMessage";
// select dropdown
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const validataionSchema = yup.object({
  name: yup.string().required("Please Enter Name"),
  phone: yup.string().required("please Enter Phone Number"),
  date: yup.string().required("Please Select Installation date"),
  doorNo: yup.string().required("Please Enter Door Number"),
  street: yup.string().required("Please Enter street"),
  area: yup.string().required("Please Select Area"),
  pin: yup.string().required("Please Enter pin Number"),
});

const modalStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const paperStyle = {
  position: "absolute",
  width: "90%",
  maxWidth: 500,
  maxHeight: "110vh",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  p: 4,
  outline: "none",
  borderRadius: "10px",
};

const AddInstallationModal = ({ open, setOpen, setInstall }) => {
  // Select dropdown
  const [product, setProduct] = useState("");
  const [prodList, setProdList] = useState([]);
  //for area list
  const [area, setArea] = useState({});
  // Get area list
  let getAreaList = async () => {
    let resp = await getArea();
    setArea(resp.getArea);
  };

  const handleSelect = (event) => {
    setProduct(event.target.value);
  };

  // Modal
  const handleClose = () => setOpen(false);

  // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  let { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      name: "",
      phone: "",
      date: new Date(),
      doorNo: "",
      street: "",
      area: "",
      pin: "",
    },
    validationSchema: validataionSchema,
    onSubmit: async (data) => {
      let { doorNo, street, area, pin } = data;
      data["address"] = { doorNo, street, area, pin };
      data["product"] = product;
      let res = await addNewInstallation(data);
      console.log("modal52", res);
      //checking an response message for successfully installation added
      // if not show alert
      if (res.message !== "Customer Added Successfully!") {
        setMessage(true);
        setContent("try again later");
        setType("error");
        return null;
      }
      handleClose();
      setMessage(true);
      setContent("Installation added successfully!");
      setType("success");
      getInstallation();
    },
  });
  const getInstallation = async () => {
    let response = await getInstallationDetails();
    setInstall(response.getAllCustomerDetails);
  };

  // fetching product
  let getProduct = async () => {
    let resp = await getAllProduct();
    console.log("produPage106", resp.getproduct);
    setProdList(resp.getproduct);
  };
  useEffect(() => {
    getProduct();
    getAreaList();
  }, []);
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
        style={modalStyle}
      >
        <Fade in={open} className="bg-gray text-black">
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
                    value={values.name}
                    onChange={handleChange}
                  />
                  {errors.name ? (
                    <div style={{ color: "crimson", padding: "5px" }}>
                      {errors.name}
                    </div>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    type="phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                  />
                  {errors.phone ? (
                    <div style={{ color: "crimson", padding: "5px" }}>
                      {errors.phone}
                    </div>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Installation Date"
                        name="date"
                        value={dayjs(values.date)}
                        onChange={(date) => {
                          handleChange({
                            target: { name: "date", value: date.format() },
                          });
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {errors.date ? (
                    <div style={{ color: "crimson", padding: "5px" }}>
                      {errors.date}
                    </div>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Product
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={product}
                        label="product"
                        name="product"
                        onChange={handleSelect}
                      >
                        {prodList.map((val, idx) => (
                          <MenuItem
                            key={idx}
                            value={`${val.productname} - ${val.productmodel}`}
                          >
                            {val.productname} - {val.productmodel}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <label>Address</label>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Door Number"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    type="doorNo"
                    name="doorNo"
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
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Street"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    type="street"
                    name="street"
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
                <Grid item xs={12}>
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

                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Pin Code"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    type="pin"
                    name="pin"
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
                  <Button
                    variant="contained"
                    sx={{ width: "100%" }}
                    type="submit"
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>
      {/* snackbar */}
      <AlertMessage
        open={message}
        setOpen={setMessage}
        message={content}
        messageType={type}
      />
    </div>
  );
};

export default AddInstallationModal;
