"use client";
import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, TextField } from "@mui/material";
// formik
import * as yup from "yup";
import { useFormik } from "formik";
import { addArea, getArea } from "@/service";
import AlertMessage from "./AlertMessage";

const validataionSchema = yup.object({
  areaName: yup.string().required("Please Enter Area!"),
});

const style = (isSmallScreen) => ({
  position: "absolute",
  top: isSmallScreen ? "10%" : "50%",
  left: "50%",
  transform: isSmallScreen ? "translate(-50%, 0)" : "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  // boxShadow: 24,
  p: 4,
  overflow: "auto",
  height: "40vh",
  borderRadius: "10px",
});

const AddAreaModal = ({ open, setOpen, setArea }) => {
  // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  const handleClose = () => setOpen(false);

  let { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      areaName: "",
    },
    validationSchema: validataionSchema,
    onSubmit: async (data) => {
      let res = await addArea(data);
      console.log("modal46", res);
      //checking an response message for successfully area added
      // if not show alert
      if (res.message !== "Area Added successfully!") {
        setMessage(true);
        setContent("try again later");
        setType("error");
        return null;
      }
      handleClose();
      setMessage(true);
      setContent("Area Added successfully!");
      setType("success");
      getAreadata();
    },
  });

  const getAreadata = async () => {
    let resp = await getArea();
    setArea(resp.getArea);
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
                label="Area Name"
                variant="outlined"
                sx={{ width: "100%" }}
                type="areaName"
                name="areaName"
                value={values.areaName}
                onChange={handleChange}
              />
              {errors.areaName ? (
                <div style={{ color: "crimson", padding: "5px" }}>
                  {errors.areaName}
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

export default AddAreaModal;
