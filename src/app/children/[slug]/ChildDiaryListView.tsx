"use client";

import Link from "next/link";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Empty,
  Space,
  Typography,
} from "antd";
import type { ChildRecord, DiaryRecord } from "@/lib/content";

const chineseDateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Shanghai",
});

function getPreview(diary: DiaryRecord): string {
  if (diary.kind === "plain") return diary.body;
  return (
    diary.fields.learned ||
    diary.fields.happiest ||
    diary.fields.message ||
    diary.fields.comment
  );
}

export default function ChildDiaryListView({
  child,
  diaries,
}: {
  child: ChildRecord;
  diaries: DiaryRecord[];
}) {
  return (
    <div>
      <Space style={{ marginBottom: 24 }}>
        <Link href="/diaries">
          <Button type="text" icon={<ArrowLeftOutlined />}>
            返回
          </Button>
        </Link>
      </Space>

      <div style={{ marginBottom: 16, textAlign: "center" }}>
        <Avatar
          size={96}
          icon={<UserOutlined />}
          style={{ backgroundColor: "#81c784" }}
        />
      </div>

      <Typography.Title
        level={2}
        className="page-heading"
        style={{ textAlign: "center" }}
      >
        {child.displayName} 的成长日记
      </Typography.Title>
      <Typography.Paragraph
        type="secondary"
        className="page-subtitle"
        style={{ textAlign: "center" }}
      >
        共 {diaries.length} 篇日记
      </Typography.Paragraph>

      <Divider className="section-divider" />

      {diaries.length === 0 ? (
        <Empty className="empty-state" description="还没有日记" />
      ) : (
        diaries.map((diary) => (
          <Link
            key={diary.slug}
            href={`/diaries/${diary.slug}`}
            style={{ display: "block", marginBottom: 12, textDecoration: "none" }}
          >
            <Card
              hoverable
              className="static-card"
              style={{ borderLeft: "3px solid #4caf50" }}
              styles={{ body: { padding: "16px 24px" } }}
            >
              <Space orientation="vertical" size={5} style={{ width: "100%" }}>
                <Typography.Text type="secondary">
                  <CalendarOutlined style={{ marginRight: 6 }} />
                  {chineseDateFormatter.format(new Date(diary.date))}
                </Typography.Text>
                <Typography.Text strong style={{ fontSize: 16, color: "#2e7d32" }}>
                  {diary.title}
                </Typography.Text>
                <Typography.Paragraph
                  ellipsis={{ rows: 2 }}
                  type="secondary"
                  style={{ margin: 0, fontSize: 13, whiteSpace: "pre-wrap" }}
                >
                  <FileTextOutlined style={{ marginRight: 6, color: "#52c41a" }} />
                  {getPreview(diary)}
                </Typography.Paragraph>
              </Space>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
}
