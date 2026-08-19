import { ArrowRight } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedHero from "@/components/AnimatedHero";
import {
  ArtworkLightboxProvider,
  ArtworkTrigger,
  type ArtworkLightboxItem,
} from "@/components/ArtworkLightbox";
import Reveal from "@/components/Reveal";
import {
  artworks,
  getArtwork,
  getArtworksByGroup,
  type Artwork,
} from "@/content/works";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  serializeJsonLd,
} from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "儿童创作展",
  description:
    "走进云启青禾儿童创作展，观看孩子们用纸、叶、墨与颜色完成的风筝、绘本、蜡染、情绪表达画、书法和树叶拼贴画。",
  path: "/works/",
  socialImagePath: "/works-og.jpg",
  socialImageAlt: "树叶拼贴画、花鸟风筝和情绪表达画组成的儿童创作展预览",
});

const materials = getArtworksByGroup("materials");
const colors = getArtworksByGroup("color");
const writing = getArtworksByGroup("writing");
const stories = getArtworksByGroup("stories");
const flight = getArtworksByGroup("flight");

const lightboxItems: ArtworkLightboxItem[] = artworks.map((artwork) => ({
  id: artwork.id,
  src: artwork.image.src,
  alt: artwork.alt,
  medium: artwork.medium,
  width: artwork.image.width,
  height: artwork.image.height,
}));

function classNames(...values: Array<string | undefined>): string {
  return values.filter(Boolean).join(" ");
}

interface ArtworkCardProps {
  readonly artwork: Artwork;
  readonly className?: string;
  readonly imageClassName?: string;
  readonly sizes: string;
  readonly preload?: boolean;
}

function ArtworkCard({
  artwork,
  className,
  imageClassName,
  sizes,
  preload = false,
}: ArtworkCardProps) {
  const index = artworks.findIndex((item) => item.id === artwork.id);

  return (
    <ArtworkTrigger
      index={index}
      className={classNames(styles.artworkButton, className)}
    >
      <Image
        src={artwork.image}
        alt={artwork.alt}
        className={classNames(styles.artworkImage, imageClassName)}
        sizes={sizes}
        placeholder="blur"
        preload={preload}
        loading={preload ? undefined : "lazy"}
      />
    </ArtworkTrigger>
  );
}

