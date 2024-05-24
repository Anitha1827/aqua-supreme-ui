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
import { editUser, getNewUser } from "@/service";

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

export default function EditUserModal({ edit, setEdit, editdata, setTech}) {
  console.log(editdata, "editdata");
  //   Modal
  const handleClose = () => setEdit(false);

  let getusesr = async () => {
    let res = await getNewUser();
    console.log("res", res);
    setTech(res.getuser);
    
  };

  
  let { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      name: editdata.name,
      phone: editdata.phone,
    },
    validationSchema: validataionSchema,
    onSubmit: async (data) => {
      data["id"] = editdata._id;
      let res = await editUser(data);
      if (res.message !== "User Details edited successfully!") {
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
              {errors.phone ? (
                <div style={{ color: "crimson", padding: "5px" }}>
                  {errors.phone}
                </div>
              ) : (
                ""
              )}
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
