import React, { useEffect, useState, useContext } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import isAuthenticated from "../../Utils/isAuth.jsx";
import { AppContext } from "../../App";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import logo from "./logo1.png";
import love from "./../Navbar/love.png";
import cart from "./../Navbar/cart.png";
export const Navbars = (props) => {
  const [cookies, setCookie] = useCookies(["userId", "token"]);
  const { cartNumber } = useContext(AppContext);
  const location = useLocation();
  const isAuth = isAuthenticated();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    isAuth ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [location]);

  const [productName, setProductName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    searchProduct(productName);
  };

  const handleInputChange = (event) => {
    setProductName(event.target.value);
  };

  const searchProduct = async (productName) => {
    try {
      const response = await fetch(
        `https://ecommercetechv.onrender.com/products/search?text=${productName}`,
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      props.search(data.products);
    } catch (error) {
      console.error("Error occurred during search:", error);
    }
  };

  const logoutHandler = async () => {
    const res = await fetch("https://ecommercetechv.onrender.com/user/logout", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    const cookies = Cookies.get();
    Object.keys(cookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <Link to="/" className="logo">
              <img id="logo" src={logo} alt="" />
              <span id="T">T</span>ech<span id="K">K</span>art
            </Link>
            {isLoggedIn || cookies.userId ? (
              <div className="logout" onClick={logoutHandler}>
                Logout
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="navbar-toggle">
            {/* <button
              className="navbar-toggler"
              onClick={() =>
                document
                  .querySelector(".navbar-collapse")
                  .classList.toggle("show")
              }
              aria-controls="navbar-nav"
            >
              <span className="navbar-toggler-icon">☰</span>
            </button> */}
          </div>

          <div className="navbar-collapse">
            <div className="navbar-nav">
              <div className="product-search">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={productName}
                    onChange={handleInputChange}
                    placeholder="Search Product..."
                  />
                  <button>🔍</button>
                </form>
              </div>

              {isLoggedIn || cookies.userId ? (
                <div>
                  <Link
                    to={`/dashboard/${
                      cookies.userId
                        ? cookies.userId
                        : localStorage.getItem("user_id")
                    }`}
                    className="account"
                  >
                    <Chip
                      sx={{ cursor: "pointer" }}
                      icon={<FaceIcon />}
                      label="Account"
                    />
                  </Link>
                </div>
              ) : (
                <div className="login-btn">
                  <Link className="a" to="/login">
                    Login
                  </Link>
                </div>
              )}

              {isLoggedIn || cookies.userId ? (
                <div className="wish-cart">
                  <a href="/user/wishlist">
                    <img id="wishlist" src={love} alt="" />
                  </a>
                  <Link to="/user/cart" className="cart">
                    <img id="cart" src={cart} alt="" />
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
