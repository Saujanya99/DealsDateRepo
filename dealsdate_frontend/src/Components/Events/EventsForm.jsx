import { Grid, TextField, Select, List, ListItem, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { useForm, Form } from "../Events/useForm";
import Input from "../Events/Input";
import {
  FormControl,
  Button,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

const initialFValues = {
  eventTitle: "",
  eventType: "",
  eventDate: "",
};

const useStyle = makeStyles((theme) => ({
  root: {
    paddingLeft: "3.5%",
    textAlign: "left",
    fontSize: "20px",
    fontWeight: "600",
  },
  btn: {
    width: "30%",
    padding: "100px",
    left: "50%",
    right: "50%",
    marginTop: "50px",
    margin: useTheme().spacing(20),
  },
  items: {
    borderStyle: "groove",
    backgroundColor: "#F8F8F8",
  },
  bttn: {
    marginLeft: "7px",
    borderRadius: "50%",

    cursor: "pointer",
  },
}));

export default function EventsForm() {
  const { values, setValues, handleInputChange } = useForm(initialFValues);
  const [data, setData] = useState([]);
  const classes = useStyle();
  const token = useSelector((state) => state.token);
  const customerId = useSelector((state) => state.user.userID);

  useEffect(() => {
    var config = {
      method: "get",
      url: `https://localhost:44306/api/Event/${customerId}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
          "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config).then((resp) => setData(resp.data));
  }, []);

  const handleDeleteEvent = (e) => {
    var config = {
      method: "delete",
      url: `https://localhost:44306/api/Event/${parseInt(
        e.target.parentNode.id
      )}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
          "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config).then((resp) => {
      const tmp = data.filter(
        (x) => x.eventId !== parseInt(e.target.parentNode.id)
      );
      setData(tmp);
    });
  };

  const handleCreateEvent = () => {
    var config = {
      method: "post",
      url: `https://localhost:44306/api/Event`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
          "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
        Authorization: `Bearer ${token}`,
      },
      data: {
        customerId: customerId,
        eventName: values.eventTitle,
        eventCategory: values.eventType,
        eventDate: values.eventDate,
      },
    };

    axios(config).then((resp) => {
      const tmp1 = [...data, resp.data];
      setData(tmp1);
    });
  };

  return (
    <div>
      <Form>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              name="eventTitle"
              label="Event Title"
              value={values.eventTitle}
              onChange={handleInputChange}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="eventType"
                value={values.eventType}
                label="Event Type"
                onChange={handleInputChange}
              >
                <MenuItem value={"Birthday"}>Birthday</MenuItem>
                <MenuItem value={"Anniversary"}>Anniversary</MenuItem>
                <MenuItem value={"Holidays"}>Holidays</MenuItem>
                <MenuItem value={"Others"}>Others</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="date"
              label="Event Date"
              type="date"
              name="eventDate"
              value={values.eventDate}
              onChange={handleInputChange}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant="contained"
              sx={{ mt: 10 }}
              onClick={handleCreateEvent}
            >
              Create
            </Button>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </Form>
      <p className={classes.root}>MY EVENTS</p>
      <List sx={{ width: "100%", maxWidth: 800 }}>
        {data.map((data) => {
          return (
            <ListItem
              id={data.eventId}
              key={data.eventId}
              className={classes.items}
            >
              <ListItemText
                primary={data.eventName}
                secondary={
                  <div>
                    <div>{data.eventCategory}</div>
                    <div>{data.eventDate}</div>
                  </div>
                }
              />
              <Button variant="contained">Shop for gifts</Button>
              <button className={classes.bttn} onClick={handleDeleteEvent}>
                X
              </button>
            </ListItem>
          );
        })}
        <br />
      </List>
    </div>
  );
}
