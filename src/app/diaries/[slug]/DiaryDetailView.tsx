"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeftOutlined,
  BookOutlined,
  CalendarOutlined,
  MessageOutlined,
  SmileOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Divider, Space, Typography } from "antd";
import type {
  ChildRecord,
  DiaryRecord,
  StructuredDiaryFields,
} from "@/lib/content";

const chineseDateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Shanghai",
});

const structuredFieldStyles: ReadonlyArray<{
  key: keyof StructuredDiaryFields;
  label: string;
  icon: ReactNode;
  background: string;
}> = [
  {
    key: "learned",
    label: "今天我学会了",
    icon: <BookOutlined style={{ color: "#52c41a", fontSize: 18 }} />,
    background: "#f6ffed",
  },
  {
    key: "happiest",
    label: "今天我最开心的事情",
    icon: <SmileOutlined style={{ color: "#faad14", fontSize: 18 }} />,
    background: "#fffbe6",
  },
  {
    key: "message",
    label: "我想对明天的自己说",
    icon: <MessageOutlined style={{ color: "#722ed1", fontSize: 18 }} />,
    background: "#f9f0ff",
  },
  {
    key: "comment",
    label: "老师评语",
    icon: <StarOutlined style={{ color: "#1890ff", fontSize: 18 }} />,
    background: "#e6f7ff",
  },
];

function StructuredDiary({ fields }: { fields: StructuredDiaryFields }) {
  return structuredFieldStyles.map((field) => {
    const value = fields[field.key];
    if (!value) return null;

    return (
      <section
        key={field.key}
        style={{
          marginBottom: 16,
          padding: "20px 24px",
          borderRadius: 12,
          background: field.background,
        }}
      >
        <Space style={{ marginBottom: 8 }}>
          {field.icon}
          <Typography.Text strong style={{ fontSize: 15 }}>
            {field.label}
          </Typography.Text>
        </Space>
        <div
          style={{
            marginTop: 4,
            color: "#262626",
            fontSize: 15,
            lineHeight: 1.8,
            whiteSpace: "pre-wrap",
          }}
        >
          {value}
        </div>
      </section>
    );
  });
}

export default function DiaryDetailView({
  diary,
  child,
}: {
  diary: DiaryRecord;
  child: ChildRecord;
}) {
  return (
    <div>
      <Space style={{ marginBottom: 24 }}>
        <Link href={`/children/${child.slug}`}>
          <Button type="text" icon={<ArrowLeftOutlined />}>
            返回
          </Button>
        </Link>
      </Space>

      <Card
        className="static-card"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}
        styles={{ body: { padding: "32px 40px" } }}
      >
        <header style={{ marginBottom: 24, textAlign: "center" }}>
          <Typography.Title level={2} className="page-heading">
            {diary.title}
          </Typography.Title>
          <Space size={16} wrap>
            <Typography.Text type="secondary">
              <UserOutlined style={{ marginRight: 4 }} />
              {child.displayName}
            </Typography.Text>
            <Typography.Text type="secondary">
              <CalendarOutlined style={{ marginRight: 4 }} />
              {chineseDateFormatter.format(new Date(diary.date))}
            </Typography.Text>
          </Space>
        </header>

        <Divider style={{ marginTop: 0, marginBottom: 24 }} />

        {diary.kind === "plain" ? (
          <div
            style={{
              color: "#262626",
              fontSize: 15,
              lineHeight: 1.8,
              whiteSpace: "pre-wrap",
            }}
          >
            {diary.body || "（暂无内容）"}
          </div>
        ) : (
          <StructuredDiary fields={diary.fields} />
        )}
      </Card>
    </div>
  );
}
