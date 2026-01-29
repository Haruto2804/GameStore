import { CommunityContext } from "./CommunityContext";
import { useState, useEffect, useMemo } from "react";
import axiosClient from "../AxiosClient";
export const CommunityProvider = ({ children }) => {
  // Fetch dữ liệu từ API
  const [communityPosts, setCommunityPosts] = useState([]);
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchCommunityPosts = async () => {
      try {
        const res = await axiosClient.get(`/community/posts`, {
          params: {
            category: category !== 'all' ? category : undefined,
            page: currentPage
          }
        })
        setCommunityPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error('Lỗi khi fetch community Posts: ', err);
      }
    };
    fetchCommunityPosts();
  }, [category, currentPage]);
  const value = useMemo(() => ({
    communityPosts,
    category,
    setCategory,
    currentPage,
    setCurrentPage,
    totalPages
  }), [category, communityPosts, currentPage, totalPages]);
  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  )
}