export default function WorksPage() {
  const heroLeaf = getArtwork("leaf-17");
  const heroKite = getArtwork("kite-03");
  const heroEmotion = getArtwork("emotion-13");
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "首页", path: "/" },
    { name: "创作展", path: "/works/" },
  ]);

  return (
    <ArtworkLightboxProvider items={lightboxItems}>
      <div className={styles.page}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(breadcrumbJsonLd),
          }}
        />

        <header className={styles.hero} aria-labelledby="works-title">
          <AnimatedHero className={styles.heroCopy}>
            <p className={styles.eyebrow}>儿童创作展</p>
            <h1 id="works-title">课桌展开，就是一座美术馆</h1>
            <p className={styles.heroLead}>
              纸、叶、墨和颜色，在孩子们手里变成了没有标准答案的世界。
            </p>
          </AnimatedHero>

          <div className={styles.heroDesk} aria-label="创作展精选作品">
            <AnimatedHero className={styles.heroLeaf}>
              <ArtworkCard
                artwork={heroLeaf}
                className={styles.tiltLeft}
                imageClassName={styles.heroCrop}
                sizes="(max-width: 767px) 72vw, 46vw"
                preload
              />
            </AnimatedHero>
            <AnimatedHero className={styles.heroKite}>
              <ArtworkCard
                artwork={heroKite}
                className={styles.tiltRight}
                imageClassName={styles.heroCrop}
                sizes="(max-width: 767px) 56vw, 28vw"
              />
            </AnimatedHero>
            <AnimatedHero className={styles.heroEmotion}>
              <ArtworkCard
                artwork={heroEmotion}
                className={styles.tiltSoftLeft}
                imageClassName={styles.heroCrop}
                sizes="(max-width: 767px) 44vw, 20vw"
              />
            </AnimatedHero>
          </div>
        </header>

        <section className={styles.materials} aria-labelledby="materials-title">
          <Reveal className={styles.chapterHeading}>
            <h2 id="materials-title">材料落到纸上</h2>
            <p>
              叶片保留纹路，蜡染借来对称。熟悉的材料，被重新组合成山、花和动物。
            </p>
          </Reveal>

          <div className={styles.materialsDesk}>
            {materials.map((artwork, index) => {
              const slots = [
                styles.materialOne,
                styles.materialTwo,
                styles.materialThree,
                styles.materialFour,
                styles.materialFive,
                styles.materialSix,
              ];
              const tilts = [
                styles.tiltLeft,
                styles.tiltRight,
                styles.tiltSoftLeft,
                styles.tiltRight,
                styles.tiltLeft,
                styles.tiltSoftRight,
              ];

              return (
                <Reveal
                  key={artwork.id}
                  className={slots[index]}
                  delay={index * 0.045}
                >
                  <ArtworkCard
                    artwork={artwork}
                    className={tilts[index]}
                    sizes="(max-width: 767px) 88vw, (max-width: 1100px) 45vw, 32vw"
                  />
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className={styles.colors} aria-labelledby="colors-title">
          <Reveal className={styles.chapterHeading}>
            <h2 id="colors-title">颜色有自己的位置</h2>
            <p>
              每个圆盘都从同一张模板出发，却用颜色和符号留下不同的感受。
            </p>
          </Reveal>

          <div className={styles.colorField}>
            {colors.map((artwork, index) => (
              <Reveal
                key={artwork.id}
                className={styles[`color${index + 1}`]}
                delay={index * 0.06}
              >
                <ArtworkCard
                  artwork={artwork}
                  className={
                    index % 2 === 0 ? styles.tiltSoftLeft : styles.tiltSoftRight
                  }
                  sizes="(max-width: 767px) 44vw, 28vw"
                />
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.writing} aria-labelledby="writing-title">
          <Reveal className={styles.chapterHeading}>
            <h2 id="writing-title">同一句话，不同笔迹</h2>
            <p>
              心想事成被写了四次。轻重、停顿和留白，让相同的字有了不同声音。
            </p>
          </Reveal>

          <div className={styles.writingRow}>
            {writing.map((artwork, index) => (
              <Reveal
                key={artwork.id}
                className={styles[`writing${index + 1}`]}
                delay={index * 0.055}
              >
                <ArtworkCard
                  artwork={artwork}
                  className={index % 2 === 0 ? styles.tiltLeft : styles.tiltRight}
                  sizes="(max-width: 767px) 46vw, 22vw"
                />
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.stories} aria-labelledby="stories-title">
          <Reveal className={styles.chapterHeading}>
            <h2 id="stories-title">故事先从封面开始</h2>
            <p>
              这里展示的是孩子们手工制作的绘本封面。书名、纸张和颜色，先为故事打开一扇门。
            </p>
          </Reveal>

          <div className={styles.storyShelf}>
            {stories.map((artwork, index) => (
              <Reveal
                key={artwork.id}
                className={styles[`story${index + 1}`]}
                delay={index * 0.07}
              >
                <ArtworkCard
                  artwork={artwork}
                  className={
                    index === 1 ? styles.tiltRight : styles.tiltSoftLeft
                  }
                  sizes="(max-width: 767px) 70vw, 31vw"
                />
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.flight} aria-labelledby="flight-title">
          <Reveal className={styles.chapterHeading}>
            <h2 id="flight-title">把想象放进风里</h2>
            <p>
              火箭、猫头鹰、花鸟和鱼从同一张课桌起飞，带着各自的颜色。
            </p>
          </Reveal>

          <ul
            className={styles.flightTrack}
            aria-label="风筝作品横向展架"
            tabIndex={0}
          >
            {flight.map((artwork, index) => (
              <li key={artwork.id}>
                <Reveal delay={index * 0.045}>
                  <ArtworkCard
                    artwork={artwork}
                    className={
                      index % 2 === 0 ? styles.tiltSoftLeft : styles.tiltSoftRight
                    }
                    sizes="(max-width: 767px) 84vw, 48vw"
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <Reveal className={styles.closing}>
          <h2>同一张课桌，装得下很多种答案。</h2>
          <Link href="/diaries/">
            成长日志
            <ArrowRight aria-hidden="true" size={19} weight="bold" />
          </Link>
        </Reveal>
      </div>
    </ArtworkLightboxProvider>
  );
}
