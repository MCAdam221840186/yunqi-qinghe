import type { StaticImageData } from "next/image";
import batik03 from "@/assets/works/batik-03.webp";
import batik08 from "@/assets/works/batik-08.webp";
import batik09 from "@/assets/works/batik-09.webp";
import batik10 from "@/assets/works/batik-10.webp";
import batik11 from "@/assets/works/batik-11.webp";
import calligraphy12 from "@/assets/works/calligraphy-12.webp";
import calligraphy18 from "@/assets/works/calligraphy-18.webp";
import calligraphy26 from "@/assets/works/calligraphy-26.webp";
import calligraphy30 from "@/assets/works/calligraphy-30.webp";
import calligraphy55 from "@/assets/works/calligraphy-55.webp";
import calligraphy58 from "@/assets/works/calligraphy-58.webp";
import emotion11 from "@/assets/works/emotion-11.webp";
import emotion13 from "@/assets/works/emotion-13.webp";
import emotion19 from "@/assets/works/emotion-19.webp";
import emotion22 from "@/assets/works/emotion-22.webp";
import emotion27 from "@/assets/works/emotion-27.webp";
import emotion28 from "@/assets/works/emotion-28.webp";
import kite03 from "@/assets/works/kite-03.webp";
import kite08 from "@/assets/works/kite-08.webp";
import kite18 from "@/assets/works/kite-18.webp";
import kite19 from "@/assets/works/kite-19.webp";
import kite21 from "@/assets/works/kite-21.webp";
import leaf02 from "@/assets/works/leaf-02.webp";
import leaf09 from "@/assets/works/leaf-09.webp";
import leaf11 from "@/assets/works/leaf-11.webp";
import leaf17 from "@/assets/works/leaf-17.webp";
import picturebook01 from "@/assets/works/picturebook-01.webp";
import picturebook04 from "@/assets/works/picturebook-04.webp";
import picturebook05 from "@/assets/works/picturebook-05.webp";
import picturebook07 from "@/assets/works/picturebook-07.webp";
import picturebook12 from "@/assets/works/picturebook-12.webp";

export type ArtworkGroup =
  | "materials"
  | "quiet"
  | "color"
  | "writing"
  | "landscape"
  | "stories"
  | "flight";

export type ArtworkRole = "feature" | "response";

export interface Artwork {
  readonly id: string;
  readonly medium: string;
  readonly group: ArtworkGroup;
  readonly role: ArtworkRole;
  readonly image: StaticImageData;
  readonly alt: string;
}

