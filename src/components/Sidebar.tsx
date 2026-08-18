"use client";

import { useState } from "react";
import {
  BookOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  MenuOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Layout, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    key: "/diaries",
    icon: <BookOutlined />,
    label: <Link href="/diaries">成长日志</Link>,
  },
  {
    key: "/team-diaries",
    icon: <TeamOutlined />,
    label: <Link href="/team-diaries">团队日志</Link>,
  },
  {
    key: "/about",
    icon: <InfoCircleOutlined />,
    label: <Link href="/about">团队成员</Link>,
  },
];

function getSelectedKey(pathname: string) {
  if (pathname.startsWith("/team-diaries")) return "/team-diaries";
  if (pathname === "/about") return "/about";
  return "/diaries";
}

export default function Sidebar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const selectedKey = getSelectedKey(pathname);

  const navigation = (mobile = false) => (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      items={menuItems}
      onClick={() => mobile && setDrawerOpen(false)}
      className="sidebar-menu"
    />
  );

  return (
    <>
      <Layout.Sider width={220} className="desktop-sidebar">
        <Link href="/" className="sidebar-brand" aria-label="返回云启青禾首页">
          <span aria-hidden="true">🌱</span>
          <span>云启青禾</span>
        </Link>
        <nav aria-label="主导航" className="sidebar-nav">
          {navigation()}
        </nav>
        <p className="sidebar-note">记录每一株幼苗的成长故事</p>
      </Layout.Sider>

      <header className="mobile-topbar">
        <Button
          type="text"
          icon={<MenuOutlined />}
          className="mobile-menu-button"
          aria-label="打开导航菜单"
          onClick={() => setDrawerOpen(true)}
        />
        <Link href="/" className="mobile-brand" aria-label="返回云启青禾首页">
          <span aria-hidden="true">🌱</span>
          <span>云启青禾</span>
        </Link>
        <span className="mobile-topbar-spacer" aria-hidden="true" />
      </header>

      <Drawer
        placement="left"
        size={280}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        closeIcon={<CloseOutlined />}
        title={
          <Link
            href="/"
            className="drawer-brand"
            onClick={() => setDrawerOpen(false)}
          >
            <span aria-hidden="true">🌱</span>
            <span>云启青禾</span>
          </Link>
        }
        className="mobile-drawer"
      >
        <nav aria-label="移动端主导航">{navigation(true)}</nav>
        <p className="drawer-note">记录每一株幼苗的成长故事</p>
      </Drawer>
    </>
  );
}
