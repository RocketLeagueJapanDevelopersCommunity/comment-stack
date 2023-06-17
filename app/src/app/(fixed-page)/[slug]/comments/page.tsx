"use client";
import { Header } from "@/app/(fixed-page)/[slug]/comments/Header";
import { CommentType } from "@/constants/types";
import { useComments } from "@/hooks/swr/useComments";
import { SessionProvider } from "next-auth/react";
import { CommentActions } from "@/app/(fixed-page)/[slug]/comments/commentActions";
import { AuthModal } from "@/components/authModal";

export const runtime = "edge";

export default function CommentsPage({ params }: { params: { slug: string } }) {
  const { comments, isLoading, isError } = useComments({
    slug: params.slug,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>some went wrong...</div>;

  return (
    <SessionProvider>
      <div className="h-full overflow-y-auto pb-2">
        <AuthModal />
        <Header commentCount={comments.length} slug={params.slug} />
        {!isLoading && comments.length === 0 && (
          <p className="text-center m-4 mt-8">コメントがありません。</p>
        )}
        {comments.reverse().map((post) => {
          return (
            <div className="p-2 pb-0 border-t-2" key={post.id}>
              <div className="mb-1">
                <span className="text-sm font-bold">{`通りすがりの読者`}</span>
                <span className="text-xs font-light ml-2">
                  {`(ID:${post.id})`}
                </span>
                <span className="block text-sm">{post.created_at}</span>
              </div>
              <TextComponent post={post} />
              <CommentActions post={post} />
            </div>
          );
        })}
      </div>
    </SessionProvider>
  );
}

function TextComponent(props: { post: CommentType }) {
  const lines = props.post.content.split(/\\n/g);
  return (
    <div>
      {lines.map((line, i) => (
        <p
          className="break-all whitespace-pre-wrap"
          key={`${props.post.id}-text-line-${i}`}
        >
          {line}
        </p>
      ))}
    </div>
  );
}
