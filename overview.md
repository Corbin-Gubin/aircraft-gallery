# 飞机图片查询 · 本轮增强总结

## 完成的工作
按你的要求对 `aircraft-site`（飞机图片查询）做了三处增强：

**1. 维基百科 → 百度百科**
- 将 `data.js` 与 `data-military.js` 中全部机型详情链接从 Wikipedia 改为百度百科（`baike.baidu.com/item/...`）。
- 修正了转换时被前缀误匹配产生的畸形链接（如 `波音737_Classic`、`空中客车A320_family`）。
- 界面文案「查看维基百科详情」改为「查看百度百科详情」。

**2. 战斗机/军机真实图片（按你选的「下载百度真实图并本地托管」）**
- 抓取百度百科 og:image，下载并自托管到 `aircraft-site/images/` 与 `images/thumbs/`，覆盖  々9 个新家族：
  - 歼-20、歼-10、歼-16、苏霍伊系列（苏-27/30/35/57）、米格系列（MiG-29/31/35）、图波列夫系列（Tu-22M/95/160）、安东诺夫系列（An-22/124/225）、运-20、塞斯纳 172。
- 图片已校验可正常访问（HTTP 200，真实 JPEG）。本地自托管可避免百度 CDN 防盗链导致裂图。
- 数据文件名已对齐（`su-series.jpg` / `mig-series.jpg` / `tu-series.jpg` / `an-series.jpg`）。

**3. 收藏扩展至图片**
- 每张「推荐图片」卡片及详情弹窗均可点 ♥ 收藏单张照片，localStorage 持久化（键 `aircraft_photo_favs`）。
- 推荐区新增「★ 我的收藏图片」按钮，可只看已收藏的照片（与原有的「★ 收藏」机型收藏互不冲突）。

## 改动文件
- `aircraft-site/data-military.js`（图片字段对齐 + 注释更正）
- `aircraft-site/app.js`（新增 PHOTO_FAVS、recCard ♥、renderRecommend 过滤、modal ♥、photoFavToggle 绑定）
- `aircraft-site/index.html`（推荐区加 #photoFavToggle、弹窗加 #mFavPhoto）
- `aircraft-site/styles.css`（.card-fav / .photo-fav-toggle / .modal-fav 样式）

## 备注
- 百度图片仅适合个人展示，非商用；商用请替换为授权图。
- 本地预览已启动（http://localhost:8848）。尚未部署到 `corbin-gubin.github.io/aircraft-gallery/`，部署需重新获取 GitHub PAT（原 `gh_token.txt` 已删除）。

## 下一步
- 若需要，我可协助部署到你的 GitHub Pages（需你提供 PAT 或确认连接器）。
