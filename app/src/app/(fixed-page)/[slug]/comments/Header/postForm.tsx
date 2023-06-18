import { SERVER_ENDPOINT } from "@/constants/api";
import { isOpenAuthModalAtom } from "@/hooks/jotai/Atoms";
import { useAtom } from "jotai";
import Link from "next/link";
import { useState } from "react";
import { IconDown } from "@/components/Icon";
import { useAuth } from "@/hooks/useAuth";

type postFormParams = {
  slug: string;
};
export function PostForm({ slug }: postFormParams) {
  const [isDetailExpanded, setIsDetailExpanded] = useState(false);

  const [inputText, setInputText] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useAtom(isOpenAuthModalAtom);
  const { userData } = useAuth();

  const handleSubmit = () => {
    if (!userData) {
      setIsAuthModalOpen(true);
      return;
    }
    if (userData.aud === "authenticated") {
      const data = {
        slug: slug,
        content: inputText,
        email: userData.email,
      };
      console.log(data);
      console.log(JSON.stringify(data));
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
          setInputText("");
          setIsDetailExpanded(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setIsAuthModalOpen(true);
    }
  };
  const isValid = inputText.length < 1 || inputText.length > 400;
  return (
    <>
      <div className="flex justify-center flex-wrap m-2">
        <div className="max-w-2xl w-full">
          <textarea
            rows={4}
            cols={30}
            value={inputText}
            className="w-full p-2.5 text-sm rounded border border-gray-300 bg-slate-100"
            placeholder="コメントする"
            onFocus={() => setIsDetailExpanded(true)}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
          {isDetailExpanded && !isAuthModalOpen && (
            <div className="relative text-right text-xs mt-1">
              <span
                className={`absolute bottom-2 right-0 ${
                  isValid && "bg-red-100"
                } p-1`}
              >{`${inputText.length} / 400`}</span>
            </div>
          )}
          {isDetailExpanded && (
            <>
              <div className="mt-2 text-xs">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <span>投稿前にご確認ください。</span>
                    <span className="transition group-open:rotate-180">
                      <IconDown />
                    </span>
                  </summary>
                  <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
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
                </details>
              </div>

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
                  className="w-full px-3 py-2 bg-black border rounded-full w-full font-semibold text-white disabled:bg-white disabled:text-gray-500"
                >
                  投稿
                </button>
                <span
                  onClick={() => setIsDetailExpanded(false)}
                  className="flex justify-center m-2 text-xs text-gray-600 cursor-pointer"
                >
                  キャンセル
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
