"use client";
import React, { useEffect, useState } from "react";
import "@/app/ui/dashboard/installation/Installation.css";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import { useParams, useRouter } from "next/navigation";
import {
  getCustomerDetailsById,
  updateAddress,
  updateInstallationData,
} from "@/service";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

const InstallationStatus = () => {
  let router = useRouter();
  const [data, setData] = useState();
  const [remarks, setRemarks] = useState();
  const [pending, setPending] = useState(false);
   // location
   const [location, setLocation] = useState({ latitude: null, longitude: null });
   const [address, setAddress] = useState("");
   //updated address
   const[addressDetail, setAddressDetail] = useState({})
   const [error, setError] = useState(null);

   const handleGetLocation = (e) => {
    e.preventDefault();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          let apikey = "pk.8d244bc5540d8f024761c4dafee5eef0";
          let location = await axios.get(
            `https://us1.locationiq.com/v1/reverse?key=${apikey}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&`
          );
          console.log("address102", location);
          // let address = `${location.data.address.suburb},${location.data.address.city},${location.data.address.state},${location.data.address.country},${location.data.address.postcode}`;
          setAddress(location.data.display_name);
          setAddressDetail({
            area:location.data.address.suburb,
            pincode:location.data.address.postcode,
          })
          setError(null);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }; 

  let params = useParams();
  let id = params.id;

  const getCustomerDetails = async (id) => {
    let resp = await getCustomerDetailsById(id);
    setData(resp.data);
    console.log("resppage28", resp);
  };

  useEffect(() => {
    getCustomerDetails(id);
  }, []);

  // while submitting form Sending/updating data to DB
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formdata = {
      installationRemarks: remarks,
      isInstallationPending: pending,
      isInstallationCompleted: !pending,
    };
    await updateInstallationData(id, formdata);
   let data={address:addressDetail,id,installation:true}
    console.log("dataline81", data)
    await updateAddress(data);
    router.push("/dashboard/installations");
  };

  return (
    <>
      {data && (
        <form onSubmit={handleSubmit}>
          <TextField
            value={data.customerName}
            label="Name"
            variant="outlined"
            margin="normal"
            disabled
            className="Input"
          />
          <TextField
            value={data.customerPhone}
            label="Phone"
            variant="outlined"
            margin="normal"
            disabled
            className="Input"
          />

          <Textarea
            color="primary"
            disabled={false}
            minRows={4}
            placeholder="Remarks"
            size="md"
            variant="outlined"
            className="textArea"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
          {/* Pending update */}
            <div style={{ width: "100%", margin: "10px" }}>
              <FormControlLabel
                control={pending == true ? <Checkbox checked /> : <Checkbox />}
                label="Pending"
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28, color: "white" } }}
                value={pending}
                onChange={() => setPending(!pending)}
              />
            </div>
          {/* location */}
          <div style={{ width: "100%", margin: "10px" }}>
            <div
              style={{
                padding: "20px",
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={handleGetLocation}
                style={{
                  width: "150px",
                  borderRadius: "10px",
                  background: "orange",
                  height: "44px",
                }}
              >
                Get Location
              </button>
              {location.latitude && location.longitude ? (
                <div style={{ width: "100%" }}>
                  {/* <p>Latitude: {location.latitude}</p>
                  <p>Longitude: {location.longitude}</p> */}
                  <p>
                    <b>Address:</b> {address}
                  </p>
                </div>
              ) : (
                <p>No location available</p>
              )}
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="Input"
            style={{background:"blue"}}
          >
            Submit
          </Button>
        </form>
      )}
    </>
  );
};

export default InstallationStatus;
