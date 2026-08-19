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
  getDiaryAuthor,
  getDiaryPreview,
  getLatestDiaries,
} from "@/lib/content";
import { siteSections } from "@/lib/navigation";
import { createWebsiteJsonLd, serializeJsonLd } from "@/lib/site";
import styles from "./page.module.css";

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "Asia/Shanghai",
});

const sectionIcons = {
  about: UsersThree,
  "team-diaries": Notebook,
  diaries: BookOpenText,
} as const;

export default function HomePage() {
  const latestDiaries = getLatestDiaries(3);
  const websiteJsonLd = createWebsiteJsonLd();

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd) }}
      />

      <section className={styles.hero} aria-labelledby="home-title">
        <AnimatedHero className={styles.heroCopy}>
          <p className={styles.eyebrow}>云启青禾支教团队</p>
          <h1 id="home-title">向光而行，与成长同行</h1>
          <p className={styles.lede}>
            记录支教路上的行动与思考，也珍藏孩子们在学习与创作中的成长。
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryLink} href="/about/">
              认识我们
              <ArrowRight aria-hidden="true" size={19} weight="bold" />
            </Link>
            <Link className={styles.secondaryLink} href="/team-diaries/">
              团队日志
              <ArrowRight aria-hidden="true" size={19} weight="bold" />
            </Link>
          </div>
        </AnimatedHero>

        <AnimatedHero className={styles.heroVisual}>
          <Image
            src={heroImage}
            alt="晨光中的绿色幼苗从层叠纸页之间生长"
            sizes="(max-width: 767px) calc(100vw - 2rem), 56vw"
            preload
          />
          <p className={styles.imageCaption}>向光生长</p>
        </AnimatedHero>
      </section>

      <section className={styles.mission} aria-labelledby="mission-title">
        <Reveal className={styles.missionInner}>
          <p className={styles.eyebrow}>关于云启青禾</p>
          <h2 id="mission-title">
            云启青禾是一支支教团队。我们用这个网站介绍团队、记录支教行动，并公开呈现经过匿名处理的成长片段。
          </h2>
        </Reveal>
      </section>

      <section className={styles.routes} aria-labelledby="routes-title">
        <Reveal className={styles.routesIntro}>
          <h2 id="routes-title">从认识团队开始</h2>
        </Reveal>

        <div className={styles.routeList}>
          {siteSections.map((section, index) => {
            const Icon = sectionIcons[section.id];
            return (
              <Reveal key={section.id} delay={index * 0.06}>
                <Link href={section.href} className={styles.routeLink}>
                  <Icon aria-hidden="true" size={24} weight="regular" />
                  <span>
                    <strong>{section.label}</strong>
                    <small>{section.description}</small>
                  </span>
                  <ArrowRight
                    className={styles.routeArrow}
                    aria-hidden="true"
                    size={19}
                    weight="bold"
                  />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className={styles.latest} aria-labelledby="latest-title">
        <Reveal className={styles.sectionHeading}>
          <h2 id="latest-title">最近记录的成长</h2>
          <Link href="/diaries/" className={styles.textLink}>
            查看全部
            <ArrowRight aria-hidden="true" size={17} weight="bold" />
          </Link>
        </Reveal>

        <div className={styles.latestGrid}>
          {latestDiaries.map((diary, index) => {
            const author = getDiaryAuthor(diary);
            return (
              <Reveal key={diary.slug} delay={index * 0.06}>
                <article className={styles.diaryPreview}>
                  <div className={styles.diaryMeta}>
                    <span>{author.displayName}</span>
                    <time dateTime={diary.date}>
                      {dateFormatter.format(new Date(diary.date))}
                    </time>
                  </div>
                  <h3>{diary.title}</h3>
                  <p>{getDiaryPreview(diary, 72)}</p>
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
    </div>
  );
}
