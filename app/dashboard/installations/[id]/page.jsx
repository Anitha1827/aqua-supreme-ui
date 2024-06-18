"use client";
import React, { useEffect, useState } from "react";
import "@/app/ui/dashboard/installation/Installation.css";
import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import { useParams, useRouter } from "next/navigation";
import {
  getCustomerDetailsById,
  getNewUser,
  updateInstallationData,
} from "@/service";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// Select dropdown
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

const InstallationStatus = () => {
  let router = useRouter();
  const [data, setData] = useState();
  const [remarks, setRemarks] = useState();
  const [pending, setPending] = useState(false);
  //technician name
  const [tech, setTech] = useState("");
  const [technician, setTechnician] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    setTech(event.target.value);
  };

  // Get technician details
  const getTechDetails = async () => {
    let resp = await getNewUser();
    setTechnician(resp.getuser);
    setLoading(true);
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
    getTechDetails();
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
    router.push("/dashboard/installations");
  };

  console.log("pending", pending);

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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <div style={{ width: "100%", margin: "10px" }}>
              <FormControlLabel
                control={pending == true ? <Checkbox checked /> : <Checkbox />}
                label="Pending"
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28, color: "white" } }}
                value={pending}
                onChange={() => setPending(!pending)}
              />
            </div>
            {/* select service engineer */}
            <div style={{ width: "100%", margin: "10px" }}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Service Engineers
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tech}
                    label="Teachnician"
                    onChange={handleChange}
                  >
                    {loading &&
                      technician.map((item, idx) => (
                        <MenuItem value={item.name} key={idx}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
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
