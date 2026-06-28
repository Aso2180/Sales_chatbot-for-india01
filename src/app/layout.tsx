import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "インド向け混載 営業支援アプリ",
  description: "集荷ダッシュボード × 船積みガイド × AIアドバイザー",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.31.0/dist/tabler-icons.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
