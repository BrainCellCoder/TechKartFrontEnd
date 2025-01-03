import React from "react";
import { FaStar, FaStarHalf, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const MAX_RATING = 5; // Maximum rating value
  const fullStars = Math.floor(rating); // Number of full stars
  const halfStars = Math.ceil(rating - fullStars); // Number of half stars

  // Create an array of stars based on the rating value
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} />);
  }
  if (halfStars) {
    stars.push(<FaStarHalfAlt key={stars.length} />);
  }
  for (let i = stars.length; i < MAX_RATING; i++) {
    stars.push(<FaRegStar key={i} />);
  }

  return <div style={{ color: "orange" }}>{stars}</div>;
};

export default StarRating;
