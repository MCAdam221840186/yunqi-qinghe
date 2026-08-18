# 云启青禾

“云启青禾”是一个面向老师、家长与公益支持者的公开成长记录站。网站采用自然编辑式视觉语言，保留匿名成长日记、团队日志和成员介绍，并通过 Next.js 静态导出发布到 GitHub Pages。运行时不需要数据库、服务端 API、登录状态或环境变量。

## 技术结构

- Next.js 16 App Router 与静态导出
- React Server Components 负责内容和 Markdown 渲染
- 原生语义组件、CSS Modules 与全局设计令牌
- Motion 客户端叶组件负责轻量进入和滚入动效
- Phosphor 图标与本地托管的 Geist 拉丁字体
- 自动跟随系统浅色、深色与减少动态效果设置

内容页在构建期生成。浏览器端只保留顶部导航、移动菜单和动效所需的少量脚本，不会打包完整日记 JSON 或 Markdown 解析器。

## 本地开发

环境要求：Node.js 24、npm。

```bash
npm install
npm run dev
```

提交前运行：

```bash
npm run lint
npm run typecheck
npm run build
```

`npm run build` 会将可部署文件生成到 `out/`。该目录是构建产物，不提交到 Git。

## 更新网站内容

静态内容位于：

- `src/content/children.json`：匿名成长册
- `src/content/diaries.json`：成长日记
- `src/content/team-members.json`：团队成员
- `src/content/team-diaries.json`：团队日志

`src/lib/content.ts` 会在构建期验证、关联和排序内容。新增记录时请保证 slug 唯一，只使用适合 URL 的稳定小写字符串。

- 小朋友记录使用 `slug` 和 `displayName`，公开站点应继续使用匿名展示名。
- 日记使用 `slug`、`childSlug`、`title`、`date` 和 `kind`。`kind` 为 `plain` 时填写 `body`；为 `structured` 时填写 `fields.learned`、`happiest`、`message`、`comment`。
- 团队成员使用 `name`、`role`、`description`。
- 团队日志使用 `date`、`title`、`markdown`、`updatedAt`，其中 `markdown` 支持 GitHub Flavored Markdown。

页面位图位于 `src/assets/` 并通过静态导入使用，这能保证 GitHub Pages 子路径正确。社交预览图是 `public/og-v2.jpg`。替换图片时请保留现有文件名、宽高比例和不含儿童身份信息的隐私要求。

本地 Geist 字体位于 `src/app/fonts/`，授权条款见同目录 `LICENSE.txt`。

所有提交到仓库或构建结果中的文字、姓名和图片都会公开。请只使用已获授权公开的内容，不要提交 `.env`、Token、连接字符串或其他敏感信息。

## 发布到 GitHub Pages

`.github/workflows/deploy.yml` 会在 `main` 分支更新时自动执行安装、检查、静态构建和 Pages 发布，也可以从 GitHub Actions 页面手动运行。

首次发布需要在仓库中完成一次设置：

1. 打开 **Settings → Pages**。
2. 在 **Build and deployment → Source** 中选择 **GitHub Actions**。
3. 推送到 `main`，等待 `Deploy Next.js site to Pages` 工作流完成。

工作流会读取 GitHub Pages 提供的 `base_path` 与 `base_url`。项目站点因此可以部署到 `https://<用户名>.github.io/<仓库名>/`，本地开发仍使用根路径，不需要在页面代码中写死仓库名。
