import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardDetails } from "./CardDetails";
import { useLocation } from "react-router-dom";

export const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [data, setData] = useState({});

  useEffect(() => {
    setData(location.state.product);
  }, [id]);

  return (
    <>
      <CardDetails data={data} />
    </>
  );
};
