"use client";
import React from "react";
import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import Avatar from "@mui/material/Avatar";
// import Stack from "@mui/material/Stack";
import "@/app/ui/settings/settings.css";
// import styles from "@/app/ui/dashboard/users/users.module.css";
// formik
import * as yup from "yup";
import { useFormik } from "formik";

const validataionSchema = yup.object({
  oldPassword: yup.string().required("Please Enter OldPassword"),
  newPassword: yup.string().required("Please Enter New Password"),
  confirmPass: yup.string().required("Please Enter Confirm Password"),
});
// Tabs
import { Tabs, Tab, Button } from "@nextui-org/react";
import TextField from "@mui/material/TextField";
// import DeleteIcon from "@mui/icons-material/Delete";
import { resetPassword } from "@/service";

const Settings = () => {
  let { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPass: "",
    },
    validationSchema: validataionSchema,
    onSubmit: async (data) => {
     if(data.newPassword !== data.confirmPass){
      return alert("Please enter confirm and Newpassword same");
     }

      let resp = await resetPassword(data);
      if(resp.message === "Invalid Password"){
        alert("Invalid Password")
      } 
      else if(resp.message !== "Password Reset Successfully!"){
        alert("try again later")
      }
    }
  });

  return (
    <div className="container">
      {/* <h3>User Name</h3> */}
      {/* user details displing in this card */}
      {/* <Card sx={{ minWidth: 275 }}>
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
      </Card> */}
      {/* Tab content */}
      <div>
        <Tabs aria-label="Options" className="tabcontainer">
          <Tab
            key="Account Setting"
            title="Account Setting"
            className="settingstab"
          >
            <Card>
              <h3 sx={{ p: 5 }}>Change Password</h3>
              <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
               
                  <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                  <TextField
                    sx={{ m: 4 }}
                    id="outlined-basic"
                    label="Old Password"
                    name="oldPassword"
                    variant="outlined"
                    value={values.oldPassword}
                    onChange={handleChange}
                  />
                  {errors.oldPassword ? (
                    <div style={{ color: "crimson", padding: "5px" }}>
                      {errors.oldPassword}
                    </div>
                  ) : (
                    ""
                  )}
                  </div>
                  <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                  <TextField
                    sx={{ m: 4 }}
                    id="outlined-basic"
                    label="New Password"
                    variant="outlined"
                    name="newPassword"
                    value={values.newPassword}
                    onChange={handleChange}
                  />
                  {errors.newPassword ? (
                    <div style={{ color: "crimson", padding: "5px" }}>
                      {" "}
                      {errors.newPassword}
                    </div>
                  ) : (
                    ""
                  )}
                  </div>
                  <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                  <TextField
                    sx={{ m: 4 }}
                    id="outlined-basic"
                    label="Confirm Password"
                    variant="outlined"
                    name="confirmPass"
                    value={values.confirmPass}
                    onChange={handleChange}
                  />
                  {errors.confirmPass ? (
                    <div style={{ color: "crimson", padding: "5px" }}>
                      {errors.confirmPass}
                    </div>
                  ) : (
                    ""
                  )}
                  </div>
               
              <Button className="button" type="submit">
                Change Password
              </Button>
              </form>
            </Card>
          </Tab>
          {/* <Tab
            key="Session Details"
            title="Session Details"
            style={{ padding: "10px", margin: "10px", cursor: "pointer" }}
          >
            <Card>
              <CardContent>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Last Login</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>30-05-2024</td>
                      <td>
                        <DeleteIcon sx={{ fontWeight: "20px" }} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </Tab> */}
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
