"use client";

import { FileTextOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Divider, Empty, Row, Typography } from "antd";
import Link from "next/link";
import { children, getDiaryCountForChild } from "@/lib/content";

export default function DiariesPage() {
  return (
    <div>
      <Typography.Title level={2} className="page-heading">
        记录小朋友们的每一天
      </Typography.Title>
      <Typography.Paragraph type="secondary" className="page-subtitle">
        点击卡片浏览日记
      </Typography.Paragraph>

      <Divider className="section-divider" />

      {children.length === 0 ? (
        <Empty className="empty-state" description="还没有小朋友的成长记录" />
      ) : (
        <Row gutter={[16, 16]} className="child-grid">
          {children.map((child) => {
            const diaryCount = getDiaryCountForChild(child.slug);

            return (
              <Col key={child.slug} xs={12} sm={8} md={6} lg={4}>
                <Link
                  href={`/children/${child.slug}`}
                  className="child-card-link"
                  aria-label={`浏览${child.displayName}的 ${diaryCount} 篇日记`}
                >
                  <Card
                    hoverable
                    className="static-card child-card"
                    styles={{ body: { padding: 24, textAlign: "center" } }}
                  >
                    <Avatar
                      size={64}
                      icon={<UserOutlined />}
                      className="child-avatar"
                    />
                    <Typography.Text strong className="child-name">
                      {child.displayName}
                    </Typography.Text>
                    <Typography.Text type="secondary" className="diary-count">
                      <FileTextOutlined aria-hidden="true" />
                      <span>{diaryCount} 篇日记</span>
                    </Typography.Text>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}
