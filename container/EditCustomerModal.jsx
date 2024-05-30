"use client";
import React from "react";
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

// formik
import * as yup from "yup";
import { useFormik } from "formik";
import { editCustomer, getCustomer } from "@/service";


const validataionSchema = yup.object({
  name: yup.string().required("Please Enter Name"),
  phone: yup.string().required("please Enter Phone Number"),
  date: yup.string().required("Please Select Service completed date"),
  address:yup.string().required("Please Enter your Address"),
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

export default function EditCustomerModal({ edit, setEdit, editdata, setCustomer}) {
  console.log(editdata, "editdata");
  //   Modal
  const handleClose = () => setEdit(false);

  let getusesr = async () => {
    let res = await getCustomer();
    console.log("res", res);
    setCustomer(res.getAllCustomerDetails);
  };

  
  let { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      name:` ${editdata.customerName}`,
      phone: editdata.customerPhone,
      date: editdata.lastServicedAt,
      address:editdata.address,
    },
    validationSchema: validataionSchema,
    onSubmit: async (data) => {
      data["id"] = editdata._id;
      let res = await editCustomer(data);
      if (res.message !== "Customer Updated Succesfully!") {
        alert("try again later");
      }
      handleClose();
      getusesr();
    },
  });

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
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
              <div style={{width:"100%", margin:"10px"}}>
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
                <div style={{ color: "crimson", padding: "5px" }}>
                  {errors.name}
                </div>
              ) : (
                ""
              )}
              </div>
             
             <div style={{width:"100%", margin:"10px"}}>
              <TextField
                id="outlined-basic"
                label="phone Number"
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
              </div>
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
              <div style={{width:"100%", margin:"10px"}}>
              <TextField
                id="outlined-multiline-flexible"
                label="Address"
                type="address"
                name="address"
                fullWidth
                multiline
                maxRows={4}
                value={values.address}
                onChange={handleChange}
              />
              {errors.phone ? (
                <div style={{ color: "crimson", padding: "5px" }}>
                  {errors.phone}
                </div>
              ) : (
                ""
              )}
              </div>
              <div style={{width:"100%", margin:"10px"}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                  fullWidth
                    label="Service/Install At"
                    name="date"
                    value={dayjs(values.date)}
                    onChange={(date)=>{
                      handleChange({target:{name:"date",value:date.format()}})
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