export const artworks = [
  {
    id: "leaf-17",
    medium: "树叶拼贴画",
    group: "materials",
    role: "feature",
    image: leaf17,
    alt: "红橙色纸面上的树叶拼贴画，深色叶片组成连绵山形，山脚点缀绿色叶片",
  },
  {
    id: "leaf-02",
    medium: "树叶拼贴画",
    group: "materials",
    role: "response",
    image: leaf02,
    alt: "橙色纸面上的树叶拼贴画，叶片组成树林与小鸟，手绘太阳和云朵散布其间",
  },
  {
    id: "leaf-09",
    medium: "树叶拼贴画",
    group: "materials",
    role: "response",
    image: leaf09,
    alt: "树叶拼贴成的树木与秋千，枝条从画面一侧伸向悬挂的叶片",
  },
  {
    id: "leaf-11",
    medium: "树叶拼贴画",
    group: "materials",
    role: "response",
    image: leaf11,
    alt: "蓝色水面场景中的树叶鲸鱼，叶片与手绘波纹共同组成海底画面",
  },
  {
    id: "batik-10",
    medium: "仿蜡染对称画",
    group: "materials",
    role: "response",
    image: batik10,
    alt: "暖橙色纸面上的仿蜡染画，中央粉色郁金香与两侧草莓、爱心组成对称图案",
  },
  {
    id: "batik-03",
    medium: "仿蜡染对称画",
    group: "materials",
    role: "response",
    image: batik03,
    alt: "淡蓝纸面中央的橙红色对称花纹，花瓣围绕中心向外展开",
  },
  {
    id: "batik-08",
    medium: "仿蜡染对称画",
    group: "materials",
    role: "response",
    image: batik08,
    alt: "红蓝花瓣组成的仿蜡染对称纹样，四周保留浅色晕染和纸张纹理",
  },
  {
    id: "batik-11",
    medium: "仿蜡染对称画",
    group: "materials",
    role: "response",
    image: batik11,
    alt: "红绿蓝色块构成的放射状对称纹样，中心花形向四周层层展开",
  },
  {
    id: "emotion-28",
    medium: "情绪表达画",
    group: "quiet",
    role: "feature",
    image: emotion28,
    alt: "大面积留白的情绪圆盘，黄色色块、蓝色放射线与少量符号分散在八个扇区",
  },
  {
    id: "emotion-22",
    medium: "情绪表达画",
    group: "quiet",
    role: "response",
    image: emotion22,
    alt: "以青绿和蓝色为主的情绪圆盘，多数扇区铺满近似色，仅一格叠加黑色线条",
  },
  {
    id: "batik-09",
    medium: "仿蜡染对称画",
    group: "quiet",
    role: "response",
    image: batik09,
    alt: "浅灰蓝色纸面保留大面积晕染留白，中央以橙红弧形和黄色圆形组成小图案",
  },
  {
    id: "emotion-11",
    medium: "情绪表达画",
    group: "color",
    role: "response",
    image: emotion11,
    alt: "分成八格的情绪圆盘，每一格以不同颜色、线条和纹理表达感受",
  },
  {
    id: "emotion-13",
    medium: "情绪表达画",
    group: "color",
    role: "feature",
    image: emotion13,
    alt: "蓝红绿色块组成的情绪圆盘，八个扇区中画有波纹、线条与小图案",
  },
  {
    id: "emotion-19",
    medium: "情绪表达画",
    group: "color",
    role: "response",
    image: emotion19,
    alt: "色彩明快的情绪圆盘，红黄蓝绿扇区中分布着不同符号和笔触",
  },
  {
    id: "emotion-27",
    medium: "情绪表达画",
    group: "color",
    role: "response",
    image: emotion27,
    alt: "粉蓝绿色情绪圆盘，扇区里画着问号、月亮、花朵、爱心和交织线条",
  },
  {
    id: "calligraphy-26",
    medium: "书法",
    group: "writing",
    role: "feature",
    image: calligraphy26,
    alt: "写有心想事成四个字的书法作品，墨色浓重，四字分布在方格纸上",
  },
  {
    id: "calligraphy-30",
    medium: "书法",
    group: "writing",
    role: "response",
    image: calligraphy30,
    alt: "写有心想事成四个字的书法作品，笔画舒展，纸面保留手写署名",
  },
  {
    id: "calligraphy-55",
    medium: "书法",
    group: "writing",
    role: "response",
    image: calligraphy55,
    alt: "写有心想事成四个字的书法作品，字形端正，墨色轻重各不相同",
  },
  {
    id: "calligraphy-58",
    medium: "书法",
    group: "writing",
    role: "response",
    image: calligraphy58,
    alt: "写有心想事成四个字的书法作品，四个字错落排列并保留纸张装饰",
  },
  {
    id: "calligraphy-18",
    medium: "书法",
    group: "landscape",
    role: "feature",
    image: calligraphy18,
    alt: "写有孤舟蓑笠翁、独钓寒江雪的竖向书法，黑色山水、花枝与绿色题字穿插其间",
  },
  {
    id: "calligraphy-12",
    medium: "书法",
    group: "landscape",
    role: "response",
    image: calligraphy12,
    alt: "竖向书法作品，黑色诗句与浓重墨块共同铺开，纸面下方画有弧形山坡",
  },
  {
    id: "picturebook-05",
    medium: "手工绘本封面",
    group: "stories",
    role: "response",
    image: picturebook05,
    alt: "橙色手工绘本封面，黑色图形与醒目的手写大字占据画面中央",
  },
  {
    id: "picturebook-07",
    medium: "手工绘本封面",
    group: "stories",
    role: "response",
    image: picturebook07,
    alt: "带有折痕和手作纹理的彩色绘本封面，封面写着醒目的书名",
  },
  {
    id: "picturebook-12",
    medium: "手工绘本封面",
    group: "stories",
    role: "response",
    image: picturebook12,
    alt: "蓝色手工绘本封面，手写出版社、书名和价格等仿出版信息，保留纸张毛边",
  },
  {
    id: "picturebook-01",
    medium: "手工绘本封面",
    group: "stories",
    role: "response",
    image: picturebook01,
    alt: "灰白色手工绘本封面，手写小猫日记，下方贴有骑车的卡通动物图案",
  },
  {
    id: "picturebook-04",
    medium: "手工绘本封面",
    group: "stories",
    role: "feature",
    image: picturebook04,
    alt: "亮黄色手工绘本封面，橙红太阳、绿色山丘和云朵围绕黑色手写书名展开",
  },
  {
    id: "kite-03",
    medium: "风筝",
    group: "flight",
    role: "feature",
    image: kite03,
    alt: "蓝色课桌上的花鸟形风筝，蓝色翅膀绘有粉黄花朵，尾部点缀红色与圆形纹样",
  },
  {
    id: "kite-08",
    medium: "风筝",
    group: "flight",
    role: "response",
    image: kite08,
    alt: "蓝色课桌上的花鸟形风筝，浅灰翅膀绘有绿叶与粉橙花朵，尾部点缀橙色圆环纹样",
  },
  {
    id: "kite-18",
    medium: "风筝",
    group: "flight",
    role: "response",
    image: kite18,
    alt: "蓝色课桌上的火箭形风筝，箭身绘有舷窗、星星和多束彩色火焰",
  },
  {
    id: "kite-19",
    medium: "风筝",
    group: "flight",
    role: "response",
    image: kite19,
    alt: "蓝色课桌上的猫头鹰形风筝，双翼布满羽毛纹样，身体装饰彩色图案",
  },
  {
    id: "kite-21",
    medium: "风筝",
    group: "flight",
    role: "response",
    image: kite21,
    alt: "蓝色课桌上的红色飞鸟风筝，展开的翅膀由红橙色羽毛层层组成",
  },
] as const satisfies readonly Artwork[];

export function getArtwork(id: string): Artwork {
  const artwork = artworks.find((item) => item.id === id);
  if (!artwork) throw new Error(`Unknown artwork id: ${id}`);
  return artwork;
}

export function getArtworksByGroup(group: ArtworkGroup): readonly Artwork[] {
  return artworks.filter((artwork) => artwork.group === group);
}
