"use client";
import React, { useEffect, useState } from "react";
import "@/app/ui/dashboard/installation/Installation.css";
import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import { useParams, useRouter } from "next/navigation";
import { getCustomerDetailsById, updateInstallationData } from "@/service";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/joy";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const InstallationStatus = () => {
  const [data, setData] = useState();
  const [remarks, setRemarks] = useState();
  const [pending, setPending] = useState(false);

  let router = useRouter()

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
  const handleSubmit = async(e) => {
    e.preventDefault();
    let formdata = {
      installationRemarks: remarks,
      isInstallationPending: pending,
      isInstallationCompleted: !pending,
    };
    await updateInstallationData(id,formdata);
    router.push("/dashboard/installations");
    console.log("formdata57", formdata);
  };

  console.log("pending",pending);
  
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

          <FormControlLabel
            control={pending == true ? <Checkbox checked /> : <Checkbox />}
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
            color="primary"
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

export default InstallationStatus;
