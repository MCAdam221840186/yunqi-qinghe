import type { StaticImageData } from "next/image";
import batikClassPortrait from "@/assets/works/people/scene-batik-class-portrait.webp";
import calligraphyPractice from "@/assets/works/people/scene-calligraphy-practice.webp";
import kiteMakers from "@/assets/works/people/scene-kite-makers.webp";
import leafCollageTable from "@/assets/works/people/scene-leaf-collage-table.webp";
import picturebookMaking from "@/assets/works/people/scene-picturebook-making.webp";
import picturebookProudMaker from "@/assets/works/people/scene-picturebook-proud-maker.webp";

export type ExhibitionPhotoPlacement = "documentary" | "flight" | "closing";
export type ExhibitionPhotoOrientation = "landscape" | "portrait";
export type ExhibitionPhotoContext = "classroom" | "portrait";
export type ExhibitionPhotoFocalPosition = `${number}% ${number}%`;

export interface ExhibitionPhoto {
  readonly id: string;
  readonly image: StaticImageData;
  readonly alt: string;
  readonly placement: ExhibitionPhotoPlacement;
  readonly orientation: ExhibitionPhotoOrientation;
  readonly focalPosition: ExhibitionPhotoFocalPosition;
  readonly context: ExhibitionPhotoContext;
}

export const exhibitionPhotos = [
  {
    id: "leaf-collage-table",
    image: leafCollageTable,
    alt: "孩子们围坐在拼成一圈的课桌旁，用叶片、彩纸和胶水制作树叶拼贴画",
    placement: "documentary",
    orientation: "landscape",
    focalPosition: "52% 52%",
    context: "classroom",
  },
  {
    id: "calligraphy-practice",
    image: calligraphyPractice,
    alt: "一名孩子伏在课桌前握毛笔练习书法，宣纸上保留着深浅不同的笔画",
    placement: "documentary",
    orientation: "landscape",
    focalPosition: "67% 48%",
    context: "classroom",
  },
  {
    id: "picturebook-proud-maker",
    image: picturebookProudMaker,
    alt: "一名戴眼镜的孩子在教室里举起一册蓝色手工绘本，笑着望向镜头",
    placement: "documentary",
    orientation: "portrait",
    focalPosition: "68% 42%",
    context: "portrait",
  },
  {
    id: "picturebook-making",
    image: picturebookMaking,
    alt: "一名孩子在蓝色课桌上为手工绘本书写彩色文字，旁边摆着多色马克笔",
    placement: "documentary",
    orientation: "landscape",
    focalPosition: "50% 45%",
    context: "classroom",
  },
  {
    id: "kite-makers",
    image: kiteMakers,
    alt: "三名孩子在教室里共同举起花鸟和火箭造型的彩色风筝，展开的风筝铺满画面下半部",
    placement: "flight",
    orientation: "landscape",
    focalPosition: "52% 48%",
    context: "portrait",
  },
  {
    id: "batik-class-portrait",
    image: batikClassPortrait,
    alt: "一群孩子在教室里举起仿蜡染对称画合影，浅蓝色作品在黑板前排成一面作品墙",
    placement: "closing",
    orientation: "landscape",
    focalPosition: "50% 64%",
    context: "portrait",
  },
] as const satisfies readonly ExhibitionPhoto[];
