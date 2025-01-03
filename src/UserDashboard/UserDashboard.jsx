import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./UserDashboard.css";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TrackOrder } from "./TrackOrder";
import { DeliveryDate } from "./DeliveryDate";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export const UserDashboard = () => {
  const [value, setValue] = React.useState(0);
  const [cookies, setCookie] = useCookies(["userId", "token"]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState(null);

  const [userEmail, setUserEmail] = useState("");
  const [userFristName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const userFetch = async () => {
      const res = await fetch("https://ecommercetechv.onrender.com/user/me", {
        headers: {
          authorization: `Abhi ${
            localStorage.getItem("token") || cookies.token
          }`,
        },
      });
      const data = await res.json();

      setUserFirstName(data.user.firstName);
      setUserLastName(data.user.lastName);
      setUserPhone(data.user.phoneNo);
      setUserEmail(data.user.email);
      setUser(data);
    };
    userFetch();

    const orderFetch = async () => {
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
      setOrders(data.orders);
    };
    orderFetch();
  }, []);

  const handleUserFirstNameChange = (e) => {
    setUserFirstName(e.target.value);
  };
  const handleUserLastNameChange = (e) => {
    setUserLastName(e.target.value);
  };
  const handleUserPhoneChange = (e) => {
    setUserPhone(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://ecommercetechv.onrender.com/user/me",
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
            firstName: userFristName,
            lastName: userLastName,
            phoneNo: userPhone,
          }),
        }
      );
      const data = await response.json();
      console.log("Form submitted successfully:", data);
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div id="userdashboard">
      <div className="user">
        <div>
          <Avatar
            sx={{
              bgcolor: "#fb8500",
              color: "#10002b",
              width: 150,
              height: 150,
              fontSize: "5rem",
            }}
          >
            {user?.user?.name.charAt(0)}
          </Avatar>
          <div className="user-details">
            <Chip label={user?.user?.name} sx={{ fontSize: "1.3rem" }} />
            <div className="email">{user?.user?.email}</div>
            <div className="phone">{user?.user?.phoneNo}</div>
            <Button variant="contained" onClick={handleOpen}>
              Edit profile
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} noValidate autoComplete="off">
                <Typography variant="h6" component="h6">
                  Edit Profile
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={userEmail}
                    sx={{ marginBottom: "10px" }}
                    disabled
                  />
                  <TextField
                    id="outlined-basic"
                    label="First name"
                    variant="outlined"
                    fullWidth
                    name="firstName"
                    value={userFristName}
                    onChange={handleUserFirstNameChange}
                    sx={{ marginBottom: "10px" }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Last name"
                    variant="outlined"
                    fullWidth
                    name="lastName"
                    value={userLastName}
                    onChange={handleUserLastNameChange}
                    sx={{ marginBottom: "10px" }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Phone No"
                    variant="outlined"
                    fullWidth
                    name="phoneNo"
                    value={userPhone}
                    onChange={handleUserPhoneChange}
                    sx={{ marginBottom: "10px" }}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Box>
            </Modal>
          </div>
        </div>
        <h1>DashBoard</h1>
      </div>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 500,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="My Orders" {...a11yProps(0)} />
          {/* <Tab label="In Cart" {...a11yProps(1)} />
          <Tab label="In Wish List" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} /> */}
        </Tabs>
        <TabPanel className="tabpanel" value={value} index={0}>
          {orders?.map((order, key) => (
            <TableContainer
              component={Paper}
              key={key}
              sx={{ marginTop: "10px" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Image</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Quantity</StyledTableCell>
                    <StyledTableCell>Amount</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.products.map((product, key) => (
                    <StyledTableRow key={key}>
                      <StyledTableCell>
                        <img
                          className="order-product-img"
                          src={product.productId.image[0].url}
                        ></img>
                      </StyledTableCell>
                      <StyledTableCell>
                        {product.productId.name}
                      </StyledTableCell>
                      <StyledTableCell>{product.quantity}</StyledTableCell>
                      <StyledTableCell>
                        <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                        {product.quantity * product.productId.price}
                      </StyledTableCell>
                      {/* <StyledTableCell>qqq</StyledTableCell> */}
                    </StyledTableRow>
                  ))}
                  <TableRow sx={{ bgcolor: "#e4d9ff", padding: "1rem" }}>
                    <TableCell sx={{ fontWeight: "600", fontSize: "1rem" }}>
                      <TrackOrder
                        status={order.status}
                        shippingInfo={order.shippingInfo}
                      />
                    </TableCell>
                    <TableCell>
                      {order.status === "Delivered" ? (
                        <Chip label="Delivered" color="success" />
                      ) : (
                        <DeliveryDate deliveryDate={order.deliveryDate} />
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        avatar={
                          <Avatar>
                            <i
                              style={{ fontSize: "1.3rem", color: "green" }}
                              className="fa-solid fa-circle-check"
                            ></i>
                          </Avatar>
                        }
                        label="Paid"
                      />
                    </TableCell>
                    <TableCell>
                      {/* {order.status === "Delivered" ? (
                        <Chip label="Delivered" color="success" />
                      ) : (
                        ""
                      )} */}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ))}
        </TabPanel>
        {/* <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel> */}
      </Box>
    </div>
  );
};
