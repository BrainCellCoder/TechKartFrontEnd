import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { useForm, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { useCookies } from "react-cookie";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const AddProduct = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [cookies, setCookie] = useCookies(["userId", "token"]);

  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const allowedFileTypes = ["image/jpeg", "image/png"];
  const { handleSubmit, watch, register } = useForm({});
  const selectedFile = watch("file");

  const onSubmit = async (data) => {
    console.log(data, category);
    const formData = new FormData();
    formData.append("category", category);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("file", data.file[0]);
    console.log(formData);
    const res = await fetch(
      "https://ecommercetechv.onrender.com/admin/product/new",
      {
        method: "POST",
        body: formData,

        headers: {
          authorization: `Abhi ${
            localStorage.getItem("token") || cookies.token
          }`,
          //   Accept: "application/json, text/plain, */*",
          //   "Content-Type": "application/json",
          //   // "Content-Type": "multipart/form-data",
        },
      }
    );
    const resp = await res.json();
    handleClose();
    console.log(resp);
  };

  return (
    <>
      <Button
        sx={{ margin: "1rem" }}
        onClick={handleOpen}
        variant="contained"
        color="success"
      >
        + Add Product
      </Button>
      <Modal
        // sx={{ backgroundColor: "#fff" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ marginBottom: "10px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Add a new product
          </Typography>
          <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ marginBottom: "10px" }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Ctegory"
                onChange={handleChange}
                required
              >
                <MenuItem value="Laptop">Laptop</MenuItem>
                <MenuItem value="Mobile">Mobile</MenuItem>
                <MenuItem value="Headphone">Headphone</MenuItem>
                <MenuItem value="Accessories">Accessories</MenuItem>
                <MenuItem value="TV">TV</MenuItem>
                <MenuItem value="Camera">Camera</MenuItem>
                <MenuItem value="Gaming">Gaming</MenuItem>
                <MenuItem value="Landline">Landline</MenuItem>
                <MenuItem value="Radio">Radio</MenuItem>
                <MenuItem value="Speaker">Speaker</MenuItem>
              </Select>
            </FormControl>

            <TextField
              sx={{ marginBottom: "10px" }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="name"
              fullWidth
              {...register("name")}
              required
            />
            <TextField
              sx={{ marginBottom: "10px" }}
              id="outlined-basic"
              label="Description"
              variant="outlined"
              name="description"
              {...register("description")}
              fullWidth
              required
            />
            <TextField
              sx={{ marginBottom: "10px" }}
              id="outlined-basic"
              label="Price"
              variant="outlined"
              name="price"
              type="number"
              {...register("price")}
              fullWidth
              required
            />
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Choose Image</Form.Label>
              <Form.Control
                required
                name="file"
                type="file"
                {...register("file")}
              />
            </Form.Group>

            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};
