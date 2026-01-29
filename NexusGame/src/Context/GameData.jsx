import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { DataGameContext } from "./GameContext";
import axiosClient from "../AxiosClient";

export const DataGameProvider = ({ children }) => {
  const [gameData, setGameData] = useState([]);
  const [loading, setLoading] = useState(true); // Nên có loading state

  // Dùng useCallback để hàm không bị tạo lại mỗi lần render
  const fetchGameData = useCallback(async () => {
    try {
      const response = await axiosClient.get('/games');
      setGameData(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu game:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGameData();
  }, [fetchGameData]);

  // Dùng useMemo để tối ưu hiệu năng cho các component con
  const value = useMemo(() => ({
    gameData,
    setGameData,
    loading,
    refreshData: fetchGameData // Cho phép con gọi fetch lại khi cần
  }), [gameData, loading, fetchGameData]);

  return (
    <DataGameContext.Provider value={value}>
      {children}
    </DataGameContext.Provider>
  );
};