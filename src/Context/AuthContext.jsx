// context/AuthContext.js
import { createContext, useContext } from "react";

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

  // Proveer las funciones a través del contexto
  return (
    <AuthContext.Provider value={{ getToken, getConfig }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
};
