"use client";

import {
  BookOpenText,
  Books,
  Leaf,
  List,
  Notebook,
  Palette,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteSections, type SiteSectionId } from "@/lib/navigation";
import styles from "./SiteHeader.module.css";

const sectionIcons = {
  about: UsersThree,
  "team-diaries": Notebook,
  reading: Books,
  diaries: BookOpenText,
  works: Palette,
} as const;

function getActiveSectionId(pathname: string): SiteSectionId | null {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.includes("team-diaries")) return "team-diaries";
  if (segments.includes("reading")) return "reading";
  if (segments.includes("about")) return "about";
  if (segments.includes("works")) return "works";
  if (segments.includes("diaries") || segments.includes("children")) {
    return "diaries";
  }
  return null;
}

function getSectionAriaCurrent(
  pathname: string,
  sectionId: SiteSectionId,
): "page" | "location" | undefined {
  if (getActiveSectionId(pathname) !== sectionId) return undefined;

  const segments = pathname.split("/").filter(Boolean);
  return segments.at(-1) === sectionId ? "page" : "location";
}

export default function SiteHeader() {
  const pathname = usePathname();
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
          {siteSections.map(({ id, href, label }) => {
            const Icon = sectionIcons[id];
            return (
              <Link
                key={href}
                href={href}
                className={styles.navLink}
                aria-current={getSectionAriaCurrent(pathname, id)}
              >
                <Icon size={18} weight="regular" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <p className={styles.headerNote}>支教、陪伴与共同成长</p>

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
            {siteSections.map(({ id, href, label }) => {
              const Icon = sectionIcons[id];
              return (
                <Link
                  key={href}
                  href={href}
                  className={styles.mobileNavLink}
                  aria-current={getSectionAriaCurrent(pathname, id)}
                  onClick={closeMenu}
                >
                  <Icon size={22} weight="regular" aria-hidden="true" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          <p className={styles.dialogNote}>支教、陪伴与共同成长</p>
        </div>
      </dialog>
    </header>
  );
}
