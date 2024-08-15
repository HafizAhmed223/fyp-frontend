// AuthContext.js
import React, { useState, useEffect } from "react";

const AuthContext = React.createContext();
export default AuthContext;

export const AuthContextWrapper = ({ children }) => {
  const [auth, setAuth] = useState(false);

  // Retrieve auth state from localStorage on initial load
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  // Store auth state in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
