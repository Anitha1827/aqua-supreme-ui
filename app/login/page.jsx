"use client";
import React, { useState } from "react";
import styles from "./login.module.css";
import { login, serviceEngineer } from "@/service";
import { useRouter } from "next/navigation";
//select dropdown
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const LoginPage = () => {
  // select dropdown
  const [usertype, setUserType] = useState("");

  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  const [phone, setphone] = useState();
  const [password, setPassword] = useState();
  let router = useRouter();

  const handlelogin = async (e) => {
    e.preventDefault();

    let data = { phone, password };
    let res;
    if(usertype ==="admin"){
      res = await login(data)
    }else{
      res = await serviceEngineer(data)
    }
    if (res) {
      router.push("/dashboard");
    } else {
      alert("Invalied Credentials");
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1>Login</h1>
        {/* Select admin / Service Engineer */}
        <Box sx={{ minWidth: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">User Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={usertype}
              label="user type"
              name="user type"
              onChange={handleChange}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="ServiceEngineer">Service Engineer</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <input
          type="text"
          name="contact"
          value={phone}
          onChange={(e) => setphone(e.target.value)}
          placeholder="Phone Number"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button onClick={handlelogin}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
