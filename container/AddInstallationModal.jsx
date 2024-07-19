"use client";
import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, Grid } from "@mui/material";
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
  getAllCustomer,
  getAllProduct,
  getInstallationDetails,
} from "@/service";
import AlertMessage from "./AlertMessage";
// select dropdown
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const validataionSchema = yup.object({
  date: yup.string().required("Please Select Installation date"),
});

const modalStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const paperStyle = (isSmallScreen) => ({
  position: "absolute",
  top: isSmallScreen ? "5%" : "50%",
  left: "50%",
  transform: isSmallScreen ? "translate(-50%, 0)" : "translate(-50%, -50%)",
  width: isSmallScreen ? "90%" : 400,
  maxHeight: "95vh",
  bgcolor: "background.paper",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  p: 4,
  outline: "none",
  borderRadius: "10px",
  overflowY: "auto",
});

const AddInstallationModal = ({ open, setOpen, setInstall }) => {
  // Select dropdown
  const [product, setProduct] = useState("");
  const [prodList, setProdList] = useState([]);
  // modal responsive scroll
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelect = (event) => {
    setProduct(event.target.value);
  };

  // Modal
  const handleClose = () => setOpen(false);

  // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  //to select installation customer from customer list
  const [id, setId] = useState();
  // Dropdown for name
  const [custname, setCustName] = useState([]);
  const [loading, setLoading] = useState(true);

  let { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      date: new Date(),
    },
    validationSchema: validataionSchema,
    onSubmit: async (data) => {
      data["product"] = product;
      data["id"] = id;
      let res = await addNewInstallation(data);
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

  //to select cutomer details in Name field
  const getCustomerData = async () => {
    let resp = await getAllCustomer();
    setCustName(resp.getAllCustomerDetails);
    setLoading(false);
  };
  // fetching product
  let getProduct = async () => {
    let resp = await getAllProduct();
    console.log("produPage106", resp.getproduct);
    setProdList(resp.getproduct);
  };
  useEffect(() => {
    getProduct();
    getCustomerData();
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
          <Box sx={paperStyle(isSmallScreen)}>
            <form
              style={{
                display: "flex",
                gap: "20px",
                flexDirection: "column",
                justifyContent: "center",
              }}
              onSubmit={handleSubmit}
            >
              <Box sx={{ minWidth: 150 }}>
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

              <LocalizationProvider dateAdapter={AdapterDayjs}  >
                <DemoContainer components={["DatePicker"]} >
                  <DatePicker 
                  sx={{ minWidth: 150 }}
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

              <Box>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Product</InputLabel>
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

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{ width: "100%" }}
                  type="submit"
                >
                  Add
                </Button>
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
