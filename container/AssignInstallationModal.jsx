import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Dropdown menu
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { assignTechnician, getNewUser } from "@/service";
import AlertMessage from "./AlertMessage";

const AssignInstallationModal = ({ assign, setAssign, id }) => {
  // Dropdown
  const [tech, setTech] = useState("");
  const [technician, setTechnician] = useState({});
  const [loading, setLoading] = useState(false);
  // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setTech(event.target.value);
  };
  const handleClose = () => {
    setAssign(false);
  };
  const handleSubmit = async () => {
    let response = await assignTechnician(id, tech);
    if (response.message !== "Technician assigned Successfully!") {
      setMessage(true);
      setContent("try again later");
      setType("error");
      return null;
    }
    handleClose();
    setMessage(true);
    setContent("Technician assigned Successfully!");
    setType("success");
    handleClose();
  };

  // Get technician details
  const getTechDetails = async () => {
    let resp = await getNewUser();
    setTechnician(resp.getuser);
    setLoading(true);
  };
  useEffect(() => {
    getTechDetails();
  }, []);
  return (
    <div>
      <Dialog
        open={assign}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Assign Technican to installation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Technician
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tech}
                  label="Teachnician"
                  onChange={handleChange}
                >
                  {loading &&
                    technician.map((item, idx) => (
                      <MenuItem value={item.name} key={idx}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <AlertMessage
        open={message}
        setOpen={setMessage}
        message={content}
        messageType={type}
      />
    </div>
  );
};

export default AssignInstallationModal;
