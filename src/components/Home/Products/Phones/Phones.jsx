// import React from "react";
// import "./Phones.css";
// import { Card } from "../Card";

// export const Phones = (props) => {
//   return (
//     <>
//       <div className="products">
//         <h3>Phones For You!</h3>
//         <div className="row gy-5">
//           {props.data.map((product, key) => {
//             return <Card key={key} data={product} />;
//           })}
//         </div>
//       </div>
//     </>
//   );
// };

import React from "react";
import "./Phones.css";
import { Card } from "../Card";
import { Grid } from "@mui/material"; // Assuming Material-UI for Grid

export const Phones = (props) => {
  return (
    <>
      <div className="products">
        <h3>Phones For You!</h3>
        <Grid container spacing={2}>
          {props.data.map((product, key) => {
            return <Card data={product} />;
          })}
        </Grid>
      </div>
    </>
  );
};
