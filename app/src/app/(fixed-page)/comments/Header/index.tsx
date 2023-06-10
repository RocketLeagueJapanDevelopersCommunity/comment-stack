import { PostForm } from "./postForm";

type HeaderProps = {
  commentCount: number;
};

export function Header({ commentCount }: HeaderProps) {
  // const handleOrderChange = () => {
  //   console.log("aaaa");
  // };

  return (
    <div>
      <div className="flex justify-between items-center p-2 max-h-11">
        <h2>
          コメント <span className="text-xs">({commentCount}件)</span>
        </h2>
        {/* <div className="ml-4 text-sm">
          <span onClick={handleOrderChange}>おすすめ順</span>｜
          <span>新着順</span>
        </div> */}
      </div>
      <PostForm />
    </div>
  );
}
