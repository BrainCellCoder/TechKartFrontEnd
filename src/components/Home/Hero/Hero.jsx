import React from "react";
import "./Hero.css";
// import "animate.css";
import { Link } from "react-router-dom";
export const Hero = (props) => {
  return (
    <>
      <div className="hero">
        <h1>
          Find your perfect <span className="sound">𝒮𝑜𝓊𝓃𝒹</span> <br /> with our
          Headphones.
        </h1>
        <Link
          className="headphones-buy-now"
          to={"/headphones"}
          state={{ product: props.data }}
        >
          Buy now
        </Link>
      </div>
    </>
  );
};
