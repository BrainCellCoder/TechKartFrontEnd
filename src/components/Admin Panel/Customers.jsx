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

export const Customers = (props) => {
  console.log(props);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Customer ID</StyledTableCell>
            <StyledTableCell align="left">User Name</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            {/* <StyledTableCell align="left">Action</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.customers.users?.map((customer, key) => (
            <StyledTableRow key={key}>
              <StyledTableCell>{customer._id}</StyledTableCell>
              <StyledTableCell align="left">{customer.name}</StyledTableCell>
              <StyledTableCell align="left">{customer.email}</StyledTableCell>
              {/* <StyledTableCell align="left">Delete</StyledTableCell> */}
              {/* <StyledTableCell align="left"></StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
