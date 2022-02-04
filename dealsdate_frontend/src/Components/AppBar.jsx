import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  Collapse,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  AppBar,
  Avatar,
  Fade,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";

/*Pabita Kumar Malick / Saujanya Waikar*/
const NavBar = ({ auth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, login, logout } = auth;
  const profile = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isSeller = profile.userEmail === "demo@goteck.site" ? true : false;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        component={Navbar}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "white" }}
        className="d-flex"
        light
        expand="md"
        fixed="top"
      >
        <NavbarBrand className="order-md-0">DealsDate</NavbarBrand>
        <div className="order-md-2">
          <IconButton
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar src={profile.userPicture} alt={profile.useName} />
          </IconButton>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            {isAuthenticated() ? (
              <>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </>
            ) : (
              <MenuItem onClick={login}>Login</MenuItem>
            )}
          </Menu>
          <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        </div>
        <Collapse className="order-md-1" isOpen={isOpen} navbar>
          <Nav className="ms-auto d-flex align-items-md-center" navbar>
            <NavItem className="mx-2 py-2">
              <NavLink className="text-decoration-none text-body" to="/">
                Home
              </NavLink>
            </NavItem>
            {!isSeller && (
              <NavItem className="mx-2 py-2">
                <NavLink
                  className="text-decoration-none text-body"
                  to="/Products"
                >
                  Products
                </NavLink>
              </NavItem>
            )}
            {isAuthenticated() &&
              (!isSeller ? (
                <>
                  <NavItem className="mx-2 py-2">
                    <NavLink
                      className="text-decoration-none text-body"
                      to="/Profile"
                    >
                      Profile
                    </NavLink>
                  </NavItem>
                </>
              ) : (
                <NavItem className="mx-2 py-2">
                  <NavLink
                    className="text-decoration-none text-body"
                    to="/Seller"
                  >
                    Dashboard
                  </NavLink>
                </NavItem>
              ))}
          </Nav>
        </Collapse>
      </AppBar>
    </>
  );
};

export default NavBar;
