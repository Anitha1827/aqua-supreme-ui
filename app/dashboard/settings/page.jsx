"use client";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import "@/app/ui/settings/settings.css";
import styles from "@/app/ui/dashboard/users/users.module.css"
// Tab import
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/joy/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from '@mui/icons-material/Delete';

const Settings = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <div className="container">
      <h3>User Name</h3>
      {/* user details displing in this card */}
      <Card sx={{ minWidth: 275 }}>
        <CardContent className="cardContent">
          <div>
            <Stack spacing={2}>
              <Avatar
                alt="Anitha"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 150, height: 150 }}
              />
            </Stack>
          </div>
          <div>
            <Typography variant="h5" component="div">
              Name
            </Typography>
            <Typography
              sx={{ fontSize: 16 }}
              color="text.secondary"
              gutterBottom
            >
              Role:Admin
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Email:test@gmail.com
            </Typography>
            <Typography variant="body2">call:080-9353225</Typography>
          </div>
        </CardContent>
      </Card>
      {/* Tab content */}
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
              centered
              className="bgcolor"
            >
              <Tab label="Change Password" value="1" />
              <Tab label="Sessions" value="2" />
              {/* <Tab label="Item Three" value="3" /> */}
            </TabList>
          </Box>
          <TabPanel value="1">
            <form>
              <TextField
                label="Old Password"
                variant="outlined"
                margin="normal"
                className="Input"
              />
              <TextField
                label="New Password"
                variant="outlined"
                margin="normal"
                className="Input"
              />

              <TextField
                label="Confirm Password"
                variant="outlined"
                margin="normal"
                className="Input"
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="Input"
              >
                Change Password
              </Button>
            </form>
          </TabPanel>
          <TabPanel value="2">
            <h3>User Name</h3>
           <table  className={styles.table}>
            <thead>
              <tr>
                <td>Sl.No</td>
                <td>LogIn At</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>27-05-2024</td>
                <td >
                  <DeleteIcon/>
                  </td>
              </tr>
            </tbody>
           </table>
          </TabPanel>
          {/* <TabPanel value="3">Item Three</TabPanel> */}
        </TabContext>
      </Box>
    </div>
  );
};

export default Settings;
