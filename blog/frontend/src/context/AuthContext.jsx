import { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      const res = await api.get("/api/auth/me"); // Create this API in backend
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
