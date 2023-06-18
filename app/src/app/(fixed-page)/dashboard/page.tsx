"use client";
import { CommentType } from "@/constants/types";
import { useComments } from "@/hooks/swr/useComments";
import { useAuth } from "@/hooks/useAuth";
import { useSetAtom } from "jotai";
import { isOpenAuthModalAtom } from "@/hooks/jotai/Atoms";
import { SERVER_ENDPOINT } from "@/constants/api";

export const runtime = "edge";

export default function DashboardPage() {
  const { comments, isLoading, isError } = useComments({
    slug: "dashboard",
  });
  const { userData } = useAuth();
  const setOpenModal = useSetAtom(isOpenAuthModalAtom);

  const handleApprove = (id: number, approve: number) => {
    if (!userData) return;
    if (userData.aud === "authenticated") {
      const data = {
        id,
        approve,
      };
      fetch(SERVER_ENDPOINT + "/comments/approve", {
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

  if (!userData)
    return (
      <div>
        UnAuthorized <button onClick={() => setOpenModal(true)}>Login</button>
      </div>
    );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>some went wrong...</div>;

  return (
    <div className="m-4">
      <table
        width="100%"
        cellPadding="0"
        border={1}
        className="min-w-max w-full table-auto"
      >
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
            <th>ID</th>
            <th>Content</th>
            <th>承認</th>
            <th>Likes</th>
            <th>Slug</th>
            <th>UpdateAt</th>
            <th>CreatedAt</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {comments.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-200 hover:bg-gray-100 text-center"
            >
              <td>{item.id}</td>
              <td>{item.content}</td>
              <td
                className="py-3 px-6 cursor-pointer"
                onClick={() =>
                  handleApprove(item.id, item.is_approved === 0 ? 1 : 0)
                }
              >
                <span
                  className={`${
                    item.is_approved
                      ? "bg-green-200 text-green-600"
                      : "bg-yellow-200 text-yellow-600"
                  } py-1 px-3 rounded-full text-xs`}
                >
                  {item.is_approved === 0 ? "未承認" : "承認済み"}
                </span>
              </td>
              <td>{item.likes}</td>
              <td>{item.post_slug}</td>
              <td>{item.updated_at}</td>
              <td>{item.created_at}</td>
              <td>{item.user_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
