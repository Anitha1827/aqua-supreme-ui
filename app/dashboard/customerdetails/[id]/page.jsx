"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { IoIosArrowBack } from "react-icons/io";
import "@/app/ui/dashboard/addcustomer/showcusstomer.css";
import { findingUser, getCustomerDetailsById } from "@/service";
import { useParams, useRouter } from "next/navigation";

const CustomerDetailsPage = () => {
  const [detail, setDetails] = useState({});
  let router = useRouter();

  let params = useParams();
  let id = params.id;

  const getDetails = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return null;
    }
    let res = await findingUser(token);
    if(res.type === "serviceEngineer"){
      return router.push("/dashboard/installations")
    }
    let resp = await getCustomerDetailsById(id);
    setDetails(resp.data);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="container">
      <div className="buttondiv">
        <Button className="button" onClick={() => router.push("/dashboard")}>
          <IoIosArrowBack />
          Go Back
        </Button>
      </div>

      <div>
        <p>
          <b>Id:-</b> <span style={{ color: "gray" }}> {detail._id}</span>
        </p>
        <p>
          <b>Customer Name:-</b>{" "}
          <span style={{ color: "gray" }}> {detail.customerName}</span>
        </p>
        <p>
          <b>Contact Number:-</b>{" "}
          <span style={{ color: "gray" }}> {detail.customerPhone}</span>
        </p>
        <p>
          <b>lastServiced/Installed At:-</b>{" "}
          <span style={{ color: "gray" }}>
            {detail.lastServicedAt
              ? detail.lastServicedAt.split("").slice(0, 10).join("")
              : ""}
          </span>
        </p>
        <p>
          <b>Due Date:-</b>{" "}
          <span style={{ color: "gray" }}>
            {detail.duedate
              ? detail.duedate.split("").slice(0, 10).join("")
              : ""}
          </span>
        </p>
        {/* <p><b>lastServiced/Installed At:-</b></p> */}
        <p>
          <b>Address</b>
        </p>
        <p>
          <b>Door Number: </b>{" "}
          <span style={{ color: "gray" }}>{detail.address?.doorNo}</span>
        </p>
        <p>
          <b>Street: </b>{" "}
          <span style={{ color: "gray" }}>{detail.address?.street}</span>
        </p>
        <p>
          <b>Area: </b>{" "}
          <span style={{ color: "gray" }}>{detail.address?.area}</span>
        </p>
        <p>
          <b>Pin code: </b>{" "}
          <span style={{ color: "gray" }}>{detail.address?.pin}</span>
        </p>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;
