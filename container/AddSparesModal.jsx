"use client"
import React, { useState } from 'react'
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, TextField } from "@mui/material";
import AlertMessage from './AlertMessage';
// formik
import * as yup from "yup";
import { useFormik } from "formik";
import { addSpare, getSpare } from '@/service';

const validataionSchema = yup.object({
    spareName: yup.string().required("Please Enter Spare Name"),
    spareNumber: yup.string().required("please Enter Spare Number"),
  });

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    height: "50vh",
  };

const AddSparesModal = ({open, setOpen,setSpares}) => {
    // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  const handleClose = () => setOpen(false);

  let { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
        spareName: "",
      spareNumber: "",
    },
    validationSchema: validataionSchema,
    onSubmit: async (data) => {
      let res = await addSpare(data);
      console.log("modal52", res);
      //checking an response message for successfully Spares added
      // if not show alert
      if (res.message !== "Spares added Successfully!") {
        setMessage(true);
        setContent("try again later");
        setType("error");
        return null;
      }
      handleClose();
      setMessage(true);
      setContent("Spares added successfully!");
      setType("success");
      getSparedata();
    },
  });

  // Get Spare data
const getSparedata = async() => {
    let resp = await getSpare();
    setSpares(resp.getSpare);
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
            <form
              className="flex flex-col gap-2 w-full justify-center"
              onSubmit={handleSubmit}
            >
             
                
                  <TextField
                    id="outlined-basic"
                    label="spareName"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    type="spareName"
                    name="spareName"
                    value={values.spareName}
                    onChange={handleChange}
                  />
                  {errors.spareName ? (
                    <div style={{ color: "crimson", padding: "5px" }}>
                      {errors.spareName}
                    </div>
                  ) : (
                    ""
                  )}
               <br/>
               <br/>
                  <TextField
                    id="outlined-basic"
                    label="spareNumber"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    type="spareNumber"
                    name="spareNumber"
                    value={values.spareNumber}
                    onChange={handleChange}
                  />
                  {errors.spareNumber ? (
                    <div style={{ color: "crimson", padding: "5px" }}>
                      {errors.spareNumber}
                    </div>
                  ) : (
                    ""
                  )}
                <br/>
                <br/>
              <Button variant="contained" sx={{ width: "100%" }} type="submit">
                Add
              </Button>
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
  )
}

export default AddSparesModal