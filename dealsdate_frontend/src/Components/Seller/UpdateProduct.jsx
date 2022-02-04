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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FileBase64 from "react-file-base64";

const UpdateProduct = ({ productId }) => {
  const sellerId = useSelector((state) => state.user.userID);
  const token = useSelector((state) => state.token);
  const [product, setProduct] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productMRP, setProductMRP] = useState("");
  const [productCategory, setProductCategory] = useState("Other");
  const [productImage, setProductImage] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get(`https://localhost:44306/api/Product/${productId}`)
      .then((resp) => {
        setProduct(resp.data);
        setProductName(resp.data.productName);
        setProductDescription(resp.data.productDescription);
        setProductPrice(resp.data.productPrice);
        setProductMRP(resp.data.productMRP);
        setProductCategory(resp.data.productCategory);
        setProductImage(resp.data.productImage);
      });
    console.log(product);
  }, []);

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
        method: "put",
        url: `https://localhost:44306/api/Product`,
        data: {
          productId: productId,
          productName: productName,
          productDescription: productDescription,
          productPrice: productPrice,
          productMRP: productMRP,
          productCategory: productCategory,
          productImageLink: productImage
            ? productImage
            : product.productImageLink,
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
          if (resp.status === 200) {
            setMsg("Product Updated Succesfully");
            setStatus("success");
          } else {
            setMsg("Product Not Updated");
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
          Update Product
        </Typography>
        <Box px={3}>
          <TextField
            fullWidth
            margin="normal"
            label="Product ID"
            variant="outlined"
            value={productId}
            disabled
          />
          <TextField
            fullWidth
            margin="normal"
            label="Product Name"
            variant="outlined"
            value={productName}
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
            value={productDescription}
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
            value={productPrice}
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
            value={productMRP}
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
            Update Product
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

export default UpdateProduct;
