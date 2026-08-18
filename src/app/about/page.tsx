import { teamMembers } from "@/lib/content";
import { createPageMetadata } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "团队成员",
  description: "了解维护云启青禾静态成长日记网站的团队成员。",
  path: "/about/",
});

function getInitial(name: string): string {
  return Array.from(name.trim())[0] ?? "青";
}

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>关于我们</p>
        <h1>让真实的成长，被温柔地保存下来</h1>
        <p className={styles.intro}>
          这个静态成长日记网站帮助老师记录和保存孩子们的成长故事。
        </p>
      </header>

      <section className={styles.team} aria-labelledby="team-title">
        <div className={styles.sectionHeading}>
          <h2 id="team-title">团队成员</h2>
          <p>网站由成员持续维护，成员资料来自现有公开内容。</p>
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
