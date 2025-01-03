import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { CartItems } from "./CartItems";
import { AppContext } from "../../App";
import { useCookies } from "react-cookie";
import { FloatingLabel, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

export const Cart = () => {
  const { cartNumber, setCartNumber } = useContext(AppContext);
  const [cookies, setCookie] = useCookies(["userId", "token"]);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(address, phone);
  //   handleCloseModal();
  // };

  const [cartItems, setCartItems] = useState([]);
  const [cartItemstotalPrice, setcartItemsTotalPrice] = useState(0);
  let totalPrice;

  let currentDate = new Date();
  let futureDate = new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000);
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Format the future date to display as Month DD, YYYY
  let formattedDate =
    monthNames[futureDate.getMonth()] +
    " " +
    futureDate.getDate() +
    ", " +
    futureDate.getFullYear();

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch("https://ecommercetechv.onrender.com/user/me", {
        headers: {
          authorization: `Abhi ${
            localStorage.getItem("token") || cookies.token
          }`,
        },
      });
      const data = await res.json();
      // console.log(data);
      setCartItems(data.user.cart);
    };
    fetchCart();
    totalPrice = cartItems.reduce(
      (acc, obj) => acc + obj.productId.price * obj.quantity,
      0
    );
    const formatedTotalPrice = new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 3,
    }).format(totalPrice);
    setcartItemsTotalPrice(formatedTotalPrice);
    setCartNumber(cartItems.length);
  }, [cartItems]);

  const checkoutHandler = async (e) => {
    e.preventDefault();
    const price = totalPrice;
    // const productId = props.data._id;
    const keyRes = await fetch("https://ecommercetechv.onrender.com/getkey");
    const keyResp = await keyRes.json();
    const user = await fetch("https://ecommercetechv.onrender.com/user/me", {
      headers: {
        authorization: `Abhi ${localStorage.getItem("token") || cookies.token}`,
        "Content-Type": "application/json",
      },
    });
    const userData = await user.json();

    const res = await fetch(
      "https://ecommercetechv.onrender.com/payment/checkout",
      {
        method: "POST",
        headers: {
          authorization: `Abhi ${
            localStorage.getItem("token") || cookies.token
          }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: price,
          cart: cartItems,
          buyer: localStorage.getItem("user_id") || cookies.userId,
          address,
          phone,
          email: userData.user.email,
        }),
      }
    );
    const resp = await res.json();
    console.log(resp);
    handleCloseModal();

    const options = {
      key: keyResp.key, // Enter the Key ID generated from the Dashboard
      amount: resp.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "TechKart",
      description: "RazorPay Transaction",
      image:
        "https://res.cloudinary.com/dywjchq8q/image/upload/v1681550262/logo1_hrtppt.png",
      order_id: resp.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url:
        "https://ecommercetechv.onrender.com/payment/paymentverification",
      prefill: {
        //logged in user details
        name: userData.user.name,
        email: userData.user.email,
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#7b2cbf",
      },
    };
    const razor = new window.Razorpay(options);
    console.log(razor);
    razor.open();
  };

  return (
    <>
      <div id="cartItems">
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              {cartItems.length >= 1 && (
                <div className="heading-my-cart">
                  <h3>My Cart ({cartItems.length})</h3>
                  <span>Total Amount: ₹ {cartItemstotalPrice}</span>
                </div>
              )}
              {!cartItems.length && (
                <div className="empty-cart">
                  <Alert
                    sx={{
                      width: "50%",
                      margin: "auto",
                      border: "1px solid #ff758f",
                      display: "flex",
                      alignItems: "center",
                    }}
                    severity="error"
                  >
                    <span style={{ marginRight: "60px" }}>
                      No Products in Cart
                    </span>
                    <Link to="/">
                      <Button variant="contained">Go Home</Button>
                    </Link>
                  </Alert>
                </div>
              )}
              <div className="cart-items">
                {cartItems.map((item, key) => (
                  <CartItems
                    key={key}
                    data={item}
                    cartLength={cartItems.length}
                  />
                ))}
              </div>
            </Grid>
            <Grid item xs={12} md={5}>
              {cartItems.length >= 1 ? (
                <div className="cart-items-checkout">
                  <p className="delivery-date">
                    Delivery date: {formattedDate}
                  </p>
                  <div className="subtotal">
                    <div className="discount">
                      <p>Price ({cartItems.length} items)</p>
                      <p>₹ {cartItemstotalPrice}</p>
                    </div>
                    <div className="delivery">
                      <p>Delivery Charge</p>
                      <p style={{ color: "green" }}>free</p>
                    </div>
                  </div>
                  <div className="total">
                    <p>Total</p>
                    <p>₹ {cartItemstotalPrice}</p>
                  </div>

                  <div className="checkout-shopping">
                    <Link
                      to="/checkout"
                      state={{
                        cartLength: cartItems.length,
                        cartItemstotalPrice,
                        formattedDate,
                      }}
                      className="checkout"
                    >
                      Proceed to Checkout
                    </Link>
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/"
                      className="shopping"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

// import React, { useContext, useEffect, useState } from "react";
// import "./Cart.css";
// import { CartItems } from "./CartItems";
// import { AppContext } from "../../App";
// import { useCookies } from "react-cookie";
// import { Grid, Typography, Alert, Button, Box } from "@mui/material";
// import { Link } from "react-router-dom";

// export const Cart = () => {
//   const { cartNumber, setCartNumber } = useContext(AppContext);
//   const [cookies, setCookie] = useCookies(["userId", "token"]);
//   const [cartItems, setCartItems] = useState([]);
//   const [cartItemstotalPrice, setcartItemsTotalPrice] = useState(0);

//   let totalPrice;
//   let currentDate = new Date();
//   let futureDate = new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000);
//   let monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   let formattedDate =
//     monthNames[futureDate.getMonth()] +
//     " " +
//     futureDate.getDate() +
//     ", " +
//     futureDate.getFullYear();

//   useEffect(() => {
//     const fetchCart = async () => {
//       const res = await fetch("https://ecommercetechv.onrender.com/user/me", {
//         headers: {
//           authorization: `Abhi ${
//             localStorage.getItem("token") || cookies.token
//           }`,
//         },
//       });
//       const data = await res.json();
//       setCartItems(data.user.cart);
//     };

//     fetchCart();
//     totalPrice = cartItems.reduce(
//       (acc, obj) => acc + obj.productId.price * obj.quantity,
//       0
//     );
//     const formattedTotalPrice = new Intl.NumberFormat("en-IN", {
//       maximumSignificantDigits: 3,
//     }).format(totalPrice);
//     setcartItemsTotalPrice(formattedTotalPrice);
//     setCartNumber(cartItems.length);
//   }, [cartItems]);

//   return (
//     <Box id="cartItems" sx={{ padding: 3 }}>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={7}>
//           {cartItems.length >= 1 && (
//             <Box sx={{ marginBottom: 3 }}>
//               <Typography variant="h5">My Cart ({cartItems.length})</Typography>
//               <Typography variant="body1">
//                 Total Amount: ₹ {cartItemstotalPrice}
//               </Typography>
//             </Box>
//           )}
//           {!cartItems.length && (
//             <Alert
//               severity="error"
//               sx={{
//                 width: "100%",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <Typography>No Products in Cart</Typography>
//               <Link to="/" style={{ textDecoration: "none" }}>
//                 <Button variant="contained">Go Home</Button>
//               </Link>
//             </Alert>
//           )}
//           <Box>
//             {cartItems.map((item, key) => (
//               <CartItems key={key} data={item} cartLength={cartItems.length} />
//             ))}
//           </Box>
//         </Grid>

//         <Grid item xs={12} md={5}>
//           {cartItems.length >= 1 && (
//             <Box
//               sx={{
//                 border: "1px solid #ccc",
//                 borderRadius: "8px",
//                 padding: 2,
//               }}
//             >
//               <Typography variant="body2">
//                 Delivery date: {formattedDate}
//               </Typography>
//               <Box sx={{ marginTop: 2 }}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginBottom: 1,
//                   }}
//                 >
//                   <Typography>Price ({cartItems.length} items)</Typography>
//                   <Typography>₹ {cartItemstotalPrice}</Typography>
//                 </Box>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginBottom: 1,
//                   }}
//                 >
//                   <Typography>Delivery Charge</Typography>
//                   <Typography color="green">Free</Typography>
//                 </Box>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   <Typography>Total</Typography>
//                   <Typography>₹ {cartItemstotalPrice}</Typography>
//                 </Box>
//               </Box>
//               <Box sx={{ marginTop: 2 }}>
//                 <Link
//                   to="/checkout"
//                   state={{
//                     cartLength: cartItems.length,
//                     cartItemstotalPrice,
//                     formattedDate,
//                   }}
//                   style={{ textDecoration: "none" }}
//                 >
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     sx={{ marginBottom: 1 }}
//                   >
//                     Proceed to Checkout
//                   </Button>
//                 </Link>
//                 <Link to="/" style={{ textDecoration: "none" }}>
//                   <Button variant="outlined" fullWidth>
//                     Continue Shopping
//                   </Button>
//                 </Link>
//               </Box>
//             </Box>
//           )}
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };
