import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StarRating from "../../ProductDetails/StarRating";
// import { baseUrl } from "./../../../Utils/baseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import "./Card.css";
import { Grid } from "@mui/material";

export const Card = (props) => {
  const [addWishlist, setAddWishlist] = useState(false);
  const [addCart, setAddCart] = useState(false);
  const [productInWishlist, setProductInWishlist] = useState(false);
  const [productInCart, setProductInCart] = useState(false);
  const [cookies, setCookie] = useCookies(["userId", "token"]);

  const imgURL = props.data.image[0].url;
  const price = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(props.data.price);

  const navigate = useNavigate();

  const addToCart = async (id) => {
    const res = await fetch(
      `https://ecommercetechv.onrender.com/user/cart/${id}`,
      {
        method: "POST",
        headers: {
          authorization: `Abhi ${
            localStorage.getItem("token") || cookies.token
          }`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
          quantity: 1,
        }),
      }
    );
    const data = await res.json();
    toast.success(data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setAddCart(!addCart);

    if (!data.success) {
      navigate("/login");
    }
  };

  const addToWishList = async (id) => {
    const res = await fetch(
      `https://ecommercetechv.onrender.com/user/wishlist/${id}`,
      {
        method: "POST",
        headers: {
          authorization: `Abhi ${
            localStorage.getItem("token") || cookies.token
          }`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    toast.success(data.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setAddWishlist(!addWishlist);
    if (!data.success) {
      navigate("/login");
    }
  };

  const removeFromWishList = async (id) => {
    const res = await fetch(
      `https://ecommercetechv.onrender.com/user/wishlist/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Abhi ${
            localStorage.getItem("token") || cookies.token
          }`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    toast.success(data.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setAddWishlist(!addWishlist);
    if (!data.success) {
      navigate("/login");
    }
  };

  const removeFromCart = async (id) => {
    const res = await fetch(
      `https://ecommercetechv.onrender.com/user/cart/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Abhi ${
            localStorage.getItem("token") || cookies.token
          }`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    toast.success(data.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setAddCart(!addCart);
    if (!data.success) {
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("https://ecommercetechv.onrender.com/user/me", {
        headers: {
          authorization: `Abhi ${
            localStorage.getItem("token") || cookies.token
          }`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setProductInWishlist(
        data.user?.wishList.some((item) => item._id === props.data._id)
      );
      setProductInCart(
        data.user?.cart.some((item) => item.productId._id === props.data._id)
      );
    };
    fetchUser();
  }, [addWishlist, addCart]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      {/* <div className="product animate__animated animate__fadeInUp"> */}
      <div className="product">
        <div
          className="image"
          style={{ backgroundImage: `url(${imgURL})` }}
        ></div>
        <div className="title">
          <h6 className="name">{props.data.name}</h6>
          <h6 className="price">₹{price}</h6>
        </div>
        <div className="ratings">
          {/* <p className="stars"> */}
          <StarRating rating={props.data.rating} />
          {/* </p> */}
          <p className="number-of-reviews text-muted">
            ({props.data.numOfReviews} reviews)
          </p>
        </div>
        <div className="add-view">
          {!productInCart && (
            <div
              className="add-to-cart"
              onClick={() => {
                addToCart(props.data._id);
              }}
            >
              <i className="fa-solid fa-cart-plus"></i> Add to cart
            </div>
          )}
          {productInCart && (
            <div
              className="remove-from-cart"
              onClick={() => {
                removeFromCart(props.data._id);
              }}
            >
              Remove from Cart
            </div>
          )}
          <Link
            className="view"
            to={`products/${props.data._id}`}
            state={{ product: props.data }}
          >
            <i className="fa-sharp fa-solid fa-eye"></i> View
          </Link>
        </div>
        {!productInWishlist && (
          <div
            className="wish"
            onClick={() => {
              addToWishList(props.data._id);
            }}
          >
            <i className="fa-regular fa-heart"></i>
          </div>
        )}
        {productInWishlist && (
          <div
            className="wish wished"
            onClick={() => {
              removeFromWishList(props.data._id);
            }}
          >
            <i className="fa-solid fa-heart"></i>
          </div>
        )}
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          // closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Grid>
  );
};
