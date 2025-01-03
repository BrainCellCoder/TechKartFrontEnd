import React, { useEffect, useState } from "react";
import "../Phones/Phones.css";
import { Card } from "../Card";
import { SearchProducts } from "../../../SearchProducts";
import { Grid } from "@mui/material";

export const Camera = (props) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchTv = async () => {
      const res = await fetch(
        "https://ecommercetechv.onrender.com/products?category=camera",
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            // "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setProducts(data.products);
    };
    fetchTv();
  }, []);
  return (
    <>
      {props.searchProducts.length > 0 && (
        <SearchProducts data={props.searchProducts} />
      )}
      <div
        className="products"
        style={{ marginTop: "100px", minHeight: "70vh" }}
      >
        <h1>Cameras</h1>
        <Grid container spacing={2}>
          {products.map((product, key) => {
            return <Card key={key} data={product} />;
          })}
        </Grid>
      </div>
    </>
  );
};
