import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  absoluteUrl,
  createPageMetadata,
  siteConfig,
  siteUrl,
} from "@/lib/site";
import AppShell from "./AppShell";
import "./globals.css";

const geist = localFont({
  src: "./fonts/geist-latin.woff2",
  variable: "--font-geist",
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

const homeMetadata = createPageMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
});

export const metadata: Metadata = {
  ...homeMetadata,
  metadataBase: new URL(`${siteUrl}/`),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  applicationName: siteConfig.name,
  category: "education",
  creator: siteConfig.name,
  publisher: siteConfig.name,
  referrer: "origin-when-cross-origin",
  icons: {
    icon: absoluteUrl("/favicon.ico"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={geist.variable}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
