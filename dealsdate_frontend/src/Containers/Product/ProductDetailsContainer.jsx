import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";

/*Aditya Mhatre | 46104007*/
const ProductDetailsContainer = () => {
  const customerId = useSelector((state) => state.user.userID);
  const token = useSelector((state) => state.token);
  const pId = useParams().productId;
  console.log(pId);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [wishes, setWishes] = useState([]);
  const [productCount, setProductCount] = useState(1);
  const [addresses, setAddresses] = useState([]);
  const [addressValue, setAddressValue] = useState("");

  useEffect(() => {
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
    axios(config2).then((resp) => {
      const wishes = resp.data.map((wish) => wish.productId);
      setWishes(wishes);
      setWishlist(resp.data);
    });

    axios.get(`https://localhost:44306/api/Product/${pId}`).then((resp) => {
      setProduct(resp.data);
    });
    console.log(product);

    var config = {
      method: "get",
      url: `https://localhost:44306/api/Address/ByCustomer/${customerId}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
          "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config).then((resp) => setAddresses(resp.data));
  }, []);

  const handleBuy = () => {
    var config = {
      method: "post",
      url: `https://localhost:44306/api/Order`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
          "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
        Authorization: `Bearer ${token}`,
      },
      data: {
        productId: product.productId,
        customerId: customerId,
        customerAddress: addressValue,
        productName: product.productName,
        productPrice: product.productPrice,
        sellerId: product.sellerId,
        deliveryStatus: "Pending",
        productQuantity: productCount,
        totalCost: product.productPrice * productCount,
      },
    };
    axios(config).then((resp) => console.log(resp.data));
    setOpen(!open);
  };

  const handleRemoveWishEvent = () => {
    console.log(`Wish: ${wishlist}`);
    const wishlistId = wishlist.filter(
      (wish) => wish.productId === product.productId
    )[0].wishListProductId;
    var config = {
      method: "delete",
      url: `https://localhost:44306/api/Wishlist/${wishlistId}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
          "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config).then((resp) => {
      const tmp1 = wishlist.filter((x) => x.productId !== product.productId);
      const tmp2 = wishes.filter((x) => x !== product.productId);
      setWishlist(tmp1);
      setWishes(tmp2);
    });
  };

  const handleAddWishEvent = () => {
    var config = {
      method: "post",
      url: `https://localhost:44306/api/Wishlist`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
          "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
        Authorization: `Bearer ${token}`,
      },
      data: {
        productId: product.productId,
        customerId: customerId,
      },
    };

    axios(config).then((resp) => {
      console.log(resp);
      const tmp1 = [...wishlist, resp.data];
      const tmp2 = [...wishes, product.productId];
      console.log(tmp1);
      setWishlist(tmp1);
      setWishes(tmp2);
    });
  };

  return (
    <>
      <Container sx={{ padding: "24px" }}>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <Card sx={{ boxShadow: "none", bgColor: "transparent" }}>
              <Carousel fullHeightHover>
                {product.productImageLink &&
                  JSON.parse(product.productImageLink).map((image) => (
                    <CardMedia
                      component="img"
                      src={`${image.base64}`}
                      alt={`${image.name}`}
                    />
                  ))}
              </Carousel>
            </Card>
          </Grid>
          <Grid item sm={6}>
            <Card sx={{ boxShadow: "none", bgColor: "transparent" }}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {product.productName}
                </Typography>
                <Typography display="inline" variant="h4" fontWeight="bold">
                  {` \u20B9 ${product.productPrice}    `}
                </Typography>
                <Typography
                  display="inline"
                  variant="h5"
                  color="text.secondary"
                  fontWeight="bold"
                  sx={{ textDecoration: "line-through" }}
                >
                  {` \u20B9 ${product.productMRP}`}
                </Typography>
              </CardContent>
              {customerId !== undefined ? (
                <>
                  <Select
                    margin="normal"
                    fullWidth
                    value={productCount}
                    variant="outlined"
                    label="Product Quantity"
                    onChange={(e) => setProductCount(e.target.value)}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                  <CardActions>
                    <>
                      <Button
                        color="primary"
                        size="large"
                        variant="contained"
                        onClick={() => setOpen(true)}
                        startIcon={<ShoppingCart />}
                      >
                        Buy Now
                      </Button>
                      {wishes.includes(product.productId) ? (
                        <Button
                          color="primary"
                          size="large"
                          variant="contained"
                          startIcon={<FavoriteBorder />}
                          onClick={handleRemoveWishEvent}
                        >
                          Remove from Wishlist
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          size="large"
                          variant="contained"
                          startIcon={<FavoriteBorder />}
                          onClick={handleAddWishEvent}
                        >
                          Add to Wishlist
                        </Button>
                      )}
                    </>
                  </CardActions>
                </>
              ) : (
                <CardContent>
                  <Typography align="center" fontWeight={"bold"} variant="h6">
                    Login To Buy
                  </Typography>
                </CardContent>
              )}
              <CardContent>
                <Typography align="justify" variant="h6">
                  {product.productDescription}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Select the Address
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                defaultValue="female"
                name="radio-buttons-group"
                value={addressValue}
                onChange={(e) => setAddressValue(e.target.value)}
              >
                {addresses.map((address) => {
                  return (
                    <FormControlLabel
                      value={address.addressDescription}
                      control={<Radio />}
                      label={address.addressDescription}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
            <Button onClick={handleBuy}>Proceed</Button>
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default ProductDetailsContainer;
