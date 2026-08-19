<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 云启青禾项目协作说明

本文档是新对话接手项目时的首要上下文。除非用户明确要求，不需要重新分析相邻的旧项目，也不要重新讨论 Vercel、Neon 或静态迁移方案。

## 项目速览

- 工作目录：`D:\支教\网站\yunqi-qinghe`
- GitHub 仓库：`MCAdam221840186/yunqi-qinghe`
- 线上地址：`https://mcadam221840186.github.io/yunqi-qinghe/`
- 默认分支：`main`
- 产品定位：面向老师、家长、志愿者与公益支持者的公开支教团队展示站。
- 第一叙事是“云启青禾支教团队、团队行动与支教故事”。
- 后续规划包括“儿童成果”和“线上阅读共建平台”，目前尚未建立公开路由或占位页。只有用户明确提出时再实现。
- 这是纯静态公开网站。运行时没有数据库、服务端 API、登录、Token、Server Actions 或云端数据写入。
- 相邻的 `../diary-notebook` 是旧项目，只读保留。默认工作范围仅限本仓库。

当前内容基线：5 个匿名儿童、10 篇成长日记、8 位团队成员、3 篇团队日志。团队日志仍是用户暂时保留的测试内容，不要擅自改写或删除；用户之后会提供正式内容。

## 开始工作前

1. 先运行 `git status --short`，保留所有已有用户改动，不要清理或覆盖无关文件。
2. 只读取本次任务需要的文件。不要为了“了解背景”导入旧仓库、旧 Git 历史或数据库。
3. 修改 Next.js 行为前，查阅仓库 `node_modules/next/dist/docs/` 中与当前 16.3.1 版本对应的文档。
4. 不要新增依赖，除非现有栈无法合理完成需求；新增前必须检查 `package.json` 并说明原因。
5. 每次完成任何文件修改并通过与风险相称的验证后，默认提交本次任务相关改动、推送 `main` 并完成公开发布。只有用户明确要求不要提交、不要推送或暂不发布时才跳过。推送前必须同步远端、确认提交范围不夹带无关改动，并扫描秘密与未授权公开内容。

## 固定路由与信息架构

公开内容 URL 共 19 个：

- `/`：团队导向首页
- `/about/`：团队介绍
- `/team-diaries/`：团队日志
- `/diaries/`：匿名成长日志目录
- `/children/[slug]/`：5 个匿名儿童页
- `/diaries/[slug]/`：10 个日记详情页

另有静态 `404`、`robots.txt` 和 `sitemap.xml`。

除非用户明确要求：

- 不改现有 URL、slug、路由数量和尾部斜杠规则。
- 主导航顺序保持“团队介绍、团队日志、成长日志”。
- 导航元数据只在 `src/lib/navigation.ts` 维护；顶部导航、首页和页脚共同读取 `siteSections`。
- 儿童页和日记详情页在导航中都归属于“成长日志”的活动状态。
- 动态路由必须保留 `generateStaticParams()` 和 `dynamicParams = false`，未知 slug 应生成 404。

## 技术架构

- Next.js 16.3.1 App Router、React 19、TypeScript strict。
- `output: "export"` 生成 `out/`，并启用 `trailingSlash: true` 和 `images.unoptimized: true`。
- 页面、JSON 内容读取、日期处理和 Markdown 渲染均在 Server Components / 构建期完成。
- 客户端边界应保持为少量叶组件：`SiteHeader`、`Reveal`、`AnimatedHero`。
- 不要把页面或内容布局整体改成 Client Component，否则会把日记 JSON、Markdown 解析器和无关内容重新打进客户端包。
- 语义 HTML + CSS Modules 是主要 UI 实现方式；全局 CSS 只放设计令牌、基础样式和 Markdown 公共样式。
- 图标统一使用 Phosphor；动效统一使用 Motion。不要重新引入 Ant Design、图标混用或手写 SVG 图标。
- 字体通过 `next/font/local` 加载 `src/app/fonts/geist-latin.woff2`，中文使用系统字体回退。

