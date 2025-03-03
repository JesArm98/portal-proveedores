import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function NewPassPage() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);

  const URL = import.meta.env.VITE_API_URL;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const hasSpecialChars = /[<>"'\\/]/.test(value);

    if (
      value.length <= 55 &&
      value.endsWith("@tuvanosa.com") &&
      value.length >= 17 &&
      !value.includes(" ") &&
      emailPattern.test(value) &&
      !hasSpecialChars
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `https://${URL}/WS/TuvanosaSeguridad/Api/AuthProveedor/ForgetPassword`,
        { email }
      );

      if (response.status === 200) {
        // Redirigir a otra página
        history.push("/");
      }
    } catch (error) {
      // Mostrar mensaje de error

      console.error("Ocurrió un error:", error);
    }
  };

  return (
    <Grid
      container
      direction={"column"}
      sx={{
        backgroundColor: "grey",

        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        container
        sx={{
          display: "grid",
          backgroundColor: "white",
          border: "1.5px",
          width: "700px",
          height: "300px",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "20px",
        }}
      >
        <h2 style={{}}>Ingresa tu email para buscar tu cuenta.</h2>

        <TextField
          {...(isValid ? {} : { error: true })}
          id="outlined-error-helper-text"
          {...(isValid ? { label: "Email Valido" } : { label: "Email" })}
          {...(isValid
            ? {}
            : { helperText: "Introduce email con dominio correcto." })}
          value={email}
          required={true}
          onChange={handleEmailChange}
        />
        <br />
        <div>
          <Button
            sx={{ marginRight: "20px", width: "150px" }}
            variant="contained"
            disabled={!isValid}
            onClick={handleSubmit}
          >
            Enviar
          </Button>
          <Button
            component={Link}
            sx={{ backgroundColor: "red", width: "150px" }}
            variant="contained"
            to="/sign-in"
            color="error"
          >
            Volver
          </Button>
        </div>
      </Box>
    </Grid>
  );
}
