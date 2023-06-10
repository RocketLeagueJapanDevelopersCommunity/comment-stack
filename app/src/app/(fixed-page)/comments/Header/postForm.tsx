import { SERVER_ENDPOINT } from "@/constants/api";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AuthModal } from "./authModal";

export function PostForm() {
  const [isDetailExpanded, setIsDetailExpanded] = useState(false);
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
  const [inputText, setInputText] = useState(``);
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session, status);
  }, []);

  const handleSubmit = () => {
    if (status === "unauthenticated") {
      setIsOpenAuthModal(true);
    } else if (status === "authenticated") {
      const data = {
        slug: "example",
        content: inputText,
        uuid: "4a273b5a-980b-402c-9fa2-cedd9c08567e",
      };

      fetch(SERVER_ENDPOINT + "/comment", {
        method: "POST", // or 'PUT'
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
    } else {
      alert("もう一度試してください。");
    }
  };
  const isValid = inputText.length < 1 || inputText.length > 400;
  return (
    <>
      {" "}
      <div className="flex justify-center flex-wrap m-2">
        <AuthModal isShow={isOpenAuthModal} isShowAction={setIsOpenAuthModal} />
        <div className="max-w-2xl w-full">
          <textarea
            rows={4}
            cols={30}
            value={inputText}
            className="w-full p-2.5 text-sm rounded border border-gray-300 bg-slate-200"
            placeholder="コメントする"
            onFocus={() => setIsDetailExpanded(true)}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
          {isDetailExpanded && !isOpenAuthModal && (
            <div className="relative text-right text-xs mt-1">
              <span
                className={`absolute bottom-2 right-0 ${
                  isValid && "bg-red-100"
                } p-1`}
              >{`${inputText.length} / 400`}</span>
            </div>
          )}
          {isDetailExpanded && (
            <div>
              <p className="mt-2 text-xs">
                ※投稿前にご確認ください。
                <br />
                良識のあるコメントを心がけ、攻撃的な表現や他人が傷つく発言は避けましょう。なお、コメント投稿時に「
                <Link
                  className="text-blue-600 hover:underline"
                  href="/comment-policy"
                  target="_blank"
                >
                  コメントポリシー
                </Link>
                」に同意したとみなします。 コメントは承認後に表示されます。
              </p>

              <div className="mx-auto max-w-xs my-2 text-center">
                <p className="text-xs mb-2 text-red-700">
                  {inputText !== "" &&
                    isValid &&
                    "コメントが正しくありません。"}
                </p>
                <button
                  onClick={handleSubmit}
                  disabled={isValid}
                  type="submit"
                  className="w-full p-3 bg-black border rounded-full w-full font-semibold text-white disabled:bg-white disabled:text-gray-500"
                >
                  投稿
                </button>
                <span
                  onClick={() => setIsDetailExpanded(false)}
                  className="flex justify-center m-2 text-xs text-gray-600"
                >
                  キャンセル
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
