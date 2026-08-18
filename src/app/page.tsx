import {
  ArrowRight,
  BookOpenText,
  Notebook,
  UsersThree,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/hero-growth.webp";
import AnimatedHero from "@/components/AnimatedHero";
import Reveal from "@/components/Reveal";
import {
  contentStats,
  getDiaryAuthor,
  getDiaryDateRange,
  getDiaryPreview,
  getLatestDiaries,
} from "@/lib/content";
import { createWebsiteJsonLd, serializeJsonLd } from "@/lib/site";
import styles from "./page.module.css";

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "Asia/Shanghai",
});

const monthFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  timeZone: "Asia/Shanghai",
});

const sectionLinks = [
  {
    href: "/diaries/",
    label: "成长日志",
    description: "按匿名成长册浏览每一篇真实记录。",
    icon: BookOpenText,
  },
  {
    href: "/team-diaries/",
    label: "团队日志",
    description: "沿着时间线了解陪伴与行动的过程。",
    icon: Notebook,
  },
  {
    href: "/about/",
    label: "关于我们",
    description: "认识记录者，以及这个静态网站的由来。",
    icon: UsersThree,
  },
] as const;

export default function HomePage() {
  const latestDiaries = getLatestDiaries(3);
  const dateRange = getDiaryDateRange();
  const websiteJsonLd = createWebsiteJsonLd();

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd) }}
      />

      <section className={styles.hero} aria-labelledby="home-title">
        <AnimatedHero className={styles.heroCopy}>
          <p className={styles.eyebrow}>公开成长记录</p>
          <h1 id="home-title">云启青禾</h1>
          <p className={styles.lede}>记录每一株幼苗的成长故事</p>
          <p className={styles.heroNote}>
            用克制而真诚的文字，保存学习、陪伴与改变发生的时刻。
          </p>
          <Link className={styles.primaryLink} href="/diaries/">
            成长日志
            <ArrowRight aria-hidden="true" size={19} weight="bold" />
          </Link>
        </AnimatedHero>

        <AnimatedHero className={styles.heroVisual}>
          <Image
            src={heroImage}
            alt="晨光中的绿色幼苗从层叠纸页之间生长"
            sizes="(max-width: 767px) calc(100vw - 2rem), 56vw"
            preload
          />
          <p className={styles.imageCaption}>
            向光生长
            {dateRange ? (
              <span>
                记录始于 {monthFormatter.format(new Date(dateRange.earliest))}
              </span>
            ) : null}
          </p>
        </AnimatedHero>
      </section>

      <Reveal className={styles.statsWrap}>
        <dl className={styles.stats} aria-label="网站内容统计">
          <div>
            <dt>匿名成长册</dt>
            <dd>{contentStats.children}</dd>
          </div>
          <div>
            <dt>成长日记</dt>
            <dd>{contentStats.diaries}</dd>
          </div>
          <div>
            <dt>团队记录</dt>
            <dd>{contentStats.teamDiaries}</dd>
          </div>
        </dl>
      </Reveal>

      <section className={styles.latest} aria-labelledby="latest-title">
        <Reveal className={styles.sectionHeading}>
          <p className={styles.eyebrow}>最近更新</p>
          <h2 id="latest-title">刚刚写下的成长</h2>
          <Link href="/diaries/" className={styles.textLink}>
            查看全部
            <ArrowRight aria-hidden="true" size={17} weight="bold" />
          </Link>
        </Reveal>

        <div className={styles.latestGrid}>
          {latestDiaries.map((diary, index) => {
            const author = getDiaryAuthor(diary);
            return (
              <Reveal
                key={diary.slug}
                className={index === 0 ? styles.featuredSlot : styles.diarySlot}
                delay={index * 0.08}
              >
                <article className={styles.diaryPreview}>
                  <div className={styles.diaryMeta}>
                    <span>{author.displayName}</span>
                    <time dateTime={diary.date}>
                      {dateFormatter.format(new Date(diary.date))}
                    </time>
                  </div>
                  <h3>{diary.title}</h3>
                  <p>{getDiaryPreview(diary, index === 0 ? 110 : 72)}</p>
                  <Link
                    href={`/diaries/${diary.slug}/`}
                    aria-label={`阅读${author.displayName}的日记《${diary.title}》`}
                  >
                    阅读这篇日记
                    <ArrowRight aria-hidden="true" size={17} weight="bold" />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className={styles.routes} aria-labelledby="routes-title">
        <Reveal className={styles.routesIntro}>
          <p className={styles.eyebrow}>从这里开始</p>
          <h2 id="routes-title">阅读记录，也认识记录背后的人</h2>
        </Reveal>

        <div className={styles.routeList}>
          {sectionLinks.map(({ href, label, description, icon: Icon }, index) => (
            <Reveal key={href} delay={index * 0.06}>
              <Link href={href} className={styles.routeLink}>
                <Icon aria-hidden="true" size={24} weight="regular" />
                <span>
                  <strong>{label}</strong>
                  <small>{description}</small>
                </span>
                <ArrowRight
                  className={styles.routeArrow}
                  aria-hidden="true"
                  size={19}
                  weight="bold"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
