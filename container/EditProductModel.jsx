"use client"
import React, { useEffect, useState } from 'react'
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, TextField } from "@mui/material";
import { editProduct, getAllProduct } from '@/service';

const EditProductModel = ({edit,setEdit,editdata,setProduct}) => {
    const[name, setName] = useState(editdata.productname);
    const[model, setModel] = useState(editdata.productmodel);

    const handleClose = () => setEdit(false);

    useEffect(()=>{
        setName(editdata.productname);
        setModel(editdata.productmodel);
    },[editdata]);

    // fetch product details after edit the data
    const getProduct = async() =>{
        let resp = await getAllProduct();
        console.log("productdeatilsafterfetch24", resp.getproduct)
        setProduct(resp.getproduct)

    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!name || !model){
            return alert("Please fill all the fields");
        }
        let data = {productname:name, productmodel:model, id:editdata._id};
        data["id"] = editdata._id;
        let resp = await editProduct(data);
        if(resp.message !== "Product updated Successfully!"){
            alert("try again later");
        }
        handleClose();
        getProduct();
    }

    // Modal style
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "25%",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      };

  return (
    <div>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={edit}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={edit} className="bg-gray text-black">
        <Box sx={style}>
          <form
            className="flex flex-col gap-2 w-full justify-center"
            onSubmit={handleSubmit}
          >
             
              <TextField
              id="outlined-basic"
              label="Product Name"
              variant="outlined"
              sx={{ width: "100%" }}
              type="name"
              name="name"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
            />
            <br/>
            <br/>
              <TextField
              id="outlined-basic"
              label="Model Number"
              variant="outlined"
              sx={{ width: "100%" }}
              type="model"
              name="model"
              value={model}
              onChange={(e)=>{setModel(e.target.value)}}
            />
            <br/>
            <br/>
            <Button variant="contained" sx={{ width: "100%" }} type="submit">
              update
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  </div>
  )
}

export default EditProductModel