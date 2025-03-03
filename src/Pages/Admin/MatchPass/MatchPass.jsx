import "./MatchPass.css";
import { useEffect, useState } from "react";
import { TextField, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomDialog from "@/Components/Custom/CustomDialog";

function MatchPass() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(false);
  const [codigoCuenta, setCodigoCuenta] = useState(
    "833dcdab-3516-4462-85cf-1d3aa3ce7f7e"
  );
  const [validacion, setValidacion] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const codigo = queryParams.get("codigoCuenta");
    if (codigo) {
      setCodigoCuenta(codigo);

      const URL = import.meta.env.VITE_API_URL;
      axios
        .post(
          `https://${URL}/WS/TuvanosaSeguridad/Api/AuthProveedor/VerifyCodigo`,
          {
            codigoCuenta: codigo,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            return;
          }
        })
        .catch((error) => {
          console.error(`Error al verificar el código:, ${error}`);
          navigate("/");
        });
    }
  }, []);

  useEffect(() => {
    const requirements = passwordRequirements();
    setValidacion(requirements.allMet);
  }, [password, confirmPassword]);

  const passwordRequirements = () => {
    const hasLetter = /[a-z]/i.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMinLength = password.length >= 8;
    const hasMaxLength =
      password && password.length >= 8 && password.length <= 20;

    return {
      hasLetter,
      hasUpperCase,
      hasNumber,
      hasMaxLength,
      hasMinLength,
      allMet:
        hasLetter && hasUpperCase && hasNumber && hasMinLength && hasMaxLength,
    };
  };

  const tooltipMessage = () => {
    const requirements = passwordRequirements();

    return (
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p style={{ textAlign: "center" }}>La contraseña debe contener :</p>
        <ul
          style={{
            margin: "auto",
            padding: "0 0 0 20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <li>{requirements.hasLetter ? "✅" : "❌"} Al menos una letra.</li>
          <li>
            {requirements.hasUpperCase ? "✅" : "❌"} Al menos una letra
            mayúscula.
          </li>
          <li>{requirements.hasNumber ? "✅" : "❌"} Al menos un número.</li>
          <li>
            {requirements.hasMinLength ? "✅" : "❌"} Mínimo 8 caracteres.
          </li>
          <li>
            {requirements.hasMaxLength ? "✅" : "❌"} Máximo 20 caracteres.
          </li>
        </ul>
      </Box>
    );
  };

  const handleCancelClick = () => {
    navigate("/sign-in");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError(event.target.value !== confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setError(event.target.value !== password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!error && password && confirmPassword && codigoCuenta) {
      setIsSubmitting(true);
      try {
        const URL = import.meta.env.VITE_API_URL;
        await axios.post(
          `https://${URL}/WS/TuvanosaSeguridad/Api/AuthProveedor/UpdatePassword`,
          {
            codigoCuenta: codigoCuenta,
            password: password,
          }
        );
        setIsSubmitting(false);
        navigate("/sign-in");
      } catch (error) {
        setIsSubmitting(false);
        console.error("Hubo un error al enviar la petición: ", error);
      }
    }
  };

  return (
    <div className="background">
      <CustomDialog
        open={true}
        onClose={handleCancelClick}
        title="Crea tu nueva contraseña"
        isSubmitting={isSubmitting}
        submitLabel="Guardar"
        width="xs"
        onSubmit={handleSubmit}
        submitDisabled={
          !password || error || !validacion || confirmPassword === null
        }
      >
        <>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nueva Contraseña"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              required
              margin="normal"
              autoComplete="new-password"
            />
            <TextField
              error={error}
              helperText={error ? "Las contraseñas no coinciden" : ""}
              label="Confirma tu nueva contraseña"
              type="password"
              value={confirmPassword}
              required
              onChange={handleConfirmPasswordChange}
              fullWidth
              margin="normal"
            />
            <h4>{tooltipMessage()}</h4>
          </form>
        </>
      </CustomDialog>
    </div>
  );
}

export default MatchPass;
