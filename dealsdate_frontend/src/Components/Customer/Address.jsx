import {Close } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Button,
  Alert,
  CardHeader,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

/*Aditya Mhatre | 46104007*/
const AddressComponent = () => {
  const [addresses, setAddresses] = useState([]);
  const [addressDescription, setAddressDescription] = useState(false);
  const [msg, setMsg] = useState("");

  const token = useSelector((state) => state.token);
  const customerId = useSelector((state) => state.user.userID);

  useEffect(() => {
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

  const handleAddEvent = () => {
    console.log(addressDescription.match(/^(?!\s*$).+/));
    if (
      addressDescription.match(/^(?!\s*$).+/) === null ||
      addressDescription.match(/^(?!\s*$).+/).length === 0
    )
      setMsg("Please Enter Address");
    else {
      setMsg("");
      var config = {
        method: "post",
        url: `https://localhost:44306/api/Address`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
          Authorization: `Bearer ${token}`,
        },
        data: {
          customerId: customerId,
          addressDescription: addressDescription,
        },
      };

      axios(config).then((resp) => {
        const tmp1 = [...addresses, resp.data];
        setAddresses(tmp1);
      });
    }
  };

  const handleDeleteEvent = (e) => {
    const id = parseInt(e.target.id);
    console.log(id);
    var config = {
      method: "delete",
      url: `https://localhost:44306/api/Address/${id}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
          "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
        Authorization: `Bearer ${token}`,
      },
      data: {
        customerId: customerId,
        addressDescription: addressDescription,
      },
    };

    axios(config).then((resp) => {
      const tmp1 = addresses.filter((x) => x.addressId !== id);
      console.log(tmp1);
      setAddresses(tmp1);
    });
  };

  return (
    <>
      <Typography fontWeight="bold" sx={{ px: 3, py: 1 }} variant="h6">
        Addresses
      </Typography>
      <Box className="d-flex flex-column align-items-end" sx={{ p: 4 }}>
        <TextField
          fullWidth
          multiline
          rows={2}
          margin="normal"
          label="Address Description"
          variant="outlined"
          onChange={(e) => {
            setMsg("")
            setAddressDescription(e.target.value)
          }}
        />
        {msg !== "" && <Alert severity="error">{msg}</Alert>}
        <Button
          onClick={handleAddEvent}
          size="large"
          sx={{ mt: 2 }}
          variant="contained"
        >
          Add Address
        </Button>
      </Box>
      <Box px={3}>
        {addresses.map((address) => {
          return (
            <>
              <Card key={address.addressId} variant="outlined" sx={{ mb: 2 }}>
                <CardHeader
                  subheader={address.addressId}
                  action={
                    <IconButton
                      aria-label="settings"
                      className="ms-auto"
                      onClick={handleDeleteEvent}
                    >
                      <Close id={address.addressId} />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Typography variant="body2">
                    {address.addressDescription}
                  </Typography>
                </CardContent>
              </Card>
            </>
          );
        })}
      </Box>
    </>
  );
};

export default AddressComponent;
