import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Card } from "../Home/Products/Card";
import "./Wishlist.css";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

export const Wishlist = () => {
  const [wishItems, setWishItems] = useState([]);
  const [cookies, setCookie] = useCookies(["userId", "token"]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const res = await fetch("https://ecommercetechv.onrender.com/user/me", {
        headers: {
          authorization: `Abhi ${
            localStorage.getItem("token") || cookies.token
          }`,
        },
      });
      const data = await res.json();
      setWishItems(data.user.wishList);
    };
    fetchWishlist();
  });
  return (
    <section style={{ minHeight: "70vh", marginTop: "100px", padding: "10px" }}>
      <div className="container">
        {wishItems.length >= 1 && <h3>My Wishlist ({wishItems.length})</h3>}
        {!wishItems.length && (
          <Alert
            sx={{
              width: "30%",
              margin: "auto",
              border: "1px solid #ff758f",
              display: "flex",
              alignItems: "center",
            }}
            severity="error"
          >
            <span style={{ marginRight: "60px" }}>No Product in Wish list</span>
            <Link to="/">
              <Button variant="contained">Go Home</Button>
            </Link>
          </Alert>
        )}
        <Grid container spacing={2}>
          {wishItems.map((item, key) => (
            <Card key={key} data={item} />
          ))}
        </Grid>
      </div>
    </section>
  );
};
