"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { IoIosArrowBack } from "react-icons/io";
import "@/app/ui/dashboard/addcustomer/showcusstomer.css";
import { getCustomerDetailsById } from "@/service";
import { useParams, useRouter } from "next/navigation";

const CustomerDetailsPage = () => {
  const [detail, setDetails] = useState({});
  let router = useRouter();

  let params = useParams();
  let id = params.id;

  const getDetails = async () => {
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
          <b>Id:-</b> {detail._id}
        </p>
        <p>
          <b>Customer Name:-</b> {detail.customerName}
        </p>
        <p>
          <b>Contact Number:-</b> {detail.customerPhone}
        </p>
        <p>
          <b>lastServiced/Installed At:-</b>{" "}
          {detail.lastServicedAt
            ? detail.lastServicedAt.split("").slice(0, 10).join("")
            : "30-05-2024"}
        </p>
        <p>
          <b>Due Date:-</b> {detail.duedate}
        </p>
        {/* <p><b>lastServiced/Installed At:-</b></p> */}
        <p>
          <b>Address:-</b> {detail.address}
        </p>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;
