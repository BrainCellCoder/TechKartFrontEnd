import React from "react";
import { Card } from "../Products/Card";

export const FilteredCategory = (props) => {
  return (
    <>
      <div className="products container">
        <h3>{props.data[0].category}</h3>
        <div className="row gy-5">
          {props.data.map((product, key) => {
            return <Card key={key} data={product} />;
          })}
        </div>
      </div>
    </>
  );
};
