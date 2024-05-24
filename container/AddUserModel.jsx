"use client";
import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, TextField } from "@mui/material";

// formik
import * as yup from "yup";
import { useFormik } from "formik";
import { addNewUser, getNewUser } from "@/service";

const validataionSchema = yup.object({
  name: yup.string().required("Please Enter Name"),
  phone: yup.string().required("please Enter Phone Number"),
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

export default function AddUserModel({ open, setOpen,setTech }) {
  //   Modal
  const handleClose = () => setOpen(false);

  let {values,handleChange,handleSubmit,errors} = useFormik({
    initialValues:{
      name:"",
      phone:"",
    },
    validationSchema: validataionSchema,
    onSubmit: async (data)=>{
      let res = await addNewUser(data);
      if(res.message !== "New User added successfully!"){
        alert("try again later")
      }
      getusesr()
      handleClose();
    }
  });

  let getusesr = async () => {
    let res = await getNewUser();
    console.log("res", res);
    setTech(res.getuser);
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
            <form className="flex flex-col gap-2 w-full justify-center" onSubmit={handleSubmit}>
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
              {errors.name ? <div style = {{color:"crimson",padding:"5px"}}>{errors.name}</div> : ""}
              <br />
              <br />
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
              {errors.phone ? <div style = {{color:"crimson",padding:"5px"}}>{errors.phone}</div> : ""}
              <br />
              <br />
              <Button variant="contained" sx={{ width: "100%" }} type="submit">
                Add
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
