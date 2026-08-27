import Image from "next/image";
import teamGroupImage from "@/assets/team-group.webp";
import DisplayHeading from "@/components/DisplayHeading";
import headingStyles from "@/components/DisplayHeading.module.css";
import { NatureOrnament } from "@/components/NatureOrnament";
import { teamMembers } from "@/lib/content";
import { createPageMetadata } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "团队介绍",
  description:
    "了解南京大学“云启青禾”支教团、团队成员，以及在云南省双柏县开展的支教与少儿阅读生态调研。",
  path: "/about/",
});

const teamIntroduction = [
  "南京大学“云启青禾”支教团是信息管理学院指导下，由 8 名来自不同学院的学子组成的校级重点暑期社会实践团队，专业覆盖文理工多个领域，成员梯队涵盖本科一年级至博士一年级，于暑期前往云南省楚雄彝族自治州双柏县开展支教与调研实践活动。",
  "团队成员将完成为期两周的乡村夏令营支教和调研工作，以“AI科普+五育并举”为核心，开设阅读推广、非遗传承、科学科普等多元素质课程；并针对当地少儿群体，采取访谈、实地走访、问卷调查等形式，开展关于双柏县民族山区少儿阅读生态现状的全域调研。",
] as const;

function getInitial(name: string): string {
  return Array.from(name.trim())[0] ?? "青";
}

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={headingStyles.eyebrow}>团队介绍</p>
        <DisplayHeading
          as="h1"
          variant="pageHero"
          lines={[
            { before: "认识云启青禾" },
            {
              before: "与",
              accent: "同行伙伴",
              tone: "primary",
            },
          ]}
        />
        <NatureOrnament
          variant="sprig"
          className={styles.headerOrnament}
        />
      </header>

      <section className={styles.profile} aria-labelledby="team-profile-title">
        <figure className={styles.profileVisual}>
          <Image
            src={teamGroupImage}
            alt="云启青禾支教团队八名成员在活动现场合照"
            sizes="(max-width: 899px) calc(100vw - 2rem), (max-width: 1180px) 58vw, 680px"
          />
        </figure>

        <div className={styles.profileCopy}>
          <h2 id="team-profile-title" className={headingStyles.sectionTitle}>
            文理工交融的支教团队
          </h2>
          {teamIntroduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className={styles.team} aria-labelledby="team-title">
        <div className={styles.sectionHeading}>
          <h2 id="team-title" className={headingStyles.sectionTitle}>
            团队成员
          </h2>
          <NatureOrnament
            variant="sprig"
            className={styles.sectionOrnament}
          />
        </div>

        {teamMembers.length === 0 ? (
          <div className={styles.empty}>
            <h3 className={headingStyles.stateTitle}>成员资料正在整理中</h3>
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
                    {member.role && (
                      <p className={`${headingStyles.eyebrow} ${styles.role}`}>
                        {member.role}
                      </p>
                    )}
                    <h3 className={headingStyles.contentTitle}>
                      {member.name}
                    </h3>
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
