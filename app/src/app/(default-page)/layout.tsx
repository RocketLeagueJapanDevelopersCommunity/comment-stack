import "@/app/globals.css";
import { Noto_Sans_JP } from "next/font/google";

const notoSansJp = Noto_Sans_JP({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "コメントポリシー | COMMENT STACK",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={notoSansJp.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
