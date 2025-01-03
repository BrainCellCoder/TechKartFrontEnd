import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "./CardDetails.css";
import Rating from "react-rating-stars-component";
import StarRating from "./StarRating";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../../Utils/star.css";
import { Grid, Paper, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import StarIcon from "@mui/icons-material/Star";
// import { ProductImage } from "./ProductImage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "20px",
  p: 4,
};

export const CardDetails = (props) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [toggle, setToggle] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [cookies, setCookie] = useCookies(["userId", "token"]);
  const [isProductOrdered, setIsProductOrdered] = useState(false);
  const [addWishlist, setAddWishlist] = useState(false);
  const [addCart, setAddCart] = useState(false);
  const [productInWishlist, setProductInWishlist] = useState(false);
  const [productInCart, setProductInCart] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const imageUrl = props.data.image ? props.data.image[0].url : null;
  const price = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(props.data.price);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

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
          quantity: quantity,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    setAddCart(!addCart);
    toast.success(data.message, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    if (!data.success) {
      Navigate("/login");
    }
  };

  const addToWishlist = async (id) => {
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
    setAddWishlist(!addWishlist);
    toast.success(data.message, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    if (!data.success) {
      Navigate("/login");
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    console.log("rrrr");
    console.log(rating, comment);
    event.preventDefault();

    fetch(`https://ecommercetechv.onrender.com/review/${props.data._id}/new`, {
      method: "POST",
      headers: {
        authorization: `Abhi ${localStorage.getItem("token") || cookies.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: comment,
        rating: rating,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send rating and comment");
        }
        setToggle(!toggle);
        // handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
      });
    setRating(0);
    setComment("");
    handleClose();
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(
        `https://ecommercetechv.onrender.com/products/${id}`,
        {
          headers: {
            authorization: `Abhi ${
              localStorage.getItem("token") || cookies.token
            }`,
          },
        }
      );
      const data = await res.json();
      setReviews(data.product.reviews);
      setAvgRating(data.product.rating);
      setNumReviews(data.product.numOfReviews);
    };
    fetchReviews();
  }, [toggle]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(
        "https://ecommercetechv.onrender.com/user/me/myorders",
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
            id: localStorage.getItem("user_id") || cookies.userId,
          }),
        }
      );

      const data = await res.json();
      console.log(data);
      const getProductIds = () => {
        const productIds = data.orders.flatMap((order) =>
          order.products.map((product) => product.productId._id)
        );
        return productIds;
      };

      const productIds = getProductIds();
      console.log("Product IDs:", productIds);
      const isOrdered = productIds.includes(id);
      console.log(isOrdered);
      setIsProductOrdered(isOrdered);
    };
    fetchUser();
  }, []);

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
      position: "bottom-center",
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
      Navigate("/login");
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
      position: "bottom-center",
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
      Navigate("/login");
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
      setProductInWishlist(data.user?.wishList.some((item) => item._id === id));
      setProductInCart(
        data.user?.cart.some((item) => item.productId._id === id)
      );
    };
    fetchUser();
  }, [addWishlist, addCart]);

  const form = isProductOrdered ? (
    <form onSubmit={handleSubmit}>
      <Rating
        name="star-rating"
        value={rating}
        onChange={handleRatingChange}
        size={30}
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Comment"
        multiline
        maxRows={4}
        fullWidth
        onChange={handleCommentChange}
        required
      />

      <Box mt={2}>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  ) : (
    <Alert severity="info">
      <h3>Haven't purchased this product?</h3> Sorry! You are not allowed to
      review this product since you haven't bought it on TechKart.
    </Alert>
  );

  return (
    <>
      <div id="product-details">
        <div id="gutter" className="row">
          <div
            id="img-small"
            className="col-md-6 product-img"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
          <div id="img-big" className="col-md-6 product-img">
            {/* <ProductImage image={imageUrl} /> */}
            <img src={imageUrl} />
          </div>

          <div className="col-md-6 product-info">
            <div className="product-details">
              <h3>{props.data.name}</h3>
              <p className="text-muted">{props.data.description}</p>
              <div className="ratings">
                <StarRating rating={avgRating} />
                <span className="number-of-reviews text-muted">
                  ({numReviews} reviews)
                </span>
                <div className="rate-product">
                  <button
                    onClick={handleOpen}
                    style={{
                      fontWeight: "500",
                      color: "white",
                      border: "none",
                      outline: "none",
                      padding: "0.3rem",
                      backgroundColor: "orange",
                      borderRadius: "5px",
                      boxShadow: "3px 3px 4px -2px #000",
                    }}
                  >
                    <StarIcon /> RATE
                  </button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      {localStorage.getItem("token") || cookies.token ? (
                        form
                      ) : (
                        <p>
                          Please{" "}
                          <Button variant="contained" color="success">
                            <Link
                              style={{ textDecoration: "none", color: "white" }}
                              to="/login"
                            >
                              Login
                            </Link>
                          </Button>{" "}
                          to rate the product
                        </p>
                      )}
                    </Box>
                  </Modal>
                </div>
              </div>
            </div>
            <div className="product-price">
              Price
              <h1>₹{price}</h1>
            </div>
            <div className="product-control-form">
              <div className="pro-quantity">
                <label for="quantity">Quantity:</label>
                <select
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="product-buy-cart">
                {/* <div
                  className="product-buy"
                  onClick={() => {
                    addToWishlist(props.data._id);
                  }}
                >
                  Add to Wish list
                </div> */}
                {!productInWishlist && (
                  <div
                    className="product-wish"
                    onClick={() => {
                      addToWishlist(props.data._id);
                    }}
                  >
                    <i className="fa-regular fa-heart"></i>
                  </div>
                )}
                {productInWishlist && (
                  <div
                    className="product-wish addWish"
                    onClick={() => {
                      removeFromWishList(props.data._id);
                    }}
                  >
                    <i className="fa-solid fa-heart"></i>
                  </div>
                )}

                {/* <div
                  className="product-cart"
                  onClick={() => {
                    addToCart(props.data._id);
                  }}
                >
                  Add to Cart
                </div> */}
                {!productInCart && (
                  <div
                    className="product-cart"
                    onClick={() => {
                      addToCart(props.data._id);
                    }}
                  >
                    <i className="fa-solid fa-cart-plus"></i> Add to cart
                  </div>
                )}
                {productInCart && (
                  <div
                    className="product-cart removecart"
                    // style={{ color: "red", borderColor: "red" }}
                    onClick={() => {
                      removeFromCart(props.data._id);
                    }}
                  >
                    Remove from Cart
                  </div>
                )}
              </div>
            </div>
            <ToastContainer
              position="bottom-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </div>
        <Typography
          variant="h3"
          component="h3"
          sx={{ textAlign: "center", marginBottom: "2rem" }}
        >
          Reviews
        </Typography>
        <Grid container spacing={2}>
          {reviews.length === 0 && (
            <Alert sx={{ margin: "auto" }} severity="info">
              No Reviews Yet
            </Alert>
          )}
          {reviews.map((review, key) => {
            return (
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  style={{
                    minHeight: 110,
                    backgroundColor: "#f8f9fa",
                    padding: "0.5rem",
                  }}
                >
                  <Chip
                    avatar={
                      <Avatar sx={{ backgroundColor: "#f9bec7" }}>
                        {review.author?.name.charAt(0)}
                      </Avatar>
                    }
                    label={review.author?.name}
                    variant="outlined"
                  />
                  <StarRating rating={review.rating} />
                  {review.comment}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
};
