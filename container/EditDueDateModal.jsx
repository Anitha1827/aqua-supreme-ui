"use client";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import { editDuedate, getServiceReminderCustomer } from "@/service";
import AlertMessage from "./AlertMessage";
// Date picker
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditDueDateModal = ({ open, setOpen, editdata, setReminder }) => {
  const [duedate, setDuedate] = useState(editdata.duedate);
  // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  // modal
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { date:duedate };
    data["id"] = editdata._id;
    data["isReassigned"] = true;
    let resp = await editDuedate(data);
    if (resp.message !== "Service due date Updated Successfully!") {
      setMessage(true);
      setContent("try again later");
      setType("error");
      return null;
    }
    handleClose();
    setMessage(true);
    setContent("Duedate Edited successfully!");
    setType("success");
    getreminderdata();
  };

  // Function to parse date in MM/DD/YYYY format
  function parseDate(dateStr) {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
  }

  // Function to sort customers by due date
  function sortByDueDate(customers) {
    return customers.sort(
      (a, b) => parseDate(a.duedate) - parseDate(b.duedate)
    );
  }

  const getreminderdata = async () => {
    let resp = await getServiceReminderCustomer();
    console.log("reminderdata43", resp.data);
    let data = resp.data.filter((val) => val.duedate && val.duedate.length > 0);
    // Sort the customers array
    const sortedCustomers = sortByDueDate(data);
    setReminder(sortedCustomers);
  };
  useEffect(() => {
    setDuedate(editdata.duedate);
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
              <div style={{ width: "100%", margin: "10px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="due Date"
                      name="date"
                      value={dayjs(duedate)}
                      onChange={(e) => {
                        setDuedate(e.format());
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
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
};

export default EditDueDateModal;
