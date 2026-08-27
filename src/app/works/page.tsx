import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArtworkLightboxProvider,
  ArtworkTrigger,
  type ArtworkLightboxItem,
} from "@/components/ArtworkLightbox";
import { BotanicalCanopy } from "@/components/BotanicalCanopy";
import DisplayHeading from "@/components/DisplayHeading";
import headingStyles from "@/components/DisplayHeading.module.css";
import WorksHorizontalTrack from "@/components/WorksHorizontalTrack";
import WorksMotionRoot from "@/components/WorksMotionRoot";
import {
  WorksMotionLayer,
  WorksMotionScene,
} from "@/components/WorksMotionScene";
import {
  exhibitionPhotos,
  type ExhibitionPhoto,
} from "@/content/exhibition-photos";
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
const quiet = getArtworksByGroup("quiet");
const colors = getArtworksByGroup("color");
const writing = getArtworksByGroup("writing");
const landscape = getArtworksByGroup("landscape");
const stories = getArtworksByGroup("stories");
const flight = getArtworksByGroup("flight");

const documentaryPhotos = exhibitionPhotos.filter(
  (photo) => photo.placement === "documentary",
);
const flightPhoto = exhibitionPhotos.find(
  (photo) => photo.placement === "flight",
);
const closingPhoto = exhibitionPhotos.find(
  (photo) => photo.placement === "closing",
);

const lightboxItems: ArtworkLightboxItem[] = artworks.map((artwork) => ({
  id: artwork.id,
  src: artwork.image.src,
  alt: artwork.alt,
  medium: artwork.medium,
  width: artwork.image.width,
  height: artwork.image.height,
}));

const materialEntrances = [
  { fromX: -34, fromY: 30, fromRotate: -4.5 },
  { fromX: 34, fromY: 26, fromRotate: 3.8 },
  { fromX: -28, fromY: 34, fromRotate: -3 },
  { fromX: 24, fromY: 26, fromRotate: 3.3 },
  { fromX: -20, fromY: 28, fromRotate: -2.4 },
  { fromX: 28, fromY: 30, fromRotate: 2.8 },
  { fromX: -18, fromY: 24, fromRotate: -2.2 },
  { fromX: 20, fromY: 24, fromRotate: 2.2 },
] as const;

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
        placeholder={preload ? "blur" : "empty"}
        preload={preload}
        loading={preload ? undefined : "lazy"}
        draggable={false}
      />
    </ArtworkTrigger>
  );
}

interface ExhibitionPhotoFigureProps {
  readonly photo: ExhibitionPhoto;
  readonly className?: string;
  readonly sizes: string;
}

function ExhibitionPhotoFigure({
  photo,
  className,
  sizes,
}: ExhibitionPhotoFigureProps) {
  return (
    <figure
      className={classNames(styles.photoFigure, className)}
      data-orientation={photo.orientation}
      data-context={photo.context}
    >
      <Image
        src={photo.image}
        alt={photo.alt}
        className={styles.photoImage}
        sizes={sizes}
        style={{ objectPosition: photo.focalPosition }}
        loading="lazy"
      />
    </figure>
  );
}

interface ChapterHeadingProps {
  readonly id: string;
  readonly className?: string;
  readonly lines: Parameters<typeof DisplayHeading>[0]["lines"];
  readonly children: ReactNode;
  readonly marker?: "line" | "none";
}

