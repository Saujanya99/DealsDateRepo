import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

/*Aditya Mhatre | 46104007 / Ankit Singh*/
const Orders = () => {
  const customerId = useSelector((state) => state.user.userID);
  const token = useSelector((state) => state.token);
  const [data, setData] = useState([]);

  var config = {
    method: "get",
    url: `https://localhost:44306/api/Order/ByCustomer/${customerId}`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers":
        "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    axios(config).then((resp) => setData(resp.data));
    console.log(data);
  }, []);

  return (
    <>
      <Typography fontWeight="bold" sx={{ px: 3, py: 1 }} variant="h6">
        Orders
      </Typography>
      <Box px={3}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Product ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Product Price</TableCell>
                <TableCell>Product Quantity</TableCell>
                <TableCell>Total Cost</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((order) => (
                <Row {...order} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

const Row = (order) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell>{order.orderId}</TableCell>
        <TableCell>{order.productId}</TableCell>
        <TableCell>{order.productName}</TableCell>
        <TableCell>{order.productPrice}</TableCell>
        <TableCell>{order.productQuantity}</TableCell>
        <TableCell>{order.totalCost}</TableCell>
        <TableCell>{order.deliveryStatus}</TableCell>
      </TableRow>
    </>
  );
};

export default Orders;
