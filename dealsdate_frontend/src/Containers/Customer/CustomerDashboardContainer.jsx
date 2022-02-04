import { AddBox, Book, CalendarToday, ShoppingBag, ShoppingCart } from "@mui/icons-material";
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
  Avatar,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import { NavLink } from "react-router-dom";
import AddressComponent from "../../Components/Customer/Address";
import Events from "../../Components/Customer/Events";
import Orders from "../../Components/Customer/Orders";
import Wishlist from "../../Components/Customer/Wishlist";

/*Aditya Mhatre | 46104007*/
const CustomerDashboardContainer = () => {
  const profile = useSelector((state) => state.user);

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
          <Box
            className="d-flex flex-column align-items-center"
            sx={{ p: 3, pt: 4 }}
          >
            <Avatar sx={{ width: 75, height: 75 }} src={profile.userPicture} />
            <Typography fontWeight="bold" variant="h6" sx={{ pt: 1 }}>
              {profile.userName}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ overflow: "auto" }}>
            <List>{mainListItem}</List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/Address" element={<AddressComponent />} />
            <Route path="/Events" element={<Events />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            <Route index element={<Navigate to="Address" />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

const mainListItem = (
  <div>
    <ListItemButton component={NavLink} to="Address">
      <ListItemIcon>
        <Book />
      </ListItemIcon>
      <ListItemText primary="Addresses" />
    </ListItemButton>
    <ListItemButton component={NavLink} to="Wishlist">
      <ListItemIcon>
        <ShoppingBag />
      </ListItemIcon>
      <ListItemText primary="Wishlist" />
    </ListItemButton>
    <ListItemButton component={NavLink} to="Events">
      <ListItemIcon>
        <CalendarToday />
      </ListItemIcon>
      <ListItemText primary="Events" />
    </ListItemButton>
    <ListItemButton component={NavLink} to="Orders">
      <ListItemIcon>
        <ShoppingCart />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
  </div>
);

export default CustomerDashboardContainer;
