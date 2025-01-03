import React, { useEffect, useState } from "react";
import "./CartItems.css";
import { ProgressBar } from "react-bootstrap";
import { useCookies } from "react-cookie";

export const CartItems = (props) => {
  // console.log(props.data.quantity);
  const [quantity, setQuantity] = useState(props.data.quantity);
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["userId", "token"]);

  const imgURL = props.data.productId.image[0].url;
  const price = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(props.data.productId.price);

  const cartRemoveHandler = async (id) => {
    setIsLoading(true);
    const res = await fetch(
      `https://ecommercetechv.onrender.com/user/cart/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Abhi ${
            localStorage.getItem("token") || cookies.token
          }`,
        },
      }
    );
    setIsLoading(false);
  };

  const addToWishList = async (id) => {
    await fetch(`https://ecommercetechv.onrender.com/user/wishlist/${id}`, {
      method: "POST",
      headers: {
        authorization: `Abhi ${localStorage.getItem("token") || cookies.token}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
  };

  const handleQuantityChange = async (id, event) => {
    setQuantity(parseInt(event.target.value));
    const res = await fetch(
      `https://ecommercetechv.onrender.com/user/cart/${id}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Abhi ${
            localStorage.getItem("token") || cookies.token
          }`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: parseInt(event.target.value),
        }),
      }
    );
    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      {isLoading && (
        <ProgressBar now={100} label="Removing..." variant="danger" />
      )}
      {props.cartLength ? (
        <div className="cart-item">
          <div className="product-image">
            <img src={imgURL} />
          </div>
          <div className="product-information">
            <div className="product-name-price">
              <h5 className="product-name">{props.data.productId.name}</h5>
              <h5 className="product-price">₹ {price}</h5>
            </div>
            <p className="cart-item-stock">In Stock</p>
            <div className="product-control">
              <div className="product-quantity">
                <label htmlFor="quantity">Quantity:</label>
                <select
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(event) => {
                    handleQuantityChange(props.data.productId._id, event);
                  }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div
                className="product-remove"
                onClick={() => {
                  cartRemoveHandler(props.data.productId._id);
                }}
              >
                <i className="fa-solid fa-x"></i> Remove
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Cart is empt</p>
      )}
    </>
  );
};
