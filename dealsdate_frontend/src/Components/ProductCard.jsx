import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

/*Aditya Mhatre | 46104007*/
const ProductCard = (product) => {
  return (
    <>
      <NavLink
        style={{ textDecoration: "none" }}
        to={`/Products/${product.productId}`}
      >
        <Card>
          {product.productImageLink && (
            <CardMedia
              component="img"
              src={`${JSON.parse(product.productImageLink)[0].base64}`}
            />
          )}
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {product.productName}
            </Typography>
            <Typography
              sx={{
                textDecoration: "line-through",
                display: "inline",
                fontWeight: "bold",
              }}
              variant="h5"
              color="text.secondary"
            >
              {`\u20B9 ${product.productMRP}`}
            </Typography>{" "}
            <Typography
              sx={{ display: "inline", fontWeight: "bold" }}
              variant="h5"
              color="text.primary"
            >
              {` \u20B9 ${product.productPrice}`}
            </Typography>
          </CardContent>
        </Card>
      </NavLink>
    </>
  );
};

export default ProductCard;
