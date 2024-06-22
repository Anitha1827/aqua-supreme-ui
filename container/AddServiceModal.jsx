"use client";
import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button } from "@mui/material";
// Date picker
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// Drop down
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// formik
import * as yup from "yup";
import { useFormik } from "formik";
import { addService, getService, getServiceReminderCustomer } from "@/service";
import dayjs from "dayjs";
import AlertMessage from "./AlertMessage";

const validataionSchema = yup.object({
  duedate: yup.string().required("Please select service date"),
});

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

export default function AddServiceModal({ open, setOpen, setService }) {
  // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  // Dropdown
  const [custname, setCustName] = useState([]);
  const [loading, setLoading] = useState(true);

  const [id, setId] = useState();

  //   Modal
  const handleClose = () => setOpen(false);

  let { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      duedate: new Date(),
    },
    validationSchema: validataionSchema,
    onSubmit: async (data) => {
      if (id == "") {
        setMessage(true);
        setContent("please select the customer");
        setType("error");
        return null;
      }
      let val = custname.filter((val) => val._id == id);
      data["phone"] = val[0].customerPhone;
      data["customerId"] = id;
      data["customerName"] = val[0].customerName;
      let res = await addService(data);
      if (res.message !== "Service Created Successfully!") {
        setMessage(true);
        setContent("try again later");
        setType("error");
        return null;
      }
      handleClose();
      setMessage(true);
      setContent("Service added successfully!");
      setType("success");
      setLoading(true);
      setId("");
      getservicemodal();
    },
  });

  let getservicemodal = async () => {
    let res = await getService();
    setService(res.getAllServiceDetails);
    getCustomerDetails();
  };

  let getCustomerDetails = async () => {
    let response = await getServiceReminderCustomer();
    setCustName(response.data);
    setLoading(false);
  };
  useEffect(() => {
    getCustomerDetails();
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
      >
        <Fade in={open} className="bg-gray text-black">
          <Box sx={style}>
            <form
              className="flex flex-col gap-2 w-full justify-center"
              onSubmit={handleSubmit}
            >
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Name</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={id}
                    label="Name"
                    name="name"
                    onChange={(e) => {
                      setId(e.target.value);
                    }}
                  >
                    {!loading &&
                      custname.map((item, idx) => (
                        <MenuItem key={idx} value={item._id}>
                          {item.customerName}
                          <span style={{ color: "gray", fontSize: "8px" }}>
                            ( {item.customerPhone})
                          </span>
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
              {errors.phone ? (
                <div style={{ color: "crimson", padding: "5px" }}>
                  {errors.phone}
                </div>
              ) : (
                ""
              )}
              <br />
              <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Service Date"
                    name="duedate"
                    value={dayjs(values.duedate)}
                    onChange={(date) => {
                      handleChange({
                        target: { name: "duedate", value: date.format() },
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
