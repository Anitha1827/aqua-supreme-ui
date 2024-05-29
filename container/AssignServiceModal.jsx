import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// Dropdown menu
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { assignServiceTechnician } from '@/service';

const AssignServiceModal = ({assign,setAssign, id}) => {

    // Dropdown
    const [tech, setTech] = useState('');

  const handleChange = (event) => {
    setTech(event.target.value);
  };

  
    const handleClose = () => {
        setAssign(false);
    };

    const handleSubmit = async() => {
      let res = await assignServiceTechnician(id, tech)
      console.log("modal32", res);
      handleClose();
    }

    console.log("assign tech in service", tech)

  return (
    <React.Fragment>
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
        <InputLabel id="demo-simple-select-label">Select Technician</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tech}
          label="Teachnician"
          onChange={handleChange}
        >
          <MenuItem value="tech1">Technician-1</MenuItem>
          <MenuItem value="tech2">Technician-2</MenuItem>
          <MenuItem value="tech3">Technician-3</MenuItem>
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
    </React.Fragment>
  )
}

export default AssignServiceModal