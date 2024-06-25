import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, TextField } from "@mui/material";

// formik
import * as yup from "yup";
import { useFormik } from "formik";
import { addProduct, getAllProduct } from "@/service";
import AlertMessage from "./AlertMessage";

const validataionSchema = yup.object({
  productname: yup.string().required("Please Enter Product Name"),
  productmodel: yup.string().required("Please Enter Modal"),
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

const AddProductModal = ({ open, setOpen, setProduct }) => {
  // Modal
  const handleClose = () => setOpen(false);

  // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  let { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      productname: "",
      productmodel: "",
    },
    validationSchema: validataionSchema,
    onSubmit: async (data) => {
      let resp = await addProduct(data);
      if (resp.message != "Product added to the database successfully!") {
        setMessage(true);
        setContent("try again later");
        setType("error");
        return null;
      }
      handleClose();
      setMessage(true);
      setContent("Product added successfully!");
      setType("success");
      getAllProductDetails();
    },
  });

  // Get product details
  const getAllProductDetails = async () => {
    let response = await getAllProduct();
    console.log("addproduct59", response.getproduct);
    setProduct(response.getproduct);
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
                label="Product Name"
                variant="outlined"
                sx={{ width: "100%" }}
                type="productname"
                name="productname"
                value={values.productname}
                onChange={handleChange}
              />
              {errors.productname ? (
                <div style={{ color: "crimson", padding: "5px" }}>
                  {errors.productname}
                </div>
              ) : (
                ""
              )}
              <br />
              <br />
              <TextField
                id="outlined-basic"
                label="Modal"
                variant="outlined"
                sx={{ width: "100%" }}
                type="productmodel"
                name="productmodel"
                value={values.productmodel}
                onChange={handleChange}
              />
              {errors.productmodel ? (
                <div style={{ color: "crimson", padding: "5px" }}>
                  {errors.productmodel}
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
};

export default AddProductModal;
