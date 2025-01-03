import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { OrderItems } from "./OrderItems";
import { Status } from "./Status";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  minHeight: "300px",
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

export const Orders = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell align="right">Customer UserName</StyledTableCell>
            <StyledTableCell align="right">Customer Email</StyledTableCell>
            <StyledTableCell align="right">Payment</StyledTableCell>
            <StyledTableCell align="right">Items</StyledTableCell>
            <StyledTableCell align="right">Total Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.orders?.map((order, key) => (
            <StyledTableRow key={key}>
              <StyledTableCell component="th" scope="row">
                <Status status={order.status} orderId={order._id} />
              </StyledTableCell>
              <StyledTableCell align="right">
                {order.buyer.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                {order.buyer.email}
              </StyledTableCell>
              <StyledTableCell align="right">Done</StyledTableCell>
              <StyledTableCell align="right">
                {/* {console.log("asas", order.products)} */}
                <OrderItems items={order.products} />
              </StyledTableCell>
              <StyledTableCell align="right">₹ {order.amount}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
