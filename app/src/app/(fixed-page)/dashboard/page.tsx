"use client";
import { Header } from "@/app/(fixed-page)/[slug]/comments/Header";
import { CommentType } from "@/constants/types";
import { useComments } from "@/hooks/swr/useComments";
import { CommentActions } from "@/app/(fixed-page)/[slug]/comments/commentActions";

export const runtime = "edge";

export default function DashboardPage() {
  const { comments, isLoading, isError } = useComments({
    slug: "dashboard",
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>some went wrong...</div>;

  return (
    <div>
      {comments.map((item) => {
        return <div key={item.id}>{item.content}</div>;
      })}
    </div>
  );
}
