"use client"
import React, { useState } from "react";
import styles from "./login.module.css";
import { login } from "@/service";
import { useRouter } from "next/navigation";


const LoginPage = () => {
  const [phone, setphone] = useState();
  const [password, setPassword] = useState();
 let router = useRouter();
 

  const handlelogin = async(e) => {
    e.preventDefault();
    
    let data = {phone, password};
    let res = await login(data);
    // console.log("res", res);
      if(res){
            router.push("/dashboard");
      }else{
        alert("Invalied Credentials");
      }

  }
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1>Login</h1>
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
