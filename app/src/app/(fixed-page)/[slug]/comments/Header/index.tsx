import { PostForm } from "./postForm";
import { useSetAtom } from "jotai";
import { isOpenAuthModalAtom } from "@/hooks/jotai/Atoms";
import { useAuth } from "@/hooks/useAuth";
type HeaderProps = {
  commentCount: number;
  slug: string;
};

export function Header({ commentCount, slug }: HeaderProps) {
  const { userData } = useAuth();
  const setOpenModal = useSetAtom(isOpenAuthModalAtom);
  // const handleOrderChange = () => {
  //   console.log("aaaa");
  // };

  return (
    <div>
      <div className="flex justify-between items-center p-4 max-h-14 bg-slate-100">
        <h2>
          コメント <span className="text-xs">({commentCount}件)</span>
        </h2>
        {userData && userData.aud === "authenticated" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={userData.user_metadata.avatar_url}
            alt={`${userData.user_metadata.full_name}のアイコン`}
            width={40}
            height={40}
            className="rounded-full"
            onClick={() => setOpenModal(true)}
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
