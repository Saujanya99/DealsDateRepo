import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  ImageList,
  ImageListItem,
  Modal,
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
import UpdateProduct from "./UpdateProduct";

const SellerProducts = () => {
  const sellerId = useSelector((state) => state.user.userID);
  const token = useSelector((state) => state.token);
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(0);

  var config = {
    method: "get",
    url: `https://localhost:44306/api/Product/BySeller/${sellerId}`,
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

  const Row = (product) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell>{product.productId}</TableCell>
          <TableCell>{product.productName}</TableCell>
          <TableCell>{product.productCategory}</TableCell>
          <TableCell>{product.productPrice}</TableCell>
          <TableCell>{product.productMRP}</TableCell>
          <TableCell>{0}</TableCell>
          <TableCell>
            <Button
              variant="contained"
              onClick={() => {
                setCurrentProduct(product.productId);
                setModalOpen(!open);
              }}
            >
              Edit
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Description
                </Typography>
                <Typography paragraph>{product.productDescription}</Typography>
                <Typography variant="h6" gutterBottom component="div">
                  Images
                </Typography>
                <ImageList cols={4}>
                  {JSON.parse(product.productImageLink).map((image) => (
                    <ImageListItem key={image.name}>
                      <img
                        width={250}
                        src={`${image.base64}`}
                        alt={`${image.name}`}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <>
      <Typography fontWeight="bold" sx={{ px: 3, py: 1 }} variant="h6">
        Products
      </Typography>
      <Box px={3}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Product ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Product Category</TableCell>
                <TableCell>Product Price</TableCell>
                <TableCell>Product MRP</TableCell>
                <TableCell>Product Sells</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((product) => (
                <Row {...product} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <UpdateProduct productId={currentProduct} />
        </Box>
      </Modal>
    </>
  );
};

export default SellerProducts;
