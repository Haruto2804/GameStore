import axiosClient from "../../AxiosClient";
export const commentService = {
  getComments: async (postId) => {
    try {
      const response = await axiosClient.get(`/community/post/${postId}/comments`);
      return response.data;
    }
    catch (error) {
      console.error("Lỗi khi lấy dữ liệu comment:");
      throw error;
    }
  },
  create: async (postId, content) => {
    try {
      const response = await axiosClient.post(`/community/post/${postId}/comments`, {
        content: content
      });

      return response.data;
    }
    catch (error) {
      console.error("Lỗi API postComment:", error.response?.data || error.message);
      throw error;
    }
  },
  like: async (postId) => {
    try {
      const response = await axiosClient.post(`/community/post/${postId}/comment/liked`);
      return response.data;
    }
    catch (err) {
      console.log("Lỗi Like API", err?.response?.data?.message);
      throw err;
    }
  }
}
