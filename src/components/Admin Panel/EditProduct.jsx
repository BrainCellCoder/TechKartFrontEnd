import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import { TextField } from "@material-ui/core";
import { TextField, Modal, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const EditProduct = (props) => {
  const [open, setOpen] = React.useState(false);
  const [cookies, setCookie] = useCookies(["userId", "token"]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState(props.product.name);
  const [description, setDescription] = useState(props.product.description);
  const [price, setPrice] = useState(props.product.price);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://ecommercetechv.onrender.com/admin/product/${props.product._id}`,
        {
          method: "PUT",
          headers: {
            authorization: `Abhi ${
              localStorage.getItem("token") || cookies.token
            }`,
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            price: price,
            description: description,
          }),
        }
      );
      const data = await response.json();
      console.log("Form submitted successfully:", data);
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer /> */}
      <Button color="secondary" onClick={handleOpen}>
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            style={{ width: "200px", height: "200px" }}
            src={props.product.image[0].url}
          />
          <span>{props.product.name}</span>
          <form style={{ marginTop: "20px" }} onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={name}
              onChange={handleNameChange}
              style={{ marginBottom: "15px" }}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              fullWidth
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              style={{ marginBottom: "15px" }}
            />
            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              fullWidth
              name="price"
              type="number"
              value={price}
              onChange={handlePriceChange}
              style={{ marginBottom: "15px" }}
            />

            <Button variant="contained" color="success" type="submit">
              Update
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};
