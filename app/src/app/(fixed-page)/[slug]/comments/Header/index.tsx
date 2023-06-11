import { useSession } from "next-auth/react";
import { PostForm } from "./postForm";
import Image from "next/image";

type HeaderProps = {
  commentCount: number;
  slug: string;
};

export function Header({ commentCount, slug }: HeaderProps) {
  const { data: session, status } = useSession();
  // const handleOrderChange = () => {
  //   console.log("aaaa");
  // };

  return (
    <div>
      <div className="flex justify-between items-center p-4 max-h-14 bg-slate-100">
        <h2>
          コメント <span className="text-xs">({commentCount}件)</span>
        </h2>
        {status === "authenticated" && session && (
          <Image
            src={session.user?.image ?? ""}
            alt={`${session.user?.name}のアイコン`}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        {/* <div className="ml-4 text-sm">
          <span onClick={handleOrderChange}>おすすめ順</span>｜
          <span>新着順</span>
        </div> */}
      </div>
      <PostForm slug={slug} />
    </div>
  );
}
