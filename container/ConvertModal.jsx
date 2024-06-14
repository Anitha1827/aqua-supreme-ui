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

// Select dropdown
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// formik
import * as yup from "yup";
import { useFormik } from "formik";
import {
  addNewCustomer,
  addNewInstallation,
  deleteLead,
  getLead,
} from "@/service";
import AlertMessage from "./AlertMessage";

const validataionSchema = yup.object({
  doorNo: yup.string().required("Please Enter Door Number"),
  street: yup.string().required("Please Enter street"),
  area: yup.string().required("Please Enter Area"),
  pin: yup.string().required("Please Enter pin Number"),
  date: yup.string().required("Please select Date"),
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
};

const ConvertModal = ({ cust, setCust, editdata, setLead }) => {
  // Snackbar
  const [message, setMessage] = useState(false);
  const [messagetype, setMessageType] = useState("");
  const [content, setContent] = useState("");

  // Select dropdown
  const [type, setType] = useState("");
  // date
  // const [date, setDate] = useState("");
  const [name, setName] = useState(editdata.name);
  const [phone, setPhone] = useState(editdata.name);

  // Select dropdown
  const handledropdown = (event) => {
    setType(event.target.value);
  };

  // Modal
  const handleClose = () => setCust(false);

  let { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      date: new Date(),
      doorNo: "",
      street: "",
      area: "",
      pin: "",
    },

    validationSchema: validataionSchema,
    onSubmit: async (val) => {
      let data = {};
      data["address"] = {
        doorNo: val.doorNo,
        street: val.street,
        area: val.area,
        pin: val.pin,
      };
      data["name"] = name;
      data["phone"] = phone;
      data["date"] = val.date;

      if (!name && !phone) {
        setMessage(true);
        setContent("please fill all required fields");
        setMessageType("error");
        return null;
      }
      if (type === "installation") {
        let res = await addNewInstallation(data);
        console.log("modal52", res);
        //checking an response message for successfully installation added
        // if not show alert
        if (res.message !== "Customer Added Successfully!") {
          setMessage(true);
          setContent("try again later");
          setMessageType("error");
          return null;
        }
      } else {
        let res = await addNewCustomer(data);
        console.log("modal52", res);
        //checking an response message for successfully installation added
        // if not show alert
        if (res.message !== "Customer Added Successfully!") {
          setMessage(true);
          setContent("try again later");
          setMessageType("error");
          return null;
        }
      }

      await deleteLead(editdata._id);
      getLeadData();
      handleClose();
      setMessage(true);
      setContent("Lead Converted to Customer successfully!");
      setMessageType("success");
    },
  });
  // get lead data
  const getLeadData = async () => {
    let resp = await getLead();
    setLead(resp.getlead);
  };

  useEffect(() => {
    setName(editdata.name);
    setPhone(editdata.phone);
  }, [editdata]);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={cust}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={cust} className="bg-gray text-black">
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
                <div style={{ margin: "10px", width: "100%" }}>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    type="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div style={{ margin: "10px", width: "100%" }}>
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
                </div>
              </div>
              <label
                style={{
                  color: "gray",
                  display: "flex",
                  justifyContent: "center",
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
                </div>
                <div style={{ margin: "10px", width: "100%" }}>
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
                  <TextField
                    id="outlined-basic"
                    label="Area"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    type="area"
                    name="area"
                    value={values.area}
                    onChange={handleChange}
                  />
                  {errors.area ? (
                    <div style={{ color: "crimson", padding: "5px" }}>
                      {errors.area}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div style={{ margin: "10px", width: "100%" }}>
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
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Service Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="type"
                        onChange={handledropdown}
                      >
                        <MenuItem value={"service"}>Service</MenuItem>
                        <MenuItem value={"installation"}>Installation</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>

                <div style={{ margin: "10px", width: "100%" }}>
                  {type === "installation" && (
                    <>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                    </>
                  )}
                </div>
              </div>
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
        messageType={messagetype}
      />
    </div>
  );
};

export default ConvertModal;
