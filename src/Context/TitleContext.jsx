import { createContext, useContext, useState } from "react";

export const TitleContext = createContext();

const TitleProvider = ({ children }) => {
  const [title, setTitle] = useState("Inicio");

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
};

export default TitleProvider;

export const useTitleContext = () => useContext(TitleContext);
