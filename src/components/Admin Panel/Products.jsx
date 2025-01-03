import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StarRating from "../ProductDetails/StarRating";
// import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { EditProduct } from "./EditProduct";

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

export const Products = (props) => {
  const [cookies, setCookie] = useCookies(["userId", "token"]);

  const deleteProduct = async (id) => {
    const res = await fetch(
      `https://ecommercetechv.onrender.com/admin/product/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Abhi ${
            localStorage.getItem("token") || cookies.token
          }`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          // "Content-Type": "multipart/form-data",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    window.location.reload();
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product ID</StyledTableCell>
            <StyledTableCell align="left">Image</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Price&nbsp;(₹)</StyledTableCell>
            <StyledTableCell align="left">Ratings</StyledTableCell>
            <StyledTableCell align="left">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.products?.map((product, key) => (
            <StyledTableRow key={key}>
              <StyledTableCell>{product._id}</StyledTableCell>
              <StyledTableCell align="left">
                <img src={product.image[0].url} style={{ width: "100px" }} />
              </StyledTableCell>
              <StyledTableCell align="left">{product.name}</StyledTableCell>
              <StyledTableCell align="left">
                {new Intl.NumberFormat("en-IN", {
                  maximumSignificantDigits: 3,
                }).format(product.price)}
              </StyledTableCell>
              <StyledTableCell align="left">
                <StarRating rating={product.rating} />
              </StyledTableCell>
              <StyledTableCell align="left">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    deleteProduct(product._id);
                  }}
                >
                  Delete
                </Button>
                <EditProduct product={product} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
