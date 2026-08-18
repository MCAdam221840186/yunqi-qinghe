"use client";

import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Card,
  Col,
  Divider,
  Empty,
  Row,
  Space,
  Typography,
} from "antd";
import { teamMembers } from "@/lib/content";

export default function AboutPage() {
  return (
    <div>
      <Typography.Title level={2} className="page-heading">
        关于我们
      </Typography.Title>
      <Typography.Paragraph type="secondary" className="page-subtitle">
        这个日记本应用帮助老师记录和保存孩子们的成长故事。
      </Typography.Paragraph>

      <Divider className="section-divider" />

      <Typography.Title level={4} className="section-heading">
        团队成员
      </Typography.Title>

      {teamMembers.length === 0 ? (
        <Empty className="empty-state" description="团队成员资料正在整理中" />
      ) : (
        <Row gutter={[16, 16]}>
          {teamMembers.map((member, index) => (
            <Col key={`${member.name}-${index}`} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                className="static-card member-card"
                styles={{ body: { padding: 24 } }}
              >
                <Space
                  orientation="vertical"
                  align="center"
                  size={12}
                  className="member-card-content"
                >
                  <Avatar
                    size={72}
                    icon={<UserOutlined />}
                    className="member-avatar"
                  />
                  <div className="member-heading">
                    <Typography.Text strong className="member-name">
                      {member.name}
                    </Typography.Text>
                    {member.role && (
                      <Typography.Text type="secondary" className="member-role">
                        {member.role}
                      </Typography.Text>
                    )}
                  </div>
                  {member.description && (
                    <Typography.Paragraph
                      type="secondary"
                      className="member-description"
                    >
                      {member.description}
                    </Typography.Paragraph>
                  )}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
