"use client";

import {
  BookOpenText,
  Leaf,
  List,
  Notebook,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./SiteHeader.module.css";

const navigation = [
  {
    href: "/diaries",
    label: "成长日志",
    icon: BookOpenText,
  },
  {
    href: "/team-diaries",
    label: "团队日志",
    icon: Notebook,
  },
  {
    href: "/about",
    label: "团队成员",
    icon: UsersThree,
  },
] as const;

function getActiveHref(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.includes("team-diaries")) return "/team-diaries";
  if (segments.includes("about")) return "/about";
  if (segments.includes("diaries") || segments.includes("children")) {
    return "/diaries";
  }
  return null;
}

export default function SiteHeader() {
  const pathname = usePathname();
  const activeHref = getActiveHref(pathname);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const previousOverflowRef = useRef("");
  const bodyScrollLockedRef = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const restoreBodyScroll = () => {
    if (!bodyScrollLockedRef.current) return;
    document.body.style.overflow = previousOverflowRef.current;
    bodyScrollLockedRef.current = false;
  };

  const openMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    bodyScrollLockedRef.current = true;
    dialog.showModal();
    setMenuOpen(true);
    closeButtonRef.current?.focus();
  };

  const closeMenu = () => {
    if (dialogRef.current?.open) dialogRef.current.close();
  };

  const handleDialogClose = () => {
    setMenuOpen(false);
    restoreBodyScroll();
    menuButtonRef.current?.focus();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      restoreBodyScroll();
      if (dialog?.open) dialog.close();
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="返回云启青禾首页">
          <span className={styles.brandMark} aria-hidden="true">
            <Leaf size={20} weight="regular" />
          </span>
          <span className={styles.brandName}>云启青禾</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="主导航">
          {navigation.map(({ href, icon: Icon, label }) => {
            const active = activeHref === href;
            return (
              <Link
                key={href}
                href={href}
                className={styles.navLink}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={18} weight="regular" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <p className={styles.headerNote}>记录每一株幼苗的成长故事</p>

        <button
          ref={menuButtonRef}
          type="button"
          className={styles.menuButton}
          aria-label="打开导航菜单"
          aria-haspopup="dialog"
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          onClick={openMenu}
        >
          <List size={24} weight="regular" aria-hidden="true" />
        </button>
      </div>

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        className={styles.dialog}
        aria-labelledby="mobile-navigation-title"
        onClose={handleDialogClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <div className={styles.dialogPanel}>
          <div className={styles.dialogHeader}>
            <Link href="/" className={styles.dialogBrand} onClick={closeMenu}>
              <span className={styles.brandMark} aria-hidden="true">
                <Leaf size={20} weight="regular" />
              </span>
              <span id="mobile-navigation-title">云启青禾</span>
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.closeButton}
              aria-label="关闭导航菜单"
              onClick={closeMenu}
            >
              <X size={22} weight="regular" aria-hidden="true" />
            </button>
          </div>

          <nav className={styles.mobileNav} aria-label="移动端主导航">
            {navigation.map(({ href, icon: Icon, label }) => {
              const active = activeHref === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={styles.mobileNavLink}
                  aria-current={active ? "page" : undefined}
                  onClick={closeMenu}
                >
                  <Icon size={22} weight="regular" aria-hidden="true" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          <p className={styles.dialogNote}>记录成长，珍藏每一次用心的陪伴。</p>
        </div>
      </dialog>
    </header>
  );
}
