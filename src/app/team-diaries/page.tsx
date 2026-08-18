"use client";

import { TeamOutlined } from "@ant-design/icons";
import { Empty, Grid, Timeline, Typography } from "antd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { teamDiaries, type TeamDiaryRecord } from "@/lib/content";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const monthDayFormatter = new Intl.DateTimeFormat("zh-CN", {
  month: "numeric",
  day: "numeric",
  timeZone: "Asia/Shanghai",
});

const weekdayFormatter = new Intl.DateTimeFormat("zh-CN", {
  weekday: "long",
  timeZone: "Asia/Shanghai",
});

const fullDateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Shanghai",
});

const timeFormatter = new Intl.DateTimeFormat("zh-CN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Shanghai",
});

function DateBadge({ diary }: { diary: TeamDiaryRecord }) {
  const date = new Date(diary.date);

  return (
    <div className="team-date-badge">
      <Text strong>{monthDayFormatter.format(date)}</Text>
      <Text type="secondary">{weekdayFormatter.format(date)}</Text>
    </div>
  );
}

export default function TeamDiariesPage() {
  const screens = useBreakpoint();
  const useAlternateLayout = Boolean(screens.md);

  return (
    <div>
      <header className="team-page-header">
        <div>
          <Title level={3} className="team-page-title">
            <TeamOutlined aria-hidden="true" />
            <span>团队日志</span>
          </Title>
          <Text type="secondary">记录团队的每一天</Text>
        </div>
      </header>

      {teamDiaries.length === 0 ? (
        <Empty className="empty-state" description="还没有团队日志" />
      ) : (
        <Timeline
          mode={useAlternateLayout ? "alternate" : "start"}
          className={`team-timeline ${
            useAlternateLayout ? "team-timeline-alternate" : "team-timeline-compact"
          }`}
          items={teamDiaries.map((diary, index) => {
            const isGreen = index % 2 === 0;
            const date = new Date(diary.date);

            return {
              key: `${diary.date}-${index}`,
              color: "#4caf50",
              placement: useAlternateLayout
                ? isGreen
                  ? "end"
                  : "start"
                : undefined,
              title: useAlternateLayout ? <DateBadge diary={diary} /> : undefined,
              content: (
                <article
                  className={`team-diary-card ${
                    isGreen ? "team-diary-card-green" : "team-diary-card-blue"
                  }`}
                >
                  {!useAlternateLayout && <DateBadge diary={diary} />}
                  <Title level={4} className="team-diary-title">
                    {diary.title || fullDateFormatter.format(date)}
                  </Title>
                  <div className="markdown-body">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {diary.markdown}
                    </ReactMarkdown>
                  </div>
                  <Text type="secondary" className="team-diary-updated">
                    更新于 {timeFormatter.format(new Date(diary.updatedAt))}
                  </Text>
                </article>
              ),
            };
          })}
        />
      )}
    </div>
  );
}
