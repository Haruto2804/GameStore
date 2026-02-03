import { useState,useEffect } from "react";
import { AuthContext } from "./AuthContext.js";
export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLogged(localStorage.getItem('is_logged') === 'true');
  }, []);

  const login = () => {
    localStorage.setItem('is_logged', 'true');
    setIsLogged(true);
  };

  const logout = () => {
    localStorage.removeItem('is_logged');
    setIsLogged(false);
  };
  const value = {
    isLogged,
    setIsLogged,
    login,
    logout
  }
  return (
    <AuthContext.Provider value= {value}>
      {children}
    </AuthContext.Provider>
  );
}