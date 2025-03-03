import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Error500Page = () => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ textAlign: "center", mt: 8 }}
    >
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        sx={{ fontSize: "5rem", fontWeight: "bold" }}
      >
        500
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Oops! Algo salio mal.
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        paragraph
        sx={{ mb: 3 }}
      >
        El servidor encontro un error interno y no fue posible completar tu
        peticion.
      </Typography>
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          sx={{ mr: 1 }}
        >
          Ir a Home
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => window.location.reload()}
        >
          Volver a intentar
        </Button>
      </Box>
    </Container>
  );
};

export default Error500Page;
