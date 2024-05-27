"use client";
import React, { useEffect, useState } from "react";
import "@/app/ui/dashboard/installation/Installation.css";
import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import { useParams } from "next/navigation";
import { getCustomerDetailsById } from "@/service";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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

  let params = useParams();
  let id = params.id;
  console.log("line27page", id);

  const getCustomerDetails = async (id) => {
    let resp = await getCustomerDetailsById(id);
    setData(resp.data);
    console.log("resppage28", resp);
  };

  useEffect(() => {
    getCustomerDetails(id);
  }, []);

  return (
    <>
      {data && (
        <form>
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
