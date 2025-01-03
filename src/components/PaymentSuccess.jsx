import { Link, useSearchParams } from "react-router-dom";
import React from "react";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

export const PaymentSuccess = () => {
  const searchQuery = useSearchParams()[0];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "79vh",
      }}
    >
      <div
        style={{
          width: "400px",
          height: "200px",
          padding: "2rem",
          borderRadius: "20px",
          backgroundColor: "#c7f9cc",
        }}
      >
        <Chip
          label="Payment Successfull"
          avatar={
            <Avatar>
              <i class="fa-solid fa-check"></i>
            </Avatar>
          }
        />
        <p>Reference ID: {searchQuery.get("reference")}</p>
        <Link style={{ textDecoration: "none" }} to="/">
          Go to Home
        </Link>
      </div>
    </div>
  );
};
