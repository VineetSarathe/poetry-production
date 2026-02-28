import { createContext, useEffect, useState } from "react";
import api from "../api";

export const PoetsContext = createContext();

export const PoetsProvider = ({ children }) => {

  const [poets, setPoets] = useState([]);

  const fetchPoets = async () => {
    const res = await api.get("/poets");
    setPoets(res.data);
  };

  useEffect(() => {
    fetchPoets();
  }, []);

  return (
    <PoetsContext.Provider value={{ poets }}>
      {children}
    </PoetsContext.Provider>
  );
};
