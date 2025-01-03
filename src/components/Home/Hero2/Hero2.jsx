import React from "react";
import "./Hero2.css";
import { Link } from "react-router-dom";
export const Hero2 = (props) => {
  return (
    <>
      <div className="hero2">
        <h1>
          Add the perfect finishing touch <br /> with our Accessories
        </h1>
        <Link
          className="accessories-explore"
          to={"/accessories"}
          state={{ product: props.data }}
        >
          Explore
        </Link>
      </div>
    </>
  );
};