function ChapterHeading({
  id,
  className,
  lines,
  children,
  marker = "none",
}: ChapterHeadingProps) {
  return (
    <WorksMotionLayer
      className={classNames(styles.chapterHeading, className)}
      data-marker={marker}
      fromY={22}
      fromScale={1}
    >
      <DisplayHeading
        as="h2"
        id={id}
        variant="galleryChapter"
        lines={lines}
      />
      <p>{children}</p>
    </WorksMotionLayer>
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
      <WorksMotionRoot>
        <div className={styles.page}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: serializeJsonLd(breadcrumbJsonLd),
            }}
          />

          <WorksMotionScene
            as="header"
            className={styles.hero}
            aria-labelledby="works-title"
            amount={0.1}
            stagger={0.08}
          >
            <BotanicalCanopy
              variant="arch"
              density="quiet"
              className={styles.heroCanopy}
            />
            <WorksMotionLayer
              className={styles.heroCopy}
              fromX={-28}
              fromY={18}
              fromScale={1}
            >
              <p className={headingStyles.eyebrow}>儿童创作展</p>
              <DisplayHeading
                as="h1"
                id="works-title"
                variant="galleryHero"
                lines={[
                  { before: "课桌展开，" },
                  { accent: "就是一座美术馆", tone: "primary" },
                ]}
              />
              <p className={styles.heroLead}>
                纸、叶、墨和颜色，在孩子们手里变成了没有标准答案的世界。
              </p>
            </WorksMotionLayer>

            <div
              className={styles.heroDesk}
              role="group"
              aria-label="创作展精选作品"
            >
              <WorksMotionLayer
                className={styles.heroLeaf}
                fromX={54}
                fromY={36}
                fromRotate={-5}
                fromScale={0.96}
              >
                <ArtworkCard
                  artwork={heroLeaf}
                  className={styles.tiltLeft}
                  imageClassName={styles.heroCrop}
                  sizes="(max-width: 767px) 72vw, 46vw"
                  preload
                />
              </WorksMotionLayer>
              <WorksMotionLayer
                className={styles.heroKite}
                fromX={46}
                fromY={-24}
                fromRotate={6}
                fromScale={0.95}
                delay={0.08}
              >
                <ArtworkCard
                  artwork={heroKite}
                  className={styles.tiltRight}
                  imageClassName={styles.heroCrop}
                  sizes="(max-width: 767px) 56vw, 28vw"
                />
              </WorksMotionLayer>
              <WorksMotionLayer
                className={styles.heroEmotion}
                fromX={-22}
                fromY={30}
                fromRotate={-4}
                fromScale={0.94}
                delay={0.14}
              >
                <ArtworkCard
                  artwork={heroEmotion}
                  className={styles.tiltSoftLeft}
                  imageClassName={styles.heroCrop}
                  sizes="(max-width: 767px) 44vw, 20vw"
                />
              </WorksMotionLayer>
            </div>
          </WorksMotionScene>

          <nav className={styles.exhibitionMap} aria-label="创作展章节">
            <div className={styles.exhibitionMapInner}>
              <span aria-hidden="true">01</span>
              <a href="#materials">材料</a>
              <a href="#quiet">留白</a>
              <a href="#color">颜色</a>
              <a href="#writing">笔迹</a>
              <a href="#landscape">风景</a>
              <a href="#stories">封面</a>
              <a href="#flight">飞行</a>
            </div>
          </nav>

          <WorksMotionScene
            as="section"
            id="materials"
            className={styles.materials}
            aria-labelledby="materials-title"
            amount={0.08}
            stagger={0.045}
          >
            <WorksMotionLayer
              className={styles.materialsShadowLayer}
              fromY={18}
              fromScale={1}
              duration={0.82}
            >
              <BotanicalCanopy
                variant="shadowBand"
                density="quiet"
                className={styles.materialsShadowBand}
              />
            </WorksMotionLayer>

            <ChapterHeading
              id="materials-title"
              className={styles.materialsHeading}
              marker="line"
              lines={[{ before: "材料落到纸上" }]}
            >
              叶片保留纹路，蜡染借来对称。熟悉的材料，被重新组合成山、花和动物。
            </ChapterHeading>

            <div className={styles.materialsDesk}>
              {materials.map((artwork, index) => {
                const entrance = materialEntrances[index];
                return (
                  <WorksMotionLayer
                    key={artwork.id}
                    className={styles.materialItem}
                    data-role={artwork.role}
                    data-drift={index % 2 === 0 ? "forward" : "back"}
                    fromX={entrance.fromX}
                    fromY={entrance.fromY}
                    fromRotate={entrance.fromRotate}
                    fromScale={0.97}
                    delay={index * 0.025}
                  >
                    <div className={styles.materialMotionSurface}>
                      <ArtworkCard
                        artwork={artwork}
                        className={
                          index % 2 === 0
                            ? styles.tiltSoftLeft
                            : styles.tiltSoftRight
                        }
                        sizes="(max-width: 767px) 88vw, (max-width: 1100px) 42vw, 31vw"
                      />
                    </div>
                  </WorksMotionLayer>
                );
              })}
            </div>
          </WorksMotionScene>

          <WorksMotionScene
            as="section"
            id="quiet"
            className={styles.quiet}
            aria-labelledby="quiet-title"
            stagger={0.08}
          >
            <ChapterHeading
              id="quiet-title"
              className={styles.quietHeading}
              lines={[{ before: "留白也是" }, { accent: "答案" }]}
            >
              有的情绪很满，有的只留下几道线。没有画满，也是一种表达。
            </ChapterHeading>

            <div className={styles.quietField}>
              {quiet.map((artwork, index) => (
                <WorksMotionLayer
                  key={artwork.id}
                  className={styles.quietItem}
                  data-role={artwork.role}
                  fromX={index === 1 ? 30 : -24}
                  fromY={24 + index * 7}
                  fromRotate={index === 2 ? 2.5 : -1.8}
                  fromScale={0.98}
                >
                  <ArtworkCard
                    artwork={artwork}
                    className={
                      index === 1 ? styles.tiltSoftRight : styles.tiltSoftLeft
                    }
                    sizes="(max-width: 767px) 88vw, 38vw"
                  />
                </WorksMotionLayer>
              ))}
            </div>
          </WorksMotionScene>

          <WorksMotionScene
            as="section"
            id="color"
            className={styles.colors}
            aria-labelledby="colors-title"
            stagger={0.065}
          >
            <ChapterHeading
              id="colors-title"
              className={styles.colorsHeading}
              lines={[{ before: "颜色有自己的" }, { accent: "位置" }]}
            >
              每个圆盘都从同一张模板出发，却用颜色和符号留下不同的感受。
            </ChapterHeading>

            <div className={styles.colorField}>
              {colors.map((artwork, index) => (
                <WorksMotionLayer
                  key={artwork.id}
                  className={styles.colorItem}
                  fromX={index % 2 === 0 ? -26 : 26}
                  fromY={24 + index * 3}
                  fromRotate={index % 2 === 0 ? -2.4 : 2.4}
                  fromScale={0.96}
                >
                  <ArtworkCard
                    artwork={artwork}
                    className={
                      index % 2 === 0
                        ? styles.tiltSoftLeft
                        : styles.tiltSoftRight
                    }
                    sizes="(max-width: 767px) 44vw, 25vw"
                  />
                </WorksMotionLayer>
              ))}
            </div>
          </WorksMotionScene>

          <WorksMotionScene
            as="section"
            className={styles.documentary}
            aria-labelledby="documentary-title"
            amount={0.08}
            stagger={0.07}
          >
            <ChapterHeading
              id="documentary-title"
              className={styles.documentaryHeading}
              lines={[
                { before: "把作品" },
                { before: "举起来", tone: "primary" },
              ]}
            >
              作品被举起以前，手先在纸面、叶片和墨色之间来回。课堂里的专注，也留在这些画面里。
            </ChapterHeading>

            <div className={styles.documentaryMosaic}>
              {documentaryPhotos.map((photo, index) => (
                <WorksMotionLayer
                  key={photo.id}
                  className={styles.documentaryItem}
                  fromX={index % 2 === 0 ? -30 : 30}
                  fromY={28}
                  fromRotate={index === 2 ? 2 : index === 1 ? -1.5 : 0}
                  fromScale={0.98}
                >
                  <ExhibitionPhotoFigure
                    photo={photo}
                    sizes="(max-width: 767px) 100vw, 52vw"
                  />
                </WorksMotionLayer>
              ))}
            </div>
          </WorksMotionScene>

          <WorksMotionScene
            as="section"
            id="writing"
            className={styles.writing}
            aria-labelledby="writing-title"
            stagger={0.06}
          >
            <ChapterHeading
              id="writing-title"
              className={styles.writingHeading}
              lines={[
                { before: "同一句话，" },
                { before: "不同笔迹", tone: "primary" },
              ]}
            >
              心想事成被写了四次。轻重、停顿和留白，让相同的字有了不同声音。
            </ChapterHeading>

            <div className={styles.writingRow}>
              {writing.map((artwork, index) => (
                <WorksMotionLayer
                  key={artwork.id}
                  className={styles.writingItem}
                  fromY={30 + index * 4}
                  fromRotate={index % 2 === 0 ? -2.8 : 2.8}
                  fromScale={0.97}
                >
                  <ArtworkCard
                    artwork={artwork}
                    className={
                      index % 2 === 0 ? styles.tiltLeft : styles.tiltRight
                    }
                    sizes="(max-width: 767px) 46vw, 21vw"
                  />
                </WorksMotionLayer>
              ))}
            </div>
          </WorksMotionScene>

          <WorksMotionScene
            as="section"
            id="landscape"
            className={styles.landscape}
            aria-labelledby="landscape-title"
            stagger={0.1}
          >
            <ChapterHeading
              id="landscape-title"
              className={styles.landscapeHeading}
              lines={[{ before: "字也能长成" }, { accent: "风景" }]}
            >
              一行字向下生长，山、树和墨色也走进纸面。书写不只是在临摹，也在重新安排一幅画。
            </ChapterHeading>

            <div className={styles.landscapeStage}>
              {landscape.map((artwork, index) => (
                <WorksMotionLayer
                  key={artwork.id}
                  className={styles.landscapeItem}
                  fromX={index === 0 ? 34 : -34}
                  fromY={30}
                  fromRotate={index === 0 ? 2.8 : -2.8}
                  fromScale={0.97}
                >
                  <ArtworkCard
                    artwork={artwork}
                    className={
                      index === 0 ? styles.tiltSoftRight : styles.tiltSoftLeft
                    }
                    sizes="(max-width: 767px) 88vw, 38vw"
                  />
                </WorksMotionLayer>
              ))}
            </div>
          </WorksMotionScene>

          <WorksMotionScene
            as="section"
            id="stories"
            className={styles.stories}
            aria-labelledby="stories-title"
            stagger={0.065}
          >
            <ChapterHeading
              id="stories-title"
              className={styles.storiesHeading}
              lines={[{ before: "故事先从" }, { accent: "封面开始" }]}
            >
              这里展示的是孩子们手工制作的绘本封面。书名、纸张和颜色，先为故事打开一扇门。
            </ChapterHeading>

            <WorksHorizontalTrack
              className={styles.storyShelf}
              progressClassName={styles.storyProgress}
              controlsClassName={styles.storyControls}
              controlsLabel="绘本封面展架"
              aria-label="手工绘本封面横向展架"
            >
              {stories.map((artwork, index) => (
                <li key={artwork.id} className={styles.storyItem}>
                  <WorksMotionLayer
                    fromY={26}
                    fromRotate={index % 2 === 0 ? -2.5 : 2.5}
                    fromScale={0.97}
                  >
                    <ArtworkCard
                      artwork={artwork}
                      className={
                        index % 2 === 0
                          ? styles.tiltSoftLeft
                          : styles.tiltSoftRight
                      }
                      sizes="(max-width: 767px) 72vw, 31vw"
                    />
                  </WorksMotionLayer>
                </li>
              ))}
            </WorksHorizontalTrack>
          </WorksMotionScene>

          <WorksMotionScene
            as="section"
            id="flight"
            className={styles.flight}
            aria-labelledby="flight-title"
            stagger={0.055}
          >
            <ChapterHeading
              id="flight-title"
              className={styles.flightHeading}
              lines={[{ before: "把想象放进风里" }]}
            >
              火箭、猫头鹰、花鸟和飞鹰从同一张课桌起飞，带着各自的颜色。
            </ChapterHeading>

            <WorksHorizontalTrack
              className={styles.flightTrack}
              progressClassName={styles.flightProgress}
              controlsClassName={styles.flightControls}
              controlsLabel="风筝作品展架"
              aria-label="风筝作品横向展架"
              tabIndex={0}
            >
              {flight.map((artwork, index) => (
                <li key={artwork.id}>
                  <WorksMotionLayer
                    fromY={24}
                    fromRotate={index % 2 === 0 ? -2.1 : 2.1}
                    fromScale={0.98}
                  >
                    <ArtworkCard
                      artwork={artwork}
                      className={
                        index % 2 === 0
                          ? styles.tiltSoftLeft
                          : styles.tiltSoftRight
                      }
                      sizes="(max-width: 767px) 84vw, 45vw"
                    />
                  </WorksMotionLayer>
                </li>
              ))}
            </WorksHorizontalTrack>

            {flightPhoto ? (
              <WorksMotionLayer
                className={styles.flightPortrait}
                fromX={36}
                fromY={34}
                fromScale={0.98}
              >
                <ExhibitionPhotoFigure
                  photo={flightPhoto}
                  sizes="(max-width: 767px) 100vw, 76vw"
                />
              </WorksMotionLayer>
            ) : null}
          </WorksMotionScene>

          {closingPhoto ? (
            <WorksMotionScene
              as="section"
              className={styles.closingPortrait}
              aria-label="孩子们与作品的合影"
              amount={0.12}
            >
              <WorksMotionLayer
                className={styles.closingPortraitLayer}
                fromY={34}
                fromScale={0.985}
              >
                <ExhibitionPhotoFigure
                  photo={closingPhoto}
                  className={styles.closingPortraitFigure}
                  sizes="100vw"
                />
              </WorksMotionLayer>
            </WorksMotionScene>
          ) : null}
        </div>
      </WorksMotionRoot>
    </ArtworkLightboxProvider>
  );
}
