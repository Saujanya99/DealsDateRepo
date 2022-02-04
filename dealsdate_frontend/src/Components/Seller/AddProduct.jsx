import {
  Alert,
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import FileBase64 from "react-file-base64";

const AddProduct = () => {
  const sellerId = useSelector((state) => state.user.userID);
  const token = useSelector((state) => state.token);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productMRP, setProductMRP] = useState("");
  const [productCategory, setProductCategory] = useState("Other");
  const [productImage, setProductImage] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = () => {
    if (
      productName.match(/^(?!\s*$).+/) === null ||
      productName.match(/^(?!\s*$).+/).length === 0 ||
      productDescription.match(/^(?!\s*$).+/) === null ||
      productDescription.match(/^(?!\s*$).+/).length === 0 ||
      productPrice === 0 ||
      productMRP === 0 ||
      productImage === ""
    ) {
      setMsg("Fill All The Fields");
      setStatus("error");
    } else if (productPrice > productMRP) {
      setMsg("Price Can't Be More than MRP");
      setStatus("error");
    } else {
      var config = {
        method: "post",
        url: `https://localhost:44306/api/Product`,
        data: {
          productName: productName,
          productDescription: productDescription,
          productPrice: productPrice,
          productMRP: productMRP,
          productCategory: productCategory,
          productImageLink: productImage,
          sellerId: sellerId,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
          Authorization: `Bearer ${token}`,
        },
      };
      axios(config)
        .then((resp) => {
          if (resp.status === 201) {
            setMsg("Product Added Succesfully");
            setStatus("success");
          } else {
            setMsg("Product Not Added");
            setStatus("error");
          }
        })
        .then((err) => console.log(err));
    }
  };

  return (
    <>
      <div>
        <Typography fontWeight="bold" sx={{ px: 3, py: 1 }} variant="h6">
          Add Product
        </Typography>
        <Box px={3}>
          <TextField
            fullWidth
            margin="normal"
            label="Product Name"
            variant="outlined"
            onChange={(e) => {
              setMsg("");
              setProductName(e.target.value);
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Product Description"
            variant="outlined"
            onChange={(e) => {
              setMsg("");
              setProductDescription(e.target.value);
            }}
          />
          <Select
            margin="normal"
            fullWidth
            variant="outlined"
            value={productCategory}
            label="Product Category"
            onChange={(e) => {
              setMsg("");
              setProductCategory(e.target.value);
            }}
          >
            <MenuItem value={"Birthday"}>Birthday</MenuItem>
            <MenuItem value={"Anniversary"}>Anniversary</MenuItem>
            <MenuItem value={"Holiday"}>Holiday</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
          <TextField
            sx={{ mr: 2, width: "47.5%" }}
            type="number"
            margin="normal"
            label="Product Price"
            variant="outlined"
            onChange={(e) => {
              setMsg("");
              setProductPrice(e.target.value);
            }}
          />
          <TextField
            sx={{ ml: 2, width: "47.5%" }}
            type="number"
            margin="normal"
            label="Product MRP"
            variant="outlined"
            onChange={(e) => {
              setMsg("");
              setProductMRP(e.target.value);
            }}
          />
          <FileBase64
            multiple={true}
            onDone={(images) => {
              setProductImage(JSON.stringify(images));
            }}
          />
          <Button
            onClick={handleSubmit}
            fullWidth
            size="large"
            sx={{ mt: 2 }}
            variant="contained"
          >
            Add Product
          </Button>
          {msg !== "" && (
            <Alert sx={{ mt: 2 }} severity={status}>
              {msg}
            </Alert>
          )}
        </Box>
      </div>
    </>
  );
};

export default AddProduct;
