import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Collapse,
  Grid,
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
import ProductCard from "../ProductCard";

/*Aditya Mhatre | 46104007 / Ankit Singh*/
const Wishlist = () => {
  const customerId = useSelector((state) => state.user.userID);
  const token = useSelector((state) => state.token);
  const [data, setData] = useState([]);

  var config1 = {
    method: "get",
    url: `https://localhost:44306/api/Product/`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers":
        "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
      Authorization: `Bearer ${token}`,
    },
  };
  var config2 = {
    method: "get",
    url: `https://localhost:44306/api/Wishlist/${customerId}`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers":
        "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    axios(config2).then((resp) => {
      const wishes = resp.data.map((wish) => wish.productId);
      axios(config1).then((products) =>
        setData(
          products.data.filter((item) => {
            return wishes.includes(item.productId) && item;
          })
        )
      );
    });

    console.log(data);
  }, []);

  return (
    <>
      <Typography fontWeight="bold" sx={{ px: 3, py: 1 }} variant="h6">
        Wishes
      </Typography>
      <Grid container spacing={2}>
        {data.map((product) => (
          <Grid key={product.productId} item xs={12} sm={6} md={3}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Wishlist;
