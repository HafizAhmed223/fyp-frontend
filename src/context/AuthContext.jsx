import React, { useEffect, useState } from "react";

const AuthContext = React.createContext();
export default AuthContext;

export const AuthContextWrapper = ({ children }) => {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    console.log("auth value changes ==>>", auth);
  }, [auth]);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
