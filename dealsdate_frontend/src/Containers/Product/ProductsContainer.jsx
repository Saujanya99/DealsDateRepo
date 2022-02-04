import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Switch,
  TextField,
} from "@mui/material";
import ProductCard from "../../Components/ProductCard";
import { useState, useEffect } from "react";
import axios from "axios";

/*Aditya Mhatre | 46104007*/
const ProductContainer = ({ auth }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:44306/api/Product").then((resp) => {
      setData(resp.data);
      setFilteredData(resp.data);
    });
    console.log(data);
  }, []);

  const handleSearch = (e) => {
    if (e.target.value == null) setFilteredData(data);
    else {
      const filtered = data.filter((item) => {
        return item.productName.includes(e.target.value);
      });
      setFilteredData(filtered);
    }
    console.log(filteredData);
  };

  const handleToggle = (value) => () => {
    const newChecked = [...checked];

    if (newChecked.includes(value)) {
      newChecked.splice(newChecked.indexOf(value));
    } else {
      newChecked.push(value);
    }
    setChecked(newChecked);
    if (checked === []) setFilteredData(data);
    else {
      const filtered = data.filter((item) => {
        return item.productCategory.includes(checked);
      });
      setFilteredData(filtered);
    }
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item sm={2}>
          <List>
            {["Birthday", "Anniversary", "Holiday", "Other"].map((text) => (
              <ListItem key={text}>
                <Switch
                  edge="end"
                  onChange={handleToggle(text)}
                  checked={checked.indexOf(text) !== -1}
                  inputProps={{
                    "aria-labelledby": `switch-list-label-${text}`,
                  }}
                />
                <ListItemText
                  id={`checkbox-list-label-${text}`}
                  sx={{ ml: 2 }}
                  primary={text}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid container sm={10} spacing={2} sx={{ p: 5 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Search"
            variant="outlined"
            onChange={handleSearch}
          />
          {filteredData.map((product) => (
            <Grid key={product.productId} item xs={12} sm={6} md={3}>
              <ProductCard {...product} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default ProductContainer;
