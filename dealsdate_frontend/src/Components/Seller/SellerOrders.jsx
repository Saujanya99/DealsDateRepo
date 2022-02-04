import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Button,
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

const SellerOrders = () => {
  const sellerId = useSelector((state) => state.user.userID);
  const token = useSelector((state) => state.token);
  const [data, setData] = useState([]);

  var config = {
    method: "get",
    url: `https://localhost:44306/api/Order/BySeller/${sellerId}`,
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

  const handleUpdate = (order) => {
    var config = {
      method: "put",
      url: "https://localhost:44306/api/Order",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
          "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
        Authorization: `Bearer ${token}`,
      },
      data: {
        orderId: order.orderId,
        productId: order.deliveryStatusproductId,
        customerId: order.customerId,
        customerAddress: order.customerAddress,
        productName: order.productName,
        productPrice: order.productPrice,
        sellerId: order.sellerId,
        deliveryStatus: "Delivered",
        productQuantity: order.productQuantity,
        totalCost: order.totalCost,
      },
    };
    axios(config).then((resp) => {
      console.log(resp.status);
    });
  };

  const Row = (order) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell>{order.orderId}</TableCell>
          <TableCell>{order.productId}</TableCell>
          <TableCell>{order.customerId}</TableCell>
          <TableCell>{order.productName}</TableCell>
          <TableCell>{order.productPrice}</TableCell>
          <TableCell>{order.productQuantity}</TableCell>
          <TableCell>{order.totalCost}</TableCell>
          <TableCell>{order.deliveryStatus}</TableCell>
          <TableCell>
            {order.deliveryStatus !== "Delivered" && (
              <>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleUpdate(order)}
                >
                  Delivered?
                </Button>
              </>
            )}
          </TableCell>
        </TableRow>
      </>
    );
  };

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
                <TableCell>Customer ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Product Price</TableCell>
                <TableCell>Product Quantity</TableCell>
                <TableCell>Total Cost</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((order) => (
                <Row key={order.orderId} {...order} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default SellerOrders;
