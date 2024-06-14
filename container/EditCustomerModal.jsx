"use client";
import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, TextField } from "@mui/material";
import { editCustomer, getAllCustomer } from "@/service";
import AlertMessage from "./AlertMessage";

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

export default function EditCustomerModal({
  edit,
  setEdit,
  editdata,
  setCustomer,
}) {
  const [name, setName] = useState(editdata.customerName);
  const [phone, setPhone] = useState(editdata.customerPhone);
  const [doorNo, setDoorNo] = useState(editdata.address.doorNo);
  const [street, setStreet] = useState(editdata.address.street);
  const [area, setArea] = useState(editdata.address.area);
  const [pin, setPin] = useState(editdata.address.pin);

  // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setName(editdata.customerName);
    setPhone(editdata.customerPhone);
    setDoorNo(editdata.address.doorNo);
    setStreet(editdata.address.street);
    setArea(editdata.address.area);
    setPin(editdata.address.pin);
  }, [editdata]);
  //   Modal
  const handleClose = () => setEdit(false);

  let getusesr = async () => {
    let res = await getAllCustomer();
    console.log("res", res);
    setCustomer(res.getAllCustomerDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let {doorNo,street,area,pin} = data
    let data = { name, phone };
    data["address"] = { doorNo, street, area, pin };
    data["id"] = editdata._id;
    let res = await editCustomer(data);
    if (res.message !== "Customer Updated Succesfully!") {
      setMessage(true);
      setContent("try again later");
      setType("error");
      return null;
    }
    handleClose();
    setMessage(true);
    setContent("Customer Edited successfully!");
    setType("success");
    getusesr();
  };
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <div style={{ width: "100%", margin: "10px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    type="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                  />
                </div>

                <div style={{ width: "100%", margin: "10px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    type="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <div style={{ width: "100%", margin: "10px" }}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Door Number"
                    type="doorNo"
                    name="doorNo"
                    fullWidth
                    multiline
                    maxRows={4}
                    value={doorNo}
                    onChange={(e) => {
                      setDoorNo(e.target.value);
                    }}
                  />
                </div>

                <div style={{ width: "100%", margin: "10px" }}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Street"
                    type="Street"
                    name="street"
                    fullWidth
                    multiline
                    maxRows={4}
                    value={street}
                    onChange={(e) => {
                      setStreet(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <div style={{ width: "100%", margin: "10px" }}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Area"
                    type="area"
                    name="area"
                    fullWidth
                    multiline
                    maxRows={4}
                    value={area}
                    onChange={(e) => {
                      setArea(e.target.value);
                    }}
                  />
                </div>

                <div style={{ width: "100%", margin: "10px" }}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Pin Code"
                    type="pin"
                    name="pin"
                    fullWidth
                    multiline
                    maxRows={4}
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value);
                    }}
                  />
                </div>
              </div>
              <Button variant="contained" sx={{ width: "100%" }} type="submit">
                update
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
