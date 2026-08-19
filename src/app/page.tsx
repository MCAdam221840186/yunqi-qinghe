import {
  ArrowRight,
  BookOpenText,
  Notebook,
  Palette,
  UsersThree,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/hero-growth.webp";
import AnimatedHero from "@/components/AnimatedHero";
import Reveal from "@/components/Reveal";
import { getArtwork } from "@/content/works";
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
  works: Palette,
} as const;

const homeSections = siteSections.filter((section) => section.id !== "works");

const worksPreview = {
  leaf: getArtwork("leaf-17"),
  kite: getArtwork("kite-03"),
  emotion: getArtwork("emotion-13"),
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
          {homeSections.map((section, index) => {
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

      <section
        className={styles.worksPreview}
        aria-labelledby="works-preview-title"
      >
        <Reveal className={styles.worksCopy}>
          <h2 id="works-preview-title">课桌展开，就是一座美术馆</h2>
          <p>
            叶片、颜色与纸上的线条，记录着孩子们怎样观察、感受和讲故事。
          </p>
          <Link className={styles.worksLink} href="/works/">
            创作展
            <ArrowRight aria-hidden="true" size={19} weight="bold" />
          </Link>
        </Reveal>

        <Reveal className={styles.worksDesk} delay={0.08} amount={0.15}>
          <figure className={`${styles.workSheet} ${styles.workLeaf}`}>
            <Image
              src={worksPreview.leaf.image}
              alt={worksPreview.leaf.alt}
              sizes="(max-width: 767px) 55vw, (max-width: 900px) 48vw, 31vw"
              placeholder="blur"
              loading="lazy"
            />
          </figure>
          <figure className={`${styles.workSheet} ${styles.workKite}`}>
            <Image
              src={worksPreview.kite.image}
              alt={worksPreview.kite.alt}
              sizes="(max-width: 767px) 48vw, (max-width: 900px) 43vw, 27vw"
              placeholder="blur"
              loading="lazy"
            />
          </figure>
          <figure className={`${styles.workSheet} ${styles.workEmotion}`}>
            <Image
              src={worksPreview.emotion.image}
              alt={worksPreview.emotion.alt}
              sizes="(max-width: 767px) 62vw, (max-width: 900px) 50vw, 30vw"
              placeholder="blur"
              loading="lazy"
            />
          </figure>
        </Reveal>
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
