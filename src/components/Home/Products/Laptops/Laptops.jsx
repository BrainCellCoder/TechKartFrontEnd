import React from "react";
import { Card } from "../Card";
import { Grid } from "@mui/material";

export const Laptops = (props) => {
  return (
    <>
      <div className="products">
        <h3>Best Laptops of 2023: Top Picks</h3>
        {/* <button onClick={lowToHigh}>Sort L-H</button> */}
        <Grid container spacing={2}>
          {props.data.map((product, key) => {
            return <Card key={key} data={product} />;
          })}
        </Grid>
      </div>
    </>
  );
};
