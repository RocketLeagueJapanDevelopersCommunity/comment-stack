"use client";
import { SERVER_ENDPOINT } from "@/constants/api";
import { CommentType } from "@/constants/types";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(SERVER_ENDPOINT + url).then((res) => res.json());

export const useComments = () => {
  const { data, error, isLoading } = useSWR(`/comments`, fetcher);

  return {
    comments: data as CommentType[],
    isLoading,
    isError: error,
  };
};
