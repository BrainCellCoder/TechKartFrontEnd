import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const { handleSubmit, register } = useForm({});

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    // https://rose-doubtful-moth.cyclic.app/user/login
    const res = await fetch(`https://ecommercetechv.onrender.com/admin/login`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    const resp = await res.json();
    console.log(resp);
    if (resp.success === true) {
      setLoading(false);
      localStorage.setItem("token", resp.token);
      localStorage.setItem("user_id", resp.admin._id);
      // document.cookie = `token=${resp.token}; path=/`;

      navigate("/admin");
    } else if (resp.success === false) {
      setError(true);
      navigate("/login");
      setLoading(false);
      console.log(resp.message);
      setErrorMsg(resp.message);
    }
  };
  const onError = () => {
    console.log("Error");
  };

  return (
    <div id="admin-login">
      <form onSubmit={handleSubmit(onSubmit, onError)} method="POST">
        <Typography variant="h6" gutterBottom>
          Admin Login
        </Typography>
        <TextField
          sx={{ marginBottom: "20px" }}
          label="Email"
          type="email"
          fullWidth
          required
          name="email"
          {...register("email")}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          name="password"
          {...register("password")}
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
};
