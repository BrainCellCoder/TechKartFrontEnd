// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import "./Register.css";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";

// export const Register = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const schema = yup.object().shape({
//     name: yup.string().min(4, "Minimum 4 chars").required("*name is required"),
//     email: yup
//       .string()
//       .email("*please provide a valid email")
//       .required("*email is required"),
//     password: yup
//       .string()
//       .min(4, "*password must be atleast 4 characters")
//       .max(20)
//       .required("*password is required"),
//     cPassword: yup
//       .string()
//       .oneOf([yup.ref("password"), null], "Passwords must match")
//       .min(4, "*password must be atleast 4 characters")
//       .max(20)
//       .required("*password is required"),
//   });
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });
//   // https://react-http-9d849-default-rtdb.firebaseio.com/
//   // https://rose-doubtful-moth.cyclic.app/user/register
//   const onSubmit = async (data) => {
//     console.log(data);
//     setLoading(true);
//     const res = await fetch(
//       "https://ecommercetechv.onrender.com/user/register",
//       {
//         method: "POST",
//         headers: {
//           Accept: "application/json, text/plain, */*",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: data.name,
//           email: data.email,
//           password: data.password,
//           cPassword: data.cPassword,
//         }),
//       }
//     );
//     const resp = await res.json();
//     console.log(resp);
//     if (resp.success === true) {
//       toast.success(resp.message, {
//         position: "bottom-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       navigate("/login");
//       setLoading(false);
//     } else if (resp.success === false) {
//       console.log("falied");
//       toast.error(resp.message, {
//         position: "bottom-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       setLoading(false);
//     }
//   };
//   const onError = () => {
//     console.log("Error");
//   };

//   return (
//     <>
//       <Container id="register">
//         <Col className="right-reg">
//           <h1>
//             Register <i className="fa-regular fa-pen-to-square"></i>
//           </h1>
//           <Form onSubmit={handleSubmit(onSubmit, onError)} method="POST">
//             <Form.Group className="mb-3">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter name"
//                 name="name"
//                 {...register("name")}
//               />
//               <p className="error-message">{errors.name?.message}</p>
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter email"
//                 name="email"
//                 {...register("email")}
//               />
//               <p className="error-message">{errors.email?.message}</p>
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Enter password"
//                 name="password"
//                 {...register("password")}
//               />
//               <p className="error-message">{errors.password?.message}</p>
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Confirm Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Re-enter password"
//                 {...register("cPassword")}
//               />
//               <p className="error-message">{errors.cPassword?.message}</p>
//             </Form.Group>
//             <Button variant="primary" type="submit" className="login-button">
//               {loading ? (
//                 <div className="lds-ellipsis">
//                   <div></div>
//                   <div></div>
//                   <div></div>
//                   <div></div>
//                 </div>
//               ) : (
//                 "Register"
//               )}
//             </Button>
//             <ToastContainer
//               position="bottom-center"
//               autoClose={3000}
//               hideProgressBar={false}
//               newestOnTop={false}
//               // closeOnClick
//               rtl={false}
//               pauseOnFocusLoss
//               draggable
//               pauseOnHover
//               theme="light"
//             />
//             <p className="reg-bottom-login">
//               Already have an account?
//               <Link className="reg-login" to="/login">
//                 Login
//               </Link>
//             </p>
//           </Form>
//         </Col>
//       </Container>
//     </>
//   );
// };

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(4, "Minimum 4 characters")
      .required("*Name is required"),
    email: yup
      .string()
      .email("*Please provide a valid email")
      .required("*Email is required"),
    password: yup
      .string()
      .min(4, "*Password must be at least 4 characters")
      .max(20, "*Password cannot exceed 20 characters")
      .required("*Password is required"),
    cPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("*Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await fetch(
      "https://ecommercetechv.onrender.com/user/register",
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const resp = await res.json();
    setLoading(false);

    if (resp.success) {
      setSnackbar({ open: true, message: resp.message, type: "success" });
      navigate("/login");
    } else {
      setSnackbar({ open: true, message: resp.message, type: "error" });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 10,
          p: 4,
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            size="small"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            size="small"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            size="small"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            size="small"
            {...register("cPassword")}
            error={!!errors.cPassword}
            helperText={errors.cPassword?.message}
          />
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register"
              )}
            </Button>
          </Box>
        </form>
        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "#1976d2" }}
          >
            Login
          </Link>
        </Typography>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        ContentProps={{
          sx: {
            backgroundColor: snackbar.type === "success" ? "green" : "red",
          },
        }}
      />
    </Container>
  );
};
