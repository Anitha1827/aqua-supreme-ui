"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "@/app/ui/dashboard/installation/Installation.css";
import { styled } from "@mui/joy";
import { useParams, useRouter } from "next/navigation";
import { getServiceDetailsById, updateServiceStatus } from "@/service";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const ServiceStatus = () => {
  const [data, setData] = useState();
  const [remarks, setRemarks] = useState("");
  const [pending, setPending] = useState(false);

  let router = useRouter();

  let params = useParams();
  let id = params.id;
  console.log("line28", id);

  let getServiceDetails = async (id) => {
    let response = await getServiceDetailsById(id);
    setData(response.data);
    setPending(response.data.isPending);
    console.log("line36", response.data);
  };
  console.log("line44", pending);

  useEffect(() => {
    getServiceDetails(id);
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
  let formdata = {remarks, isPending:pending, isCompleted:!pending}
     await updateServiceStatus(id,formdata)
    router.push("/dashboard/service")
    console.log("formdata55",formdata)
  }
  
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

          {/* Pending update */}

          <FormControlLabel
            control={pending == true ? <Checkbox checked/> : <Checkbox/>}
            label="Pending"
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28, color: "white" } }}
            value={pending}
            onChange={() => setPending(!pending)}
          />

          {/* Upload button */}
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>

          <Button
            variant="contained"
            color="white"
            type="submit"
            className="Input"
          >
            Submit
          </Button>
        </form>
      )}
    </>
  );
};

export default ServiceStatus;
