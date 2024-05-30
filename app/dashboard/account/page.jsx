"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import "@/app/ui/settings/settings.css";
import styles from "@/app/ui/dashboard/users/users.module.css";
// Tabs
import { Tabs, Tab, Button } from "@nextui-org/react";
import TextField from "@mui/material/TextField";
import DeleteIcon from '@mui/icons-material/Delete';

const Settings = () => {
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
      <div>
        <Tabs
          aria-label="Options"
          className="tabcontainer"
        >
          <Tab
            key="Account Setting"
            title="Account Setting"
            className="settingstab"
          >
            <Card>
              <h3 sx={{ p: 5 }}>Change Password</h3>
              <CardContent>
                <TextField
                  sx={{ m: 4 }}
                  id="outlined-basic"
                  label="Old Password"
                  variant="outlined"
                />
                <TextField
                  sx={{ m: 4 }}
                  id="outlined-basic"
                  label="New Password"
                  variant="outlined"
                />
                <TextField
                  sx={{ m: 4 }}
                  id="outlined-basic"
                  label="Confirm Password"
                  variant="outlined"
                />
              </CardContent>
              <Button className="button"
              >
                Change Password
              </Button>
            </Card>
          </Tab>
          <Tab
            key="Session Details"
            title="Session Details"
            style={{ padding: "10px", margin: "10px", cursor: "pointer" }}
          >
            <Card>
              <CardContent>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Expires At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>30-05-2024</td>
                      <td>
                        <DeleteIcon sx={{fontWeight:"20px"}}/>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </Tab>
          {/* <Tab key="videos" title="Videos">
            <Card>
              <CardContent>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardContent>
            </Card>
          </Tab> */}
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
