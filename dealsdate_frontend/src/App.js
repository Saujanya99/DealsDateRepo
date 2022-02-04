import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Auth from "./Auth/Auth";
import Callback from "./Auth/Callback";
import ProductDetailsContainer from "./Containers/Product/ProductDetailsContainer";
import ProductsContainer from "./Containers/Product/ProductsContainer";
import HomePage from "./Containers/HomePage";
import Navbar from "./Components/AppBar";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import SellerDashboardContainer from "./Containers/Seller/SellerDashboardContainer";
import { Toolbar } from "@mui/material";
import CustomerDashboardContainer from "./Containers/Customer/CustomerDashboardContainer";

function App() {
  let navigate = useNavigate();
  const location = useLocation();
  const auth = new Auth(navigate);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#84d996",
      },
      secondary: {
        main: "#f50057",
      },
      background: "#1a1f35",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Navbar auth={auth} />
      <Toolbar sx={{ p: 5 }} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Products" element={<ProductsContainer />} />
        <Route
          path="/Products/:productId"
          element={<ProductDetailsContainer />}
        />
        <Route
          path="/callback"
          element={<Callback auth={auth} location={location} />}
        />
        {auth.isAuthenticated() && (
          <>
            <Route path="/Seller/*" element={<SellerDashboardContainer />} />
            <Route path="/Profile/*" element={<CustomerDashboardContainer />} />
          </>
        )}
        <Route
          path="*"
          element={
            <div id="wrapper" className="d-flex flex-column justify-content-center align-items-center">
              <img width={500} src="https://i.imgur.com/qIufhof.png" />
              <div id="info">
                <h3>404! This page could not be found</h3>
              </div>
            </div>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
