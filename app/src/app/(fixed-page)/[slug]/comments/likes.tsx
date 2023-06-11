import { IconHeart, IconReport, IconShare } from "@/components/Icon";
import { SERVER_ENDPOINT } from "@/constants/api";
import { CommentType } from "@/constants/types";
import { useSession } from "next-auth/react";

export function Likes(props: { post: CommentType }) {
  const { data: session, status } = useSession();

  const handleLike = () => {
    if (status === "authenticated") {
      const data = {
        slug: "",
        content: "inputText",
        email: session.user?.email,
      };
      fetch(SERVER_ENDPOINT + "/comments/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="flex justify-evenly text-gray-500 mt-1 text-xs">
      <div className="flex justify-center items-center p-2 w-full cursor-pointer hover:bg-gray-200">
        <IconHeart />
        <span className="ml-2">
          {props.post.likes !== 0 && props.post.likes}
        </span>
      </div>

      <div className="flex justify-center items-center p-2 w-full cursor-pointer hover:bg-gray-200">
        <IconShare />
        <span className="ml-2">共有</span>
      </div>

      {/* <div className="flex justify-center items-center p-2 w-full cursor-pointer">
        <IconReport />
        <span className="ml-2">報告</span>
      </div> */}
    </div>
  );
}
