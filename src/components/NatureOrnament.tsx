import {
  BookOpenText,
  Leaf,
} from "@phosphor-icons/react/ssr";
import styles from "./NatureOrnament.module.css";

type SharedOrnamentProps = {
  readonly className?: string;
};

export type NatureOrnamentProps =
  | (SharedOrnamentProps & {
      readonly variant: "sprig" | "bookLeaf" | "leafSeal";
      readonly stage?: never;
    })
  | (SharedOrnamentProps & {
      readonly variant: "growthStage";
      readonly stage: 1 | 2 | 3 | 4;
    });

const growthStageClasses = {
  1: styles.stageOne,
  2: styles.stageTwo,
  3: styles.stageThree,
  4: styles.stageFour,
} as const;

function classNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function NatureOrnament(props: NatureOrnamentProps) {
  if (props.variant === "growthStage") {
    return (
      <span
        aria-hidden="true"
        className={classNames(
          styles.ornament,
          styles.growthStage,
          growthStageClasses[props.stage],
          props.className,
        )}
      >
        {Array.from({ length: props.stage }, (_, index) => (
          <Leaf
            className={classNames(
              styles.growthLeaf,
              styles[`growthLeaf${index + 1}`],
            )}
            key={index}
            weight="thin"
          />
        ))}
      </span>
    );
  }

  if (props.variant === "bookLeaf") {
    return (
      <span
        aria-hidden="true"
        className={classNames(
          styles.ornament,
          styles.bookLeaf,
          props.className,
        )}
      >
        <BookOpenText className={styles.bookIcon} weight="thin" />
        <Leaf className={styles.bookLeafIcon} weight="thin" />
      </span>
    );
  }

  if (props.variant === "leafSeal") {
    return (
      <span
        aria-hidden="true"
        className={classNames(
          styles.ornament,
          styles.leafSeal,
          props.className,
        )}
      >
        <Leaf className={styles.sealLeafIcon} weight="thin" />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={classNames(styles.ornament, styles.sprig, props.className)}
    >
      <Leaf
        className={classNames(styles.sprigLeaf, styles.sprigLeafOne)}
        weight="thin"
      />
      <Leaf
        className={classNames(styles.sprigLeaf, styles.sprigLeafTwo)}
        weight="thin"
      />
      <Leaf
        className={classNames(styles.sprigLeaf, styles.sprigLeafThree)}
        weight="thin"
      />
    </span>
  );
}
