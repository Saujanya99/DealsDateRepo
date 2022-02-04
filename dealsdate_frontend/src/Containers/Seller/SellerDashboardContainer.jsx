import { AddBox, ChevronRight, ShoppingCart } from "@mui/icons-material";
import {
  Drawer,
  List,
  Box,
  ListItemIcon,
  ListItemText,
  Toolbar,
  ListItemButton,
  Typography,
  Divider,
} from "@mui/material";
import { Navigate, Route, Routes } from "react-router";
import AddProduct from "../../Components/Seller/AddProduct";
import SellerProducts from "../../Components/Seller/SellerProducts";
import SellerOrders from "../../Components/Seller/SellerOrders";
import { NavLink } from "react-router-dom";

/*Aditya Mhatre | 46104007*/
const SellerDashboardContainer = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
          }}
        >
          <Toolbar />
          <Typography
            fontWeight="bold"
            sx={{ px: 2, pt: 3, pb: 1 }}
            variant="p"
          >
            Dashboard
          </Typography>
          <Divider />
          <Box sx={{ overflow: "auto" }}>
            <List>{mainListItem}</List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/Products" element={<SellerProducts />} />
            <Route path="/Orders" element={<SellerOrders />} />
            <Route index element={<Navigate to="Products" />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

const mainListItem = (
  <div>
    <ListItemButton component={NavLink} to="AddProduct">
      <ListItemIcon>
        <AddBox />
      </ListItemIcon>
      <ListItemText primary="Add Product" />
    </ListItemButton>
    <ListItemButton component={NavLink} to="Products">
      <ListItemIcon>
        <AddBox />
      </ListItemIcon>
      <ListItemText primary="View Products" />
    </ListItemButton>
    <ListItemButton component={NavLink} to="Orders">
      <ListItemIcon>
        <ShoppingCart />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
  </div>
);

export default SellerDashboardContainer;
