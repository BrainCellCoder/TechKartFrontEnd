import React, { useEffect, useState } from "react";
import "./CheckOut.css";

import Form from "react-bootstrap/Form";
import { FloatingLabel } from "react-bootstrap";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import Chip from "@mui/material/Chip";
import EmailIcon from "@mui/icons-material/Email";
import Button from "@mui/material/Button";
import { Box, Grid, TextField } from "@mui/material";

export const CheckOut = () => {
  const location = useLocation();
  const [data, setData] = useState({});
  useEffect(() => {
    setData(location.state);
  }, []);

  const [userData, setUserData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [addressDelete, setAddressDelete] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [cookies, setCookie] = useCookies(["userId", "token"]);
  const [isChecked, setIsChecked] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(JSON.parse(event.target.value));
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetch("https://ecommercetechv.onrender.com/user/me", {
        headers: {
          authorization: `Abhi ${
            localStorage.getItem("token") || cookies.token
          }`,
        },
      });
      const data = await user.json();
      console.log(data.user.shippingAddress[0]);
      setUserData(data);
      setSelectedOption(data.user.shippingAddress[0]);
    };
    fetchUser();
  }, [isNewAddress, addressDelete]);

  const toggleAddressForm = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };

  const schema = yup.object().shape({
    address: yup.string().required("*address is required"),
    city: yup.string().required("*city is required"),
    state: yup.string().required("*state is required"),
    country: yup.string().required("*country is required"),
    pinCode: yup
      .number()
      .required()
      .positive()
      .integer()
      .min(7)
      .typeError("*pincode is required"),
    phoneNo: yup
      .number()
      .required()
      .positive()
      .integer()
      .min(10)
      .typeError("*phone number is required"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const res = await fetch("https://ecommercetechv.onrender.com/user/me", {
      method: "POST",
      headers: {
        authorization: `Abhi ${localStorage.getItem("token") || cookies.token}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: data.address,
        city: data.city,
        country: data.country,
        state: data.state,
        pinCode: data.pinCode,
        phoneNo: data.phoneNo,
      }),
    });
    const resp = await res.json();
    if (resp.success === true) {
      reset();
      setShowForm(false);
      setIsNewAddress(!isNewAddress);
    }
  };
  const onError = () => {
    console.log("Error");
  };

  const deleteAddress = async (id) => {
    console.log(id);
    const res = await fetch(
      `https://ecommercetechv.onrender.com/user/me/delete-address/${id}`,
      {
        method: "PUT",
        headers: {
          authorization: `Abhi ${
            localStorage.getItem("token") || cookies.token
          }`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addressId: id,
          userId: localStorage.getItem("user_id") || cookies.userId,
        }),
      }
    );
    const resp = await res.json();
    console.log(resp);
    setAddressDelete(!addressDelete);
  };

  const checkoutHandler = async (e) => {
    e.preventDefault();
    debugger;
    const keyRes = await fetch("https://ecommercetechv.onrender.com/getkey");
    const keyResp = await keyRes.json();
    const user = await fetch("https://ecommercetechv.onrender.com/user/me", {
      headers: {
        authorization: `Abhi ${localStorage.getItem("token") || cookies.token}`,
        "Content-Type": "application/json",
      },
    });
    const userData = await user.json();
    const price = Number(data.cartItemstotalPrice.replace(/,/g, ""));

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
          cart: userData.user.cart,
          buyer: localStorage.getItem("user_id") || cookies.userId,
          shippingInfo: selectedOption,
          email: userData.user.email,
          deliveryDate: data.formattedDate,
        }),
      }
    );
    const resp = await res.json();

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
        contact: "9706469235",
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
      <div id="checkout">
        <div className="container">
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <div className="checkout-user">
                <i className="fa-solid fa-circle"></i>
                <div className="checkout-user-name-email">
                  <p style={{ margin: "0" }}>User</p>
                  <span style={{ fontWeight: "600" }}>
                    {userData.user?.name} :
                  </span>{" "}
                  <Chip avatar={<EmailIcon />} label={userData.user?.email} />
                </div>
              </div>
              <div className="delivery-address">
                <div className="delivery-address-head">
                  <i className="fa-solid fa-circle"></i>
                  <p className="checkout-address-head">DELIVERY ADDRESS</p>
                </div>
                <div className="address-list">
                  {userData.user?.shippingAddress.map((address, key) => (
                    <div key={key} className="address-list-radio">
                      <label className="address-list-label mb-3">
                        <input
                          // defaultChecked={key === 0}
                          className="input-type"
                          type="radio"
                          name="option"
                          value={JSON.stringify({
                            address: address.address,
                            city: address.city,
                            state: address.state,
                            country: address.country,
                            pinCode: address.pinCode,
                            phoneNo: address.phoneNo,
                          })}
                          onChange={handleOptionChange}
                        />
                        <div className="address-info">
                          <p>
                            <span style={{ fontWeight: "700" }}>Address:</span>
                            {address.address} <br />
                            <span style={{ fontWeight: "700" }}>City:</span>
                            {address.city}{" "}
                            <span style={{ fontWeight: "700" }}>State:</span>
                            {address.state}{" "}
                            <span style={{ fontWeight: "700" }}>Country:</span>
                            {address.country}{" "}
                            <span style={{ fontWeight: "700" }}>Pincode:</span>{" "}
                            {address.pinCode}{" "}
                            <span style={{ fontWeight: "700" }}>Phone:</span>{" "}
                            {address.phoneNo}
                          </p>
                        </div>
                      </label>
                      <i
                        className="fa-solid fa-trash delete-address-btn"
                        onClick={() => deleteAddress(address._id)}
                      ></i>
                    </div>
                  ))}
                  {/* <p>{selectedOption}</p> */}
                  <Button variant="contained" onClick={toggleAddressForm}>
                    {showForm ? "Cancel" : "+ Add a new address"}
                  </Button>
                  {showForm && (
                    // <Form
                    //   style={{ marginTop: "20px" }}
                    //   onSubmit={handleSubmit(onSubmit, onError)}
                    // >
                    //   <div className="row">
                    //     <div className="col-md-6">
                    //       <FloatingLabel
                    //         controlId="floatingTextarea2"
                    //         label="Address"
                    //       >
                    //         <Form.Control
                    //           as="textarea"
                    //           placeholder="Address"
                    //           style={{ height: "85px" }}
                    //           name="address"
                    //           {...register("address")}
                    //         />
                    //         <p className="error-message">
                    //           {errors.address?.message}
                    //         </p>
                    //       </FloatingLabel>

                    //       <Form.Group
                    //         className="mb-3"
                    //         controlId="formBasicEmail"
                    //       >
                    //         <Form.Label>State</Form.Label>
                    //         <Form.Control
                    //           type="text"
                    //           placeholder="Enter state"
                    //           name="state"
                    //           {...register("state")}
                    //         />
                    //         <p className="error-message">
                    //           {errors.state?.message}
                    //         </p>
                    //       </Form.Group>

                    //       <Form.Group
                    //         className="mb-3"
                    //         controlId="formBasicEmail"
                    //       >
                    //         <Form.Label>Pincode</Form.Label>
                    //         <Form.Control
                    //           type="number"
                    //           placeholder="Enter pincode"
                    //           name="pinCode"
                    //           {...register("pinCode")}
                    //         />
                    //         <p className="error-message">
                    //           {errors.pinCode?.message}
                    //         </p>
                    //       </Form.Group>
                    //     </div>
                    //     <div className="col-md-6">
                    //       <Form.Group
                    //         className="mb-3"
                    //         controlId="formBasicPassword"
                    //       >
                    //         <Form.Label>City</Form.Label>
                    //         <Form.Control
                    //           type="text"
                    //           placeholder="Enter city"
                    //           name="city"
                    //           {...register("city")}
                    //         />
                    //         <p className="error-message">
                    //           {errors.city?.message}
                    //         </p>
                    //       </Form.Group>

                    //       <Form.Group
                    //         className="mb-3"
                    //         controlId="formBasicEmail"
                    //       >
                    //         <Form.Label>Country</Form.Label>
                    //         <Form.Control
                    //           type="text"
                    //           placeholder="Enter country"
                    //           name="country"
                    //           {...register("country")}
                    //         />
                    //         <p className="error-message">
                    //           {errors.country?.message}
                    //         </p>
                    //       </Form.Group>

                    //       <Form.Group
                    //         className="mb-3"
                    //         controlId="formBasicEmail"
                    //       >
                    //         <Form.Label>Phone no.</Form.Label>
                    //         <Form.Control
                    //           type="number"
                    //           placeholder="Enter phone"
                    //           name="phoneNo"
                    //           {...register("phoneNo")}
                    //         />
                    //         <p className="error-message">
                    //           {errors.phoneNo?.message}
                    //         </p>
                    //       </Form.Group>
                    //     </div>
                    //   </div>
                    //   <Button type="submit" variant="contained" color="success">
                    //     Add
                    //   </Button>
                    // </Form>
                    <Box
                      component="form"
                      onSubmit={handleSubmit(onSubmit, onError)}
                      sx={{
                        marginTop: "20px",
                        padding: "20px",
                        borderRadius: "8px",
                        backgroundColor: "#f4f4f8",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Grid container spacing={3}>
                        {/* Left Column */}
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="Address"
                            multiline
                            rows={4}
                            placeholder="Enter your address"
                            fullWidth
                            size="small"
                            variant="outlined"
                            {...register("address")}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                          />
                          <TextField
                            label="State"
                            placeholder="Enter state"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            size="small"
                            {...register("state")}
                            error={!!errors.state}
                            helperText={errors.state?.message}
                          />
                          <TextField
                            label="Pincode"
                            placeholder="Enter pincode"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            type="number"
                            size="small"
                            {...register("pinCode")}
                            error={!!errors.pinCode}
                            helperText={errors.pinCode?.message}
                          />
                        </Grid>

                        {/* Right Column */}
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="City"
                            placeholder="Enter city"
                            fullWidth
                            variant="outlined"
                            size="small"
                            {...register("city")}
                            error={!!errors.city}
                            helperText={errors.city?.message}
                          />
                          <TextField
                            label="Country"
                            placeholder="Enter country"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            size="small"
                            {...register("country")}
                            error={!!errors.country}
                            helperText={errors.country?.message}
                          />
                          <TextField
                            label="Phone Number"
                            placeholder="Enter phone number"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            type="number"
                            size="small"
                            {...register("phoneNo")}
                            error={!!errors.phoneNo}
                            helperText={errors.phoneNo?.message}
                          />
                        </Grid>
                      </Grid>

                      <Box mt={3} textAlign="center">
                        <Button
                          type="submit"
                          variant="contained"
                          color="success"
                        >
                          Add
                        </Button>
                      </Box>
                    </Box>
                  )}
                </div>
              </div>
              <div className="orderSummary">
                <div
                  className="orderSummary-head"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <i className="fa-solid fa-circle"></i>
                    <p className="orderSummary-text">ORDER SUMMARY</p>
                  </div>
                  <Link to="/user/cart">
                    <Button variant="contained" color="success">
                      Go to Cart
                    </Button>
                  </Link>
                </div>

                <div className="orderSummary-list">
                  <div className="row">
                    {userData.user?.cart.map((item, key) => (
                      <div key={key} className="col-md-6 orderSummary-products">
                        <img src={item.productId.image[0].url} />
                        <div>
                          <p className="orderSummary-product-name">
                            {item.productId.name}
                          </p>
                          <p className="orderSummary-product-quantity">
                            x{item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={5}>
              <div className="cart-items-checkout">
                <p className="delivery-date">
                  Delivery date: {data.formattedDate}
                </p>
                <div className="subtotal">
                  <div className="discount">
                    <p>Price ({data.cartLength} items)</p>
                    <p>₹ {data.cartItemstotalPrice}</p>
                  </div>
                  <div className="delivery">
                    <p>Delivery Charge</p>
                    <p style={{ color: "green" }}>free</p>
                  </div>
                </div>
                <div className="total">
                  <p>Total Payable</p>
                  <p>₹ {data.cartItemstotalPrice}</p>
                </div>
                <div className="checkout-shopping">
                  <button
                    onClick={checkoutHandler}
                    // disabled={!userData?.user?.shippingAddress.length}
                    disabled={
                      !isChecked || !userData?.user?.shippingAddress.length
                    }
                    className="checkout"
                  >
                    Proceed to Pay
                  </button>
                  {/* <div className="shopping">Continue Shopping</div> */}
                </div>
              </div>
              {/* {!userData?.user?.shippingAddress.length && ( */}
              {!isChecked || !userData?.user?.shippingAddress.length ? (
                <p className="address-alert-msg">
                  <i className="fa-solid fa-circle-exclamation"></i> Select a
                  delivery address
                </p>
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
