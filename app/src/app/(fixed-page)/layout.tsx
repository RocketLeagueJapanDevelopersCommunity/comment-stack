import "@/app/globals.css";
import { Noto_Sans_JP } from "next/font/google";
import { AuthModal } from "@/components/authModal";

const notoSansJp = Noto_Sans_JP({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "投稿一覧 | COMMENT STACK",
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
        <AuthModal />
        <main className="h-screen overflow-hidden p-0">{children}</main>
      </body>
    </html>
  );
}
