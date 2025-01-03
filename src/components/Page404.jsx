import { Link } from "react-router-dom";
import React from "react";
import page from "./404page.jpg";
import Button from "@mui/material/Button";

export const Page404 = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "75vh",
      }}
    >
      <div
        style={{
          width: "500px",
          height: "500px",
          padding: "2rem",
          borderRadius: "20px",
          backgroundImage: `url(${page})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "end",
          justifyContent: "center",
        }}
      >
        <Button variant="contained">
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            Go to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};
