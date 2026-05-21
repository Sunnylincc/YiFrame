# YiFrame / 影页

写网页，出视频。用 HTML/CSS/JS 制作短视频，并一键渲染为 MP4。

## 什么是 YiFrame？
YiFrame 是一个中文优先、本地优先的 HTML-to-Video 框架：把短视频当作一个“小网页”制作，在浏览器预览，再渲染成 MP4。

## 适合谁？
- 内容创作者（抖音 / 小红书 / 视频号 / B 站 / Shorts）
- 小商家与品牌运营
- 房产中介
- 教育工作者
- 开发者与 AI Coding Agent 用户
- 非技术用户

## 可以制作什么？
- 抖音产品推广短视频
- 小红书笔记风格视频
- 视频号营销片段
- B 站知识讲解短片
- 房产房源介绍短视频

## 快速开始（本地）
```bash
git clone <repo-url>
cd yiframe
npm install
npx playwright install chromium
npm run doctor
npm run studio
```
打开 `http://localhost:3030/studio`

## Docker 快速开始
```bash
docker compose -f docker/docker-compose.yml up --build
```
- Web UI: `http://localhost:3030/studio`
- 输出目录: `./renders`
- 停止: `Ctrl+C`
- 清理: `docker compose -f docker/docker-compose.yml down -v`

## CLI
- `yiframe init`
- `yiframe dev`
- `yiframe studio`
- `yiframe preview examples/product-promo`
- `yiframe render examples/product-promo`
- `yiframe create --template product-promo --name my-video`
- `yiframe doctor`

## NPM Scripts
- `npm run dev`
- `npm run studio`
- `npm run render`
- `npm run render:example`
- `npm run doctor`
- `npm run build`
- `npm run typecheck`

## 安装路径说明
### 1) 标准本地安装
1. 安装 Node.js LTS
2. 安装 FFmpeg
3. `npm install`
4. `npx playwright install chromium`
5. `npm run doctor`
6. `npm run studio`

### 2) Windows
以普通用户 PowerShell 运行（非必要不使用管理员）：
```powershell
./scripts/setup-windows.ps1
```
常见问题见 `docs/windows-guide.md`。

### 3) macOS / Linux
```bash
./scripts/setup-mac.sh
./scripts/setup-linux.sh
```
- macOS 安装 FFmpeg: `brew install ffmpeg`
- Ubuntu 安装 FFmpeg: `sudo apt install ffmpeg`

### 4) Docker
```bash
docker compose -f docker/docker-compose.yml up --build
```

## 中文字体
默认字体回退：
`PingFang SC, Microsoft YaHei, Noto Sans CJK SC, Source Han Sans SC, sans-serif`

可将自定义字体放到 `public/fonts/`，然后在模板 CSS 中使用 `@font-face` 引用。

## 模板
- `examples/product-promo`
- `examples/xiaohongshu-note`
- `examples/douyin-hook`
- `examples/education-explainer`
- `examples/real-estate-promo`
