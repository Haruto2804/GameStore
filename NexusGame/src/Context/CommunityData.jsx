import { CommunityContext } from "./CommunityContext";
import { useState, useEffect, useMemo } from "react";
import axios from 'axios'
export const CommunityProvider = ({ children }) => {
  // Fetch dữ liệu từ API
  const [communityPosts, setCommunityPosts] = useState([]);
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchCommunityPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/community/posts`, {
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