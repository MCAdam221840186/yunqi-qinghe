import type { CSSProperties } from "react";
import archMask from "@/assets/botanical/canopy-arch-mask.webp";
import sideMask from "@/assets/botanical/canopy-side-mask.webp";
import styles from "./BotanicalCanopy.module.css";

type BotanicalCanopySharedProps = {
  readonly className?: string;
  readonly density?: "quiet" | "lush";
};

export type BotanicalCanopyProps =
  | (BotanicalCanopySharedProps & {
      readonly variant: "arch" | "shadowBand";
      readonly side?: never;
    })
  | (BotanicalCanopySharedProps & {
      readonly variant: "side";
      readonly side: "start" | "end";
    });

type BotanicalMaskStyle = CSSProperties & {
  readonly "--botanical-mask-image": string;
};

function classNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

/**
 * Static, theme-aware botanical scenery.
 *
 * The imported WebP files are alpha-only masks. Page modules own placement,
 * size and crop; the component owns colour, depth and accessibility.
 */
export function BotanicalCanopy({
  className,
  density = "quiet",
  ...props
}: BotanicalCanopyProps) {
  const isSide = props.variant === "side";
  const mask = isSide ? sideMask : archMask;
  const maskStyle: BotanicalMaskStyle = {
    "--botanical-mask-image": `url("${mask.src}")`,
  };

  return (
    <span
      aria-hidden="true"
      className={classNames(
        styles.canopy,
        styles[props.variant],
        styles[density],
        className,
      )}
      data-botanical-canopy=""
      data-side={isSide ? props.side : undefined}
      style={maskStyle}
    >
      <span className={styles.orientation}>
        <span className={classNames(styles.layer, styles.farLayer)} />
        <span className={classNames(styles.layer, styles.shadowLayer)} />
        <span className={classNames(styles.layer, styles.nearLayer)} />
      </span>
    </span>
  );
}

export default BotanicalCanopy;