关键文件：

- `src/lib/content.ts`：内容类型、构建期验证、关联、排序和派生数据。
- `src/lib/navigation.ts`：全站共享栏目顺序、标签和说明。
- `src/lib/site.ts`：站点信息、canonical、Open Graph、JSON-LD 和绝对 URL。
- `src/app/globals.css`：语义颜色、圆角、阴影、宽度、字体、层级与系统主题。
- `src/content/*.json`：所有公开内容。
- `src/assets/`：页面位图，必须使用静态导入。
- `public/og-v2.jpg`：当前社交预览图。

## 内容模型与排序

内容文件：

- `src/content/children.json`
- `src/content/diaries.json`
- `src/content/team-members.json`
- `src/content/team-diaries.json`

公开模型：

```ts
type Child = {
  slug: string;
  displayName: string;
};

type Diary =
  | {
      slug: string;
      childSlug: string;
      title: string;
      date: string;
      kind: "plain";
      body: string;
    }
  | {
      slug: string;
      childSlug: string;
      title: string;
      date: string;
      kind: "structured";
      fields: {
        learned: string;
        happiest: string;
        message: string;
        comment: string;
      };
    };

type TeamMember = {
  name: string;
  role: string;
  description: string;
};

type TeamDiary = {
  date: string;
  title: string;
  markdown: string;
  updatedAt: string;
};
```

内容规则：

- slug 必须唯一，并匹配小写字母、数字和连字符格式。
- 日期必须是有效 ISO 日期。
- 每篇日记的 `childSlug` 必须引用现有儿童。
- 渲染逻辑必须同时兼容 `plain` 和 `structured` 日记。
- 儿童日记默认按日期降序；团队日志默认按日期升序。不要无意改变现有顺序。
- 团队日志 Markdown 支持 GitHub Flavored Markdown，并继续在服务端渲染。
- 修改内容后必须运行构建，让 `src/lib/content.ts` 的校验真正执行。

## 隐私与公开边界

仓库、GitHub Pages HTML、JSON 派生内容和所有媒体都可以被公开下载。隐私约束高于视觉和内容需求。

- 团队成员只使用用户已授权公开的姓名、角色和简介；不要擅自加入头像或其他个人资料。
- 禁止提交 `.env`、Token、数据库连接串、`auth_tokens`、密钥、旧 Neon/Vercel 配置或旧仓库历史。
- 不新增表面上的“前端 Token 保护”。静态站没有可靠的客户端私密访问控制。
- 不连接或关闭旧 Vercel、Neon 服务，除非用户单独明确授权。

## 视觉与交互约定

- 保持温暖、可信、克制的当代自然编辑语言。
- 冷调纸白和墨绿文字为基础；森林绿是唯一交互强调色，浅蓝只作非交互环境色。
- 复用 `globals.css` 中的语义令牌，不在页面随意增加硬编码品牌色。
- 卡片使用 16px 圆角体系，交互按钮可使用全圆角；不要引入另一套形状语言。
- 顶栏桌面高 72px、移动端高 64px。移动导航使用原生 `<dialog>`。
- 修改移动菜单时必须保留 Escape、遮罩关闭、焦点恢复、body 滚动恢复和 `aria-current`。
- 保留跳转主内容链接、清晰焦点状态、每页单一 `h1`、正确标题层级和中文替代文字。
- 自动跟随 `prefers-color-scheme`，不要增加本地存储主题状态或首屏闪烁。
- 动效只使用 `transform` 与 `opacity`，并尊重 `prefers-reduced-motion` / `useReducedMotion()`。
- 不使用 `window` 滚动监听、React 滚动 state、滚动劫持、无限动画或无目的装饰动效。
- 页面与栏目大标题默认独立呈现，不在其正下方添加仅用于复述栏目用途的解释性副文案；保留承担真实内容、状态说明或操作指引的正文。
- 首页叙事必须优先展示团队；成长日志只能作为靠后的二级内容。

