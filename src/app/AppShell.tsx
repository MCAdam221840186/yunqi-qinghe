"use client";

import type { ReactNode } from "react";
import { ConfigProvider, Layout } from "antd";
import zhCN from "antd/locale/zh_CN";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

const { Content } = Layout;

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const themedContent = (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: "#4caf50",
          colorLink: "#388e3c",
          borderRadius: 8,
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans SC", sans-serif',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );

  if (pathname === "/") {
    return themedContent;
  }

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: "#4caf50",
          colorLink: "#388e3c",
          borderRadius: 8,
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans SC", sans-serif',
        },
      }}
    >
      <Layout className="app-shell">
        <Sidebar />
        <Layout className="app-main">
          <Content key={pathname} className="page-content page-transition">
            {children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
