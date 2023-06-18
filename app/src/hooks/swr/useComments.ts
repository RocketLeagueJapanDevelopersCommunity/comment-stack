"use client";
import { SERVER_ENDPOINT } from "@/constants/api";
import { CommentType } from "@/constants/types";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(SERVER_ENDPOINT + url).then((res) => res.json());

type useCommentsProps = {
  slug?: string;
};

export const useComments = ({ slug }: useCommentsProps) => {
  const query = slug ? `/${slug}` : "";
  const { data, error, isLoading, mutate } = useSWR(
    `/comments${query}`,
    fetcher
  );

  return {
    comments: data as CommentType[],
    isLoading,
    isError: error,
  };
};
