import React, { useState } from "react";

const AuthContext = React.createContext();
export default AuthContext;

export const AuthContextWrapper = ({ children }) => {
  const [auth, setAuth] = useState(false);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
