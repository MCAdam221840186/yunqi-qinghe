import Link from "next/link";
import { siteSections } from "@/lib/navigation";
import { BotanicalCanopy } from "./BotanicalCanopy";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.identity}>
          <Link href="/" className={styles.brand}>
            云启青禾
          </Link>
          <p>向光而行，与成长同行</p>
        </div>

        <nav className={styles.navigation} aria-label="页脚导航">
          {siteSections.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <p className={styles.copyright}>© 云启青禾</p>
      </div>
      <BotanicalCanopy
        variant="side"
        side="end"
        density="quiet"
        className={styles.footerCanopy}
      />
    </footer>
  );
}
