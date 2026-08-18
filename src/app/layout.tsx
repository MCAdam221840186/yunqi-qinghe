import type { Metadata } from "next";
import AppShell from "./AppShell";
import "./globals.css";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);
const socialImageUrl = `${siteUrl}/og.png`;

export const metadata: Metadata = {
  title: "云启青禾",
  description: "记录每一株幼苗的成长故事",
  openGraph: {
    title: "云启青禾",
    description: "记录每一株幼苗的成长故事",
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName: "云启青禾",
    images: [
      {
        url: socialImageUrl,
        width: 1731,
        height: 909,
        alt: "云启青禾｜记录每一株幼苗的成长故事",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "云启青禾",
    description: "记录每一株幼苗的成长故事",
    images: [socialImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
