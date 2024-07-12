"use client";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import "@/app/ui/settings/settings.css";
// Tabs
import { Tabs, Tab, Button } from "@nextui-org/react";
import TextField from "@mui/material/TextField";
import { findingUser, resetPassword } from "@/service";
// formik
import * as yup from "yup";
import { useFormik } from "formik";
import AlertMessage from "@/container/AlertMessage";
import { useRouter } from "next/navigation";

const validataionSchema = yup.object({
  oldPassword: yup.string().required("Please Enter OldPassword"),
  newPassword: yup.string().required("Please Enter New Password"),
  confirmPass: yup.string().required("Please Enter Confirm Password"),
});

const Settings = () => {
  let router = useRouter();
  // Snackbar
  const [message, setMessage] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  let { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPass: "",
    },
    validationSchema: validataionSchema,
    onSubmit: async (data) => {
      if (data.newPassword !== data.confirmPass) {
        setMessage(true);
        setContent("Please enter confirm and Newpassword same");
        setType("error");
        return null;
      }

      let resp = await resetPassword(data);
      if (resp.message === "Invalid Password") {
        setMessage(true);
        setContent("Invalid Password");
        setType("error");
        return null;
      } else if (resp.message !== "Password Reset Successfully!") {
        setMessage(true);
        setContent("Customer added successfully!");
        setType("success");
      }
    },
  });

  async function finduser(){
    let token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return null;
    }
    let res = await findingUser(token);
    if(res.type === "serviceEngineer"){
      return router.push("/dashboard/installations")
    }
  } 
  useEffect(()=>{
    finduser()
  },[])

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
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <div className="form-field"
                 style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  minWidth: "200px",
                }}
                >
                  <TextField
                    sx={{ m: 2 }}
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
                <div className="form-field"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flex: 1,
                    minWidth: "200px",
                  }}
                >
                  <TextField
                     sx={{ m: 2 }}
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
                <div className="form-field"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flex: 1,
                    minWidth: "200px",
                  }}
                >
                  <TextField
                    sx={{ m: 2 }}
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
      <AlertMessage
        open={message}
        setOpen={setMessage}
        message={content}
        messageType={type}
      />
    </div>
  );
};

export default Settings;
