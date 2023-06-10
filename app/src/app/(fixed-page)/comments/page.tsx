"use client";
import { Header } from "@/app/(fixed-page)/comments/Header";
import { IconGood } from "@/components/Icon";
import { CommentType } from "@/constants/types";
import { useComments } from "@/hooks/swr/useComments";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";

export default function CommentsPage() {
  const { comments, isLoading, isError } = useComments();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>some went wrong...</div>;

  const formatId = (uuid: string) => {
    return uuid.split("-")[4];
  };

  return (
    <SessionProvider>
      <div className="h-full overflow-y-auto pb-2">
        <Header commentCount={comments.length} />
        {comments.reverse().map((post) => {
          return (
            <div className="p-2 border-t-2" key={post.id}>
              <div className="mb-2">
                <span className="text-sm font-bold">{`通りすがりの読者`}</span>
                <span className="text-xs font-light ml-2">
                  {`(${post.id}:${formatId(post.author_uuid)})`}
                </span>
                <span className="block text-sm">{post.created_at}</span>
              </div>
              <TextComponent postId={post.id} text={post.content} />
              <div className="flex flex-row-reverse">
                <div className="inline-flex m-2 p-2 border">
                  <IconGood />
                  <span className="mx-2">{post.likes}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SessionProvider>
  );
}

type TextComponentProps = {
  postId: CommentType["id"];
  text: CommentType["content"];
};

function TextComponent(props: TextComponentProps) {
  const lines = props.text.split(/\\n/g);
  return (
    <div>
      {lines.map((line, i) => (
        <p
          className="break-all whitespace-pre-wrap"
          key={`${props.postId}-text-line-${i}`}
        >
          {line}
        </p>
      ))}
    </div>
  );
}