## GitHub Pages 与资源路径

`next.config.ts` 通过 `PAGES_BASE_PATH` 同时兼容本地根路径和 GitHub Pages 仓库子路径。

- 页面内导航使用 `next/link`，并遵守现有尾部斜杠。
- 页面图片优先放入 `src/assets/` 并静态导入。不要在页面写死 `/image.webp`，否则会绕过 GitHub Pages `basePath`。
- SEO、canonical、JSON-LD 和社交图绝对 URL 必须通过 `src/lib/site.ts` 生成。
- `absoluteUrl()` 故意移除传入路径开头的 `/`，以保留站点 URL 中的 `/yunqi-qinghe` 子路径；不要改成根绝对 URL 拼接。
- 静态导出不支持依赖请求状态的 API、cookies、headers、middleware、Server Actions 或未枚举的动态路由。
- `out/`、`.next/`、环境文件和本地 provider 元数据都不提交。

## 常用命令

环境基线：Node.js 24、npm。

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
```

无环境变量的 `npm run build` 验证本地根路径。GitHub Pages 子路径构建在 PowerShell 中使用：

```powershell
$env:PAGES_BASE_PATH = "/yunqi-qinghe"
$env:NEXT_PUBLIC_SITE_URL = "https://mcadam221840186.github.io/yunqi-qinghe"
npm run build
Remove-Item Env:PAGES_BASE_PATH
Remove-Item Env:NEXT_PUBLIC_SITE_URL
```

`.github/workflows/deploy.yml` 会在 `main` 推送时运行 `npm ci`、lint、typecheck、静态构建并部署 `out/`。

## 验收清单

任何功能或内容改动至少完成与风险相称的验证。发布前完整检查：

1. `npm run lint` 通过。
2. `npm run typecheck` 通过。
3. 无环境变量根路径构建通过。
4. `/yunqi-qinghe` 子路径构建通过。
5. 仍生成 5 个儿童页、10 个日记详情页、团队日志、团队介绍、robots、sitemap 和中文 404。
6. 子路径构建中 CSS、JS、字体、图片、favicon、导航和深层链接都带正确前缀，没有裸 `/_next/` 或裸根路径媒体。
7. 视觉改动在 1440px、768px、375px 下检查浅色、深色和减少动态效果；同时测试键盘与移动抽屉。
8. 检查未知 slug 返回 404，深层链接可直接刷新。
9. 扫描仓库和构建产物，确认没有真实儿童信息、秘密、API 请求、Neon/Vercel 运行时依赖或未授权媒体。
10. 确认客户端包没有重新包含完整日记 JSON、团队日志正文或 Markdown 解析器。
11. 如果无法完成某项浏览器或线上验收，必须如实说明，不要声称已经检查。
12. 每次修改完成后按默认发布流程提交并推送；随后按当前提交 SHA 跟踪 GitHub Actions 直至完成，并检查首页、深层链接、404 和静态资源。工作流失败时应在任务范围内修复后重新发布；无法修复则明确报告。

## 修改原则

- 优先做最小、清晰、可维护的改动，不顺手重构无关模块。
- 保留用户原始内容和声音；除非用户要求，不改写日记和团队日志正文。
- 不伪造团队历史、成果、人数、数据或社会影响。
- 未来加入儿童成果或线上阅读共建时，先确认内容结构、公开授权和新路由，再更新 `siteSections`、metadata、sitemap 与导航。
- 诊断任务只报告原因；只有用户要求修复时才修改代码。
- 默认发布只包含当前任务相关修改；用户已有的无关工作树改动不得擅自提交。
- 交付时报告实际修改、验证结果、提交或部署状态，以及任何未完成的验收项。
