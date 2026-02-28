import { createContext, useEffect, useState } from "react";
import api from "../api";

export const PoemsContext = createContext();

export const PoemsProvider = ({ children }) => {

  const [poems, setPoems] = useState([]);

  const fetchPoems = async () => {
    const res = await api.get("/poems");
    setPoems(res.data);
  };

  useEffect(() => {
    fetchPoems();
  }, []);

  return (
    <PoemsContext.Provider value={{ poems, fetchPoems }}>
      {children}
    </PoemsContext.Provider>
  );
};
