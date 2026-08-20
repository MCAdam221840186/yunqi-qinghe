import styles from "./DisplayHeading.module.css";

export interface DisplayHeadingProps {
  readonly as: "h1" | "h2";
  readonly id?: string;
  readonly variant:
    | "brandHero"
    | "pageHero"
    | "galleryHero"
    | "galleryChapter"
    | "statement"
    | "section";
  readonly lines: readonly {
    readonly before?: string;
    readonly accent?: string;
    readonly after?: string;
    readonly tone?: "primary" | "muted";
  }[];
}

export default function DisplayHeading({
  as,
  id,
  variant,
  lines,
}: DisplayHeadingProps) {
  const Heading = as;

  return (
    <Heading id={id} className={`${styles.heading} ${styles[variant]}`}>
      {lines.map((line, index) => {
        const toneClass = line.tone
          ? styles[line.tone === "primary" ? "tonePrimary" : "toneMuted"]
          : "";

        return (
          <span
            className={`${styles.line} ${toneClass}`.trim()}
            key={`${line.before ?? ""}-${line.accent ?? ""}-${line.after ?? ""}-${index}`}
          >
            {line.before}
            {line.accent ? (
              <span className={styles.accent}>{line.accent}</span>
            ) : null}
            {line.after}
          </span>
        );
      })}
    </Heading>
  );
}
