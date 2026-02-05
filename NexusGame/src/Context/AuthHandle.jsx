import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { AuthContext } from "./AuthContext.js";
import axiosClient from '../AxiosClient.js';
import {gainXpAction} from '../api/gainXp.js'
export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate(); // 2. Khai báo hook điều hướng
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fecthUser = async () => {
      try {
        const response = await axiosClient.get('/auth/me');
        setUser(response.data);
        setIsLogged(true);
      }
      catch (err) {
        setUser(null);
        setIsLogged(false);
        console.log("Lỗi khi fetch User:", err);
      }
      finally {
        setIsLoading(false);
      }
    }
    fecthUser();
  }, []);

  const login = async (account) => {
    try {
      const response = await axiosClient.post('/auth/login', account);
      console.log(response)
      const updatedUser = await gainXpAction('DAILY_LOGIN');
      const finalUser = updatedUser?.user || updatedUser || response.data.user;
      setUser(finalUser);
      setIsLogged(true);
      return response.data;
    }
    catch (err) {
      console.log(err);
    }

  };

  const logout = async () => {
    try {
      await axiosClient.post('/auth/logout');
      setIsLogged(false);
      setUser(null);
      navigate("/login"); // 4. Đăng xuất xong thì đá về trang Login
    } catch (error) {
      console.error("Lỗi đăng xuất", error);
    }
  };

  const value = { isLogged, setIsLogged, login, logout, user, isLoading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}