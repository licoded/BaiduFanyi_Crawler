# 百度翻译爬虫
使用 GitHub Actions 实现每天定时爬取昨日收藏的单词。

## 快速上手

### 1. fork 本[仓库](https://github.com/licoded/BaiduFanyi_Crawler).

### 2. 获取 cookie

- 访问[百度翻译](https://fanyi.baidu.com/)，右键菜单选择 `Inspect/检查` 打开devtools控制台
- 选择 `Network/网络` 栏
- 选择 `Fetch/XHR` 筛选项
- 在过滤输入框中输入 `transapi`
- 在网页输入框中输入任意内容，以触发翻译请求
- 在devtools控制台点击 `v2transapi` 开头的请求
- 然后向下滚动，找到 `Request Headers > Cookie`，点击右键后选择 `Copy/复制` 即可

![get_cookie](./assets/gifs/01.get_cookie_cut.gif)

### 3. 设置 action secrets

- 进入 **Settings** 页面
- 侧边栏选择 `Secrets > Actions`
- 点击 **New repository secret**
  - **Name**栏，输入 BAIDU_COOKIE
  - **Secret**栏，粘贴从浏览器控制台获取的cookie（这里直接粘贴，不加单引号）

![set_secrets](./assets/gifs/03.set_secrets_cut.gif)

## 本地运行

```bash
export BAIDU_COOKIE='你的cookie' # 注意这里有单引号
npm install
npm run dev
```

![local_run](./assets/gifs/02.local_run_cut.gif)

