import React from "react";
import "./Headphones.css";
import { Card } from "../Card";
import { useLocation } from "react-router-dom";
import { SearchProducts } from "../../../SearchProducts";
import { Grid } from "@mui/material";

export const Headphones = (props) => {
  const location = useLocation();

  return (
    <>
      {props.searchProducts.length > 0 && (
        <SearchProducts data={props.searchProducts} />
      )}
      <div
        className="products"
        style={{ marginTop: "100px", marginBottom: "5rem", minHeight: "70vh" }}
      >
        <h1>Headphones</h1>
        <Grid container spacing={2}>
          {location.state.product.map((product, key) => {
            return <Card key={key} data={product} />;
          })}
        </Grid>
      </div>
    </>
  );
};
