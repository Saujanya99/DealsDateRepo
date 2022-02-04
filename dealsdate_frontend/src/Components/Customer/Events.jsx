import React from "react";
import EventsForm from "../Events/EventsForm";
import { Box, Typography } from "@mui/material";

/*Aditya Nair | */
const Events = ({ auth }) => {
  return (
    <>
      <Typography fontWeight="bold" sx={{ px: 3, py: 1 }} variant="h6">
        Events
      </Typography>
      <Box sx={{ p: 4 }}>
        <EventsForm />
      </Box>
    </>
  );
};

export default Events;
