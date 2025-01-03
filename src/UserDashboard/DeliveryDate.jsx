import React from "react";
import { format } from "date-fns";

export const DeliveryDate = (props) => {
  const inputDate = new Date(props.deliveryDate);
  const outputDate = format(inputDate, "dd MMM yyyy");
  return (
    <>
      {/* <p style={{ fontSize: "1rem", fontWeight: "700" }}> */}
      Expected On: {outputDate}
      {/* </p> */}
    </>
  );
};
