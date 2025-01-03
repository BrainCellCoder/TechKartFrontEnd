import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

export const Status = (props) => {
  const [status, setStatus] = useState(props.status);
  const handleChange = async (event) => {
    event.preventDefault();
    console.log(event.target.value);
    const res = await fetch(
      `https://ecommercetechv.onrender.com/admin/orderstatus/${props.orderId}`,
      {
        method: "POST",
        headers: {
          authorization: `Abhi ${localStorage.getItem("token")}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: event.target.value,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    setStatus(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value="Not processed">Not Processed</MenuItem>
          <MenuItem value="Processing">Processing</MenuItem>
          <MenuItem value="Shipped">Shipped</MenuItem>
          <MenuItem value="Delivered">Delivered</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
