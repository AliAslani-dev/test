// hooks/usePosts.ts
import { useQuery } from "@tanstack/react-query";
import postApi from "@/api/postApi";

export const useGetPosts = () =>
  useQuery({
    queryKey: ["allPosts"],
    queryFn: () => postApi.getAllPosts(),
  });

export const useGetSinglePost = (id: string) =>
  useQuery({
    queryKey: ["singlePost", id], // cache key
    queryFn: () => postApi.getSinglePost({ id }), // API call
    enabled: !!id, // only run if id is provided
  });

export const useGetPostComments = (id: string) =>
  useQuery({
    queryKey: ["postComments", id], // cache key
    queryFn: () => postApi.getPostComments({ id }), // API call
    enabled: !!id, // only run if id is provided
  });
