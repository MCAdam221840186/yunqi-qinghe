# 云启青禾

“云启青禾”是云启青禾支教团队面向老师、家长、志愿者与公益支持者的公开展示站。网站以团队行动为第一叙事，同时保存 40 位孩子的 157 份真实成长记录，并通过 Next.js 静态导出发布到 GitHub Pages。运行时不需要数据库、服务端 API、登录状态或环境变量。

## 技术结构

- Next.js 16 App Router 与静态导出
- React Server Components 负责内容关联、校验和页面输出
- 原生语义组件、CSS Modules 与全局设计令牌
- 少量客户端叶组件负责导航、可控横向轨道和原生对话框大图查看器
- Motion 只用于轻量进入与交互反馈
- Phosphor 图标与本地托管的 Geist 拉丁字体
- 自动跟随系统浅色、深色与减少动态效果设置

内容页在构建期完整生成。目录只加载少量代表图和缩略图，全尺寸成长卡仅在单卡详情页或打开大图查看器时加载。

## 本地开发

环境要求：Node.js 24、npm。

```bash
npm install
npm run dev
```

提交前运行：

```bash
npm run growth-content:check
npm run growth-cards:check-public
npm run growth-cards:check
npm run lint
npm run typecheck
npm run build
```

`npm run build` 会将可部署文件生成到 `out/`。该目录是构建产物，不提交到 Git。

## 成长记录内容与图片

本批源材料共 161 张，其中 157 张能够按“真实姓名 + 真实班级”归并到 40 位孩子并公开展示。另有 4 张自由书写页没有姓名或班级，且无法通过现有材料可靠确认归属，因此只在内部清单中记录排除原因，不生成公开图片、数据或页面。技术 URL 使用稳定的 `student-001` 与 `student-001-session-01-a` 一类 ASCII slug，页面显示材料中的真实信息。

关键文件：

- `src/content/growth-records.generated.ts`：人工核对后的儿童故事、完整转写、日期标签、排序与主题
- `scripts/build-growth-review.mjs`：本批审校转写、人工成长节点与成长故事的规范内容源
- `scripts/growth-records.review.json`：保留源索引和核对说明的内部审校清单
- `scripts/growth-cards-manifest.json`：161 张源图的方向、裁切、归属或排除原因清单
- `scripts/process-growth-cards.mjs`：Sharp 图片预处理和可重复性检查
- `src/content/growth-card-assets.generated.ts`：由图片脚本生成的静态导入注册表
- `src/assets/growth-cards/`：可公开的高质量 WebP 与约 480px 缩略图
- `src/content/team-members.json`：团队成员
- `src/content/team-diaries.json`：团队日志

原始导入目录 `../成长记录卡` 不进入仓库。更新审校内容后先重新生成公开数据，再生成或检查公开图片：

```bash
npm run growth-content
npm run growth-cards
npm run growth-content:check
npm run growth-cards:check-public
npm run growth-cards:check
```

`src/lib/content.ts` 会在构建期验证儿童、卡片、图片、成长节点和代表卡引用，要求正好 40 位孩子与 157 张公开材料且无重复、无遗漏、无孤儿。内容检查会核对规范审校源、生成文件与清单映射；公开图片检查不依赖私有原图，也会验证 314 个 WebP 的格式、尺寸、元数据、文件集合与静态注册表。完整图片检查同时验证 161 张源材料全部进入清单、157 张公开、4 张因缺失归属而排除及输出可重复性。原卡日期缺失或存疑时，公开页忠实显示原始标签，时间排序使用独立 `sessionOrder`，不得为补齐时间线而推断日期。字迹无法可靠辨认时不补猜，并在相应详情页展示核对说明。

## 公开授权与边界

本批材料中的真实姓名、班级、手写内容、教师评语、教师署名和原卡图片已确认获得完整公开展示授权。网站对 40 位孩子的 157 张可归属材料使用真实信息，不使用匿名占位语气。4 张无法确认归属的材料即使属于本批授权范围，也不猜测、不发布。

该确认只适用于当前批次。未来新增任何儿童或教师材料，仍须逐批确认公开范围和授权后才能提交。不要额外加入卡片之外的联系方式、住址、健康信息或其他个人资料。

所有提交到仓库或构建结果中的文字和媒体都可被公开下载。不要提交 `.env`、Token、连接字符串或其他秘密。

## 发布到 GitHub Pages

`.github/workflows/deploy.yml` 会在 `main` 分支更新时自动执行安装、检查、静态构建和 Pages 发布，也可以从 GitHub Actions 页面手动运行。

工作流读取 GitHub Pages 提供的 `base_path` 与 `base_url`。项目站点因此可以部署到 `https://<用户名>.github.io/<仓库名>/`，本地开发仍使用根路径，不需要在页面代码中写死仓库名。
