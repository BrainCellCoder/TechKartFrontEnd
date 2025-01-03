// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import "./Login.css";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// // import { baseUrl } from "../../Utils/baseUrl";

// export const Login = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const navigate = useNavigate();

//   const schema = yup.object().shape({
//     email: yup
//       .string()
//       .email("*please provide a valid email")
//       .required("*email is required"),
//     password: yup
//       .string()
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

//   const onSubmit = async (data) => {
//     console.log(data);
//     setLoading(true);
//     // https://rose-doubtful-moth.cyclic.app/user/login
//     const res = await fetch(`https://ecommercetechv.onrender.com/user/login`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json, text/plain, */*",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: data.email,
//         password: data.password,
//       }),
//     });
//     const resp = await res.json();
//     console.log(resp);
//     if (resp.success === true) {
//       setLoading(false);
//       localStorage.setItem("token", resp.token);
//       localStorage.setItem("user_id", resp.user._id);
//       // document.cookie = `token=${resp.token}; path=/`;

//       navigate("/");
//     } else if (resp.success === false) {
//       setError(true);
//       navigate("/login");
//       setLoading(false);
//       console.log(resp.message);
//       setErrorMsg(resp.message);
//     }
//   };
//   const onError = () => {
//     console.log("Error");
//   };

//   const google = async () => {
//     try {
//       console.log("google");
//       window.open("https://ecommercetechv.onrender.com/auth/google", "_self");
//     } catch (err) {
//       console.log("error");
//     }
//   };

//   return (
//     <>
//       <Container id="login">
//         {/* <Row> */}
//         {/* <Col className="left-login"></Col> */}
//         <Col className="right-login">
//           <h1>
//             Login <i className="fa-solid fa-arrow-right-to-bracket"></i>
//           </h1>
//           <Form onSubmit={handleSubmit(onSubmit, onError)} method="POST">
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
//             {error && <p className="error-message">{errorMsg}</p>}
//             <Button variant="primary" type="submit" className="login-button">
//               {loading ? (
//                 <div className="lds-ellipsis">
//                   <div></div>
//                   <div></div>
//                   <div></div>
//                   <div></div>
//                 </div>
//               ) : (
//                 "Login"
//               )}
//             </Button>
//           </Form>

//           {/* <div className="signup-with">
//             <p>
//               Or SignUp With
//             </p>
//           </div>

//           <div className="sign-up-logo">
//             <img
//               src={require("./../Login/google.png")}
//               alt=""
//               onClick={google}
//             />
//             Google
//           </div> */}
//           <p className="login-bottom-reg">
//             Don't have an account?
//             <Link className="reg" to="/register">
//               Register
//             </Link>
//           </p>
//         </Col>
//         {/* </Row> */}
//       </Container>
//     </>
//   );
// };

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Please provide a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(4, "Password must be at least 4 characters")
      .max(20, "Password cannot exceed 20 characters")
      .required("Password is required"),
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
    try {
      const res = await fetch(
        `https://ecommercetechv.onrender.com/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const resp = await res.json();
      if (resp.success) {
        localStorage.setItem("token", resp.token);
        localStorage.setItem("user_id", resp.user._id);
        navigate("/");
      } else {
        setError(true);
        setErrorMsg(resp.message);
      }
    } catch (err) {
      setError(true);
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        marginTop: "130px",
        padding: 4,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 3,
        // mt: 6,
        marginBottom: "150px",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Box>
        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Login"
          )}
        </Button>
      </form>
      <Typography variant="body2" sx={{ mt: 3 }}>
        Don't have an account?{" "}
        <Button variant="text" onClick={() => navigate("/register")}>
          Register
        </Button>
      </Typography>
    </Box>
  );
};
