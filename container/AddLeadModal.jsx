"use client";
import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, TextField } from "@mui/material";
//select dropdown
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// formik
import * as yup from "yup";
import { useFormik } from "formik";
import { addLead, getLead } from "@/service";
import AlertMessage from "./AlertMessage";

const validataionSchema = yup.object({
  name: yup.string().required("Please Enter the Name"),
  phone: yup.string().required("please Enter Phone Number"),
  feedback: yup.string().required("Please Enter remarks"),
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

const AddLeadModal = ({ open, setOpen, setLead }) => {
  // Modal
  let handleClose = () => setOpen(false);

  // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  //handleby
  const[handleBy, setHandleBy] = useState("")


  let { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      name: "",
      phone: "",
      feedback: "",
    },
    validataionSchema: validataionSchema,
    onSubmit: async (data) => {
      data["handleBy"] = handleBy;
      let resp = await addLead(data);
      console.log("leadline43", resp);
      if (resp.message !== "Lead added Successfully!") {
        setMessage(true);
        setContent("try again later");
        setType("error");
        return null;
      }
      handleClose();
      setMessage(true);
      setContent("Lead added successfully!");
      setType("success");
      getLeadData();
    },
  });

  //   get leaddata
  const getLeadData = async () => {
    let resp = await getLead();
    console.log("leaddata54", resp.getlead);
    setLead(resp.getlead);
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
              <br />
              <br />
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
                <div style={{ color: "crimson", padding: "5px" }}>
                  {errors.phone}
                </div>
              ) : (
                ""
              )}
              <br />
              <br />
              <div>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                  }}
                >
                  <div>
                    <TextField
                      id="outlined-multiline-static"
                      label="Remarks"
                      name="feedback"
                      multiline
                      width="100%"
                      rows={4}
                      value={values.feedback}
                      onChange={handleChange}
                      fullWidth
                    />
                  </div>
                </Box>
                {errors.feedback ? (
                  <div style={{ color: "crimson", padding: "5px" }}>
                    {errors.feedback}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <br />
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    HandleBy
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={handleBy}
                    label="handleBy"
                    onChange={(e)=>setHandleBy(e.target.value)}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="owner">Owner</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <br/>
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
};

export default AddLeadModal;
