import { signIn, useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";

type authModalProps = {
  isShow: boolean;
  isShowAction: Dispatch<SetStateAction<boolean>>;
};
export function AuthModal(props: authModalProps) {
  const processLogin = () => {
    signIn().catch((e) => console.log(e));
  };
  return (
    props.isShow && (
      <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
        <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
          <div className="w-full flex justify-center">
            <div className="m-8 my-20 max-w-[400px]">
              <div className="mb-8">
                <h1 className="mb-4 text-3xl font-extrabold">
                  ログインが必要です
                </h1>
                <p className="text-gray-600">
                  ログインすることでコメントすることが出来ます。
                </p>
              </div>
              <div className="space-y-4">
                <button
                  onClick={processLogin}
                  className="p-3 bg-black rounded-full text-white w-full font-semibold"
                >
                  ログインする
                </button>
                <button
                  onClick={() => props.isShowAction(false)}
                  className="p-3 bg-white border rounded-full w-full font-semibold"
                >
                  また今度試す
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
