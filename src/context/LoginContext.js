import React, { createContext, useState } from "react";
export const LoginContext = createContext();
export const LoginPovider = ({ children }) => {
  const [employeData, setEmployeData] = useState(null);
  const getAdminData = (data) => {
    setEmployeData(data);
    console.log()
  };
  
  return (
    <LoginContext.Provider
      value={{ employeData, getAdminData}}
    >
      {children}
    </LoginContext.Provider>
  );
};