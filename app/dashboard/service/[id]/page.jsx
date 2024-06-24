"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import "@/app/ui/dashboard/installation/Installation.css";
import { useParams, useRouter } from "next/navigation";
import {
  findingUser,
  getServiceDetailsById,
  getSpare,
  updateAddress,
  updateServiceStatus,
} from "@/service";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// Select dropdown
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { Chip } from "@mui/material";
import axios from "axios";

const ServiceStatus = () => {
  let router = useRouter();
  const [data, setData] = useState();
  const [remarks, setRemarks] = useState("");
  const [pending, setPending] = useState(false);
  //spare
  const [selectedSpares, setSelectedSpares] = useState([]);
  const [spares, setSpares] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setSelectedSpares(event.target.value);
  };

  // Get Spare data
  const getSparedata = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return null;
    }
    let res = await findingUser(token);
    if (res.type === "serviceEngineer") {
      return router.push("/dashboard/installations");
    }
    let resp = await getSpare();
    setSpares(resp.getSpare);
    setLoading(true);
  };

  let params = useParams();
  let id = params.id;

  let getServiceDetails = async (id) => {
    let response = await getServiceDetailsById(id);
    setData(response.data);
    setPending(response.data.isPending);
    console.log("line36", response.data);
  };

  useEffect(() => {
    getServiceDetails(id);
    getSparedata();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formdata = {
      remarks,
      isPending: pending,
      isCompleted: !pending,
      selectedSpares: selectedSpares,
    };
    await updateServiceStatus(id, formdata);
    let data = {address:addressDetail, id}
    console.log("dataline81", data)
    await updateAddress(data);
    router.push("/dashboard/service");
    console.log("formdata55", formdata);
  };

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

  return (
    <>
      {data && (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            className="Input"
            disabled
            value={data.customerName}
          />
          <TextField
            label="Phone"
            variant="outlined"
            margin="normal"
            disabled
            className="Input"
            value={data.customerPhone}
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

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <div style={{ width: "100%", margin: "10px" }}>
              {/* Pending update */}
              <FormControlLabel
                control={pending == true ? <Checkbox checked /> : <Checkbox />}
                label="Pending"
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28, color: "white" } }}
                value={pending}
                onChange={() => setPending(!pending)}
              />
            </div>
            {/* select spares */}
            <div style={{ width: "100%", margin: "10px" }}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-chip-label">Spares</InputLabel>

                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={selectedSpares}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "Without label" }}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {loading &&
                      spares.map((item, idx) => (
                        <MenuItem value={item.spareName} key={idx}>
                          {item.spareName} <span> ({item.spareNumber})</span>
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
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
            style={{ background: "blue" }}
          >
            Submit
          </Button>
        </form>
      )}
    </>
  );
};

export default ServiceStatus;
