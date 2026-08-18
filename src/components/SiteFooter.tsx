import Link from "next/link";
import styles from "./SiteFooter.module.css";

const footerNavigation = [
  { href: "/diaries", label: "成长日志" },
  { href: "/team-diaries", label: "团队日志" },
  { href: "/about", label: "团队成员" },
] as const;

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.identity}>
          <Link href="/" className={styles.brand}>
            云启青禾
          </Link>
          <p>记录每一株幼苗的成长故事</p>
        </div>

        <nav className={styles.navigation} aria-label="页脚导航">
          {footerNavigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <p className={styles.copyright}>© 云启青禾</p>
      </div>
    </footer>
  );
}
