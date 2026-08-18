# 云启青禾

“云启青禾”是一个面向 GitHub Pages 的纯静态成长日记网站。项目保留了原站的主要视觉设计与只读浏览体验，但不再依赖 Vercel、Neon 数据库、服务端 API、登录鉴权或在线编辑功能。

## 本地开发

环境要求：Node.js 24、npm。

```bash
npm install
npm run dev
```

提交前运行：

```bash
npm run lint
npm run build
```

`npm run build` 使用 Next.js 静态导出，并将可部署文件生成到 `out/`。该目录是构建产物，不应提交到 Git。

## 更新网站内容

网站内容保存在以下静态 JSON 文件中：

- `src/content/children.json`：小朋友资料；
- `src/content/diaries.json`：成长日记；
- `src/content/team-members.json`：团队成员；
- `src/content/team-diaries.json`：团队日志。

`src/lib/content.ts` 负责读取、关联和排序这些内容。更新 JSON 后运行 `npm run build`，构建过程会为每个已登记的 slug 生成静态详情页；新增详情内容时，请确保 slug 唯一且只使用适合 URL 的稳定字符串。

- 小朋友记录使用 `slug` 和 `displayName`；公开站点建议继续使用匿名展示名。
- 日记使用 `slug`、`childSlug`、`title`、`date` 和 `kind`。`kind` 为 `plain` 时填写 `body`；为 `structured` 时填写 `fields.learned`、`happiest`、`message`、`comment`。
- 团队成员使用 `name`、`role`、`description`。
- 团队日志使用 `date`、`title`、`markdown`、`updatedAt`；`markdown` 字段支持 GitHub Flavored Markdown。

其他站内图片可以放在 `public/`，再从页面代码中引用对应路径。团队成员默认使用匿名头像，不需要在内容文件中填写头像字段。所有提交到仓库或出现在构建结果中的文字、姓名和图片都会公开，请仅使用已获授权公开的内容，不要提交 `.env` 文件、Token 或其他敏感信息。

## 发布到 GitHub Pages

项目包含 `.github/workflows/deploy.yml`。推送到 `main` 后，GitHub Actions 会自动执行 lint、静态构建并发布 `out/`；也可以在 Actions 页面手动运行工作流。

首次发布需要在 GitHub 仓库中完成一次设置：

1. 打开 **Settings → Pages**；
2. 在 **Build and deployment → Source** 中选择 **GitHub Actions**；
3. 推送到 `main`，等待 `Deploy Next.js site to Pages` 工作流完成。

工作流会从 GitHub Pages 读取当前站点的 `base_path` 和 `base_url`，因此项目站点会自动部署到 `https://<用户名>.github.io/<仓库名>/`，本地开发仍使用根路径，无需在代码中写死仓库名。本项目不配置自定义域名。
