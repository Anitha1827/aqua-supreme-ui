"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import "@/app/ui/dashboard/installation/Installation.css";
import { useParams, useRouter } from "next/navigation";
import {
  getServiceDetailsById,
  getSpare,
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
    let formdata = { remarks, isPending: pending, isCompleted: !pending , selectedSpares:selectedSpares};
    await updateServiceStatus(id, formdata);
    router.push("/dashboard/service");
    console.log("formdata55", formdata);
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

export default ServiceStatus;
