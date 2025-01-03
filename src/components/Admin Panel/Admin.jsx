import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { Orders } from "./Orders";
import { Products } from "./Products";

import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./Admin.css";
import { Customers } from "./Customers";
import { AddProduct } from "./AddProduct";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//   },
//   button: {
//     margin: theme.spacing(1),
//   },
//   revenue: {
//     backgroundColor: "green",
//   },
// }));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export const Admin = () => {
  const classes = useStyles();
  const [allOrders, setAllOrders] = useState([]);
  const [allProducts, setAllProducts] = useState(null);
  const [allCustomers, setAllCustomers] = useState(null);

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    const ordersFetch = async () => {
      const res = await fetch(
        "https://ecommercetechv.onrender.com/admin/allorders",
        {
          headers: {
            authorization: `Abhi ${localStorage.getItem("token")}`,
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setAllOrders(data.orders);
    };
    ordersFetch();

    const productsFetch = async () => {
      const res = await fetch("https://ecommercetechv.onrender.com/products", {
        headers: {
          authorization: `Abhi ${localStorage.getItem("token")}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setAllProducts(data);
    };
    productsFetch();

    const userFetch = async () => {
      const res = await fetch(
        "https://ecommercetechv.onrender.com/admin/users",
        {
          headers: {
            authorization: `Abhi ${localStorage.getItem("token")}`,
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setAllCustomers(data);
    };
    userFetch();
  }, []);
  const totalAmount = allOrders.reduce(
    (sum, product) => sum + product.amount,
    0
  );

  return (
    <div className={{ flexGrow: 1 }("container")} id="admin-dashboard">
      <Grid container spacing={3}>
        {/* <Grid item xs={12}>
          <Paper id="dashboard-head" className={classes.paper}>
            <Typography variant="h3" gutterBottom>
              Dashboard
            </Typography>
          </Paper>
        </Grid> */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper id="orders-count">
            <Typography variant="h6" gutterBottom>
              Orders
            </Typography>
            <Typography variant="h4">{allOrders.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper id="products-count">
            <Typography variant="h6" gutterBottom>
              Products
            </Typography>
            <Typography variant="h4">
              {allProducts?.totalNumberOfProducts}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper id="customers-count">
            <Typography variant="h6" gutterBottom>
              Customers
            </Typography>
            <Typography variant="h4">{allCustomers?.numberOfUSers}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper id="revenue-count">
            <Typography variant="h6" gutterBottom>
              Revenue
            </Typography>
            <Typography variant="h4">
              ₹
              {new Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 3,
              }).format(totalAmount)}
            </Typography>
          </Paper>
        </Grid>
        <AddProduct />
        <Box
          sx={{
            bgcolor: "background.paper",
            width: "100%",
            height: "80vh",
            overflow: "scroll",
          }}
        >
          <AppBar position="sticky">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Orders" {...a11yProps(0)} />
              <Tab label="Products" {...a11yProps(1)} />
              <Tab label="Customers" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          {/* <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          > */}
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Orders orders={allOrders} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Products products={allProducts?.products} />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Customers customers={allCustomers} />
          </TabPanel>
          {/* </SwipeableViews> */}
        </Box>
      </Grid>
    </div>
  );
};

// import React from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// export const Admin = () => {
//   const schema = yup.object().shape({
//     name: yup.string().required("*product name is required"),
//     price: yup.number("*price must be a number").required("*price is required"),
//     description: yup
//       .string()
//       .min(10, "*description must be atleast 10 characters")
//       .max(50, "*description must not exceed 50 characters")
//       .required("*description is required"),
//     category: yup.string().required("*category is required"),
//     image: yup.mixed().required("*image(s) is required"),
//   });
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data) => {
//     console.log(data);
//     try {
//       const res = await fetch(
//         "https://rose-doubtful-moth.cyclic.app/admin/product/new",
//         {
//           method: "POST",
//           headers: {
//             Accept: "application/json, text/plain, */*",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name: data.name,
//             email: data.email,
//             password: data.password,
//           }),
//         }
//       );
//       console.log(res);
//       const resp = await res.json();
//       console.log(resp);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   const onError = () => {
//     console.log("Error");
//   };

//   return (
//     <>
//       <Form
//         onSubmit={handleSubmit(onSubmit, onError)}
//         className="container w-50 mt-5"
//       >
//         <h1>Admin Panel (CREATE PRODUCT)</h1>
//         <Form.Group className="mb-3" controlId="formBasicName">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter product name"
//             name="name"
//             {...register("name")}
//           />
//           <p className="error-message">{errors.name?.message}</p>
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formBasicPrice">
//           <Form.Label>Price</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="Enter product price"
//             name="price"
//             {...register("price")}
//           />
//           <p className="error-message">{errors.price?.message}</p>
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formBasicDescription">
//           <Form.Label>Description</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter product description"
//             name="description"
//             {...register("description")}
//           />
//           <p className="error-message">{errors.description?.message}</p>
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formBasicPrice">
//           <Form.Label>Category</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter product category"
//             name="category"
//             {...register("category")}
//           />
//           <p className="error-message">{errors.category?.message}</p>
//         </Form.Group>
//         <Form.Group controlId="formFileMultiple" className="mb-3">
//           <Form.Label>Upload Image(s)</Form.Label>
//           <Form.Control
//             type="file"
//             multiple
//             name="image"
//             {...register("image")}
//           />
//           <p className="error-message">{errors.image?.message}</p>
//         </Form.Group>
//         <Button variant="success" type="submit">
//           Upload
//         </Button>
//       </Form>
//     </>
//   );
// };
