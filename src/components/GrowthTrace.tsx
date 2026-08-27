import { GrowthTraceReveal } from "./GrowthTraceReveal";
import styles from "./GrowthTrace.module.css";

export type GrowthTraceProps = {
  readonly variant: "spine" | "turn" | "branch";
  readonly reveal?: boolean;
  readonly className?: string;
};

/** Local, decorative geometry. Each page owns its reserved line gutter. */
export function GrowthTrace({
  variant,
  reveal = false,
  className,
}: GrowthTraceProps) {
  return (
    <span
      aria-hidden="true"
      data-growth-trace={variant}
      className={[styles.trace, reveal && styles.hasReveal, className]
        .filter(Boolean)
        .join(" ")}
    >
      <span className={styles.base}>
        <span className={styles.line} />
        <span className={styles.node} />
      </span>
      {reveal ? <GrowthTraceReveal variant={variant} /> : null}
    </span>
  );
}
