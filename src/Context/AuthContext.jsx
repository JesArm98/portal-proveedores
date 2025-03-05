import { createContext, useContext } from "react";
import axios from "axios";

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  // Función para obtener el token del localStorage
  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }
    return token;
  };

  // Función para obtener la configuración de la solicitud (incluyendo el token)
  const getConfig = () => {
    const token = getToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // Función para manejar token caducado
  const handleTokenExpiration = () => {
    localStorage.removeItem("token");
    // En lugar de usar useNavigate, redirigimos directamente
    window.location.href = "/sign-in";
  };

  // Función para configurar el interceptor de Axios
  const setupAxiosInterceptors = () => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // Verificar si el error es de autorización (token inválido o caducado)
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          handleTokenExpiration();
        }
        return Promise.reject(error);
      }
    );
  };

  // Configurar los interceptores al montar el proveedor
  setupAxiosInterceptors();

  // Proveer las funciones a través del contexto
  return (
    <AuthContext.Provider
      value={{
        getToken,
        getConfig,
        handleTokenExpiration,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
};
