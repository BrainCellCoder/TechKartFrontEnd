import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Protected = (props) => {
  const [cookies, setCookie] = useCookies(["userId"]);

  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem("user_id") || cookies.userId;
    console.log(login);
    if (!login) {
      navigate("/");
    }
  });
  return (
    <>
      <Component />
    </>
  );
};
