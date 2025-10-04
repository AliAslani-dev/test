import { PostsUrl } from "@/constants/apiUrls";
import { apiClient } from "./axiosClient";

const postApi = {
  getAllPosts: () => apiClient.get(PostsUrl),
  getSinglePost: ({ id }: { id: string }) => apiClient.get(`${PostsUrl}/${id}`),
  getPostComments: ({ id }: { id: string }) =>
    apiClient.get(`${PostsUrl}/${id}/comments`),
};

export default postApi;
