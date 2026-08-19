import { teamMembers } from "@/lib/content";
import { createPageMetadata } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "团队介绍",
  description: "了解云启青禾支教团队及参与网站记录与维护的团队成员。",
  path: "/about/",
});

function getInitial(name: string): string {
  return Array.from(name.trim())[0] ?? "青";
}

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>团队介绍</p>
        <h1>认识云启青禾与同行伙伴</h1>
      </header>

      <section className={styles.team} aria-labelledby="team-title">
        <div className={styles.sectionHeading}>
          <h2 id="team-title">团队成员</h2>
        </div>

        {teamMembers.length === 0 ? (
          <div className={styles.empty}>
            <h3>成员资料正在整理中</h3>
            <p>资料完成后会在这里展示。</p>
          </div>
        ) : (
          <ul className={styles.memberList}>
            {teamMembers.map((member, index) => (
              <li key={`${member.name}-${index}`}>
                <article className={styles.member}>
                  <span className={styles.initial} aria-hidden="true">
                    {getInitial(member.name)}
                  </span>

                  <div className={styles.memberCopy}>
                    {member.role && <p className={styles.role}>{member.role}</p>}
                    <h3>{member.name}</h3>
                    {member.description && <p>{member.description}</p>}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
