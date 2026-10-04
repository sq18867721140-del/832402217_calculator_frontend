# StudentID_calculator_frontend

前后端分离计算器系统的**前端**项目。负责用户交互与信息展示：输入表达式、调用后端 API 获取结果、展示与管理计算历史。

> 请将目录名 `StudentID_calculator_frontend` 中的 `StudentID` 替换为你的学号，例如 `20231234_calculator_frontend`。

> **重要**：本前端**不包含任何计算逻辑**。表达式一律发送给后端计算，前端只负责显示后端返回的结果。停止后端服务后，前端仍可交互，但无法得到新的计算结果。

## 1. 技术栈

| 项目 | 选型 |
| --- | --- |
| 结构 | 原生 HTML5 |
| 样式 | 原生 CSS3（CSS 变量 + Grid 布局，支持明暗主题） |
| 脚本 | 原生 JavaScript（ES2015+，无框架、无构建步骤） |
| 通信 | `fetch` + JSON，HTTP API |

采用原生技术栈的原因：无需构建工具与依赖，便于部署与助教验证，同时能清晰体现前后端分离。

## 2. 运行环境

- 任意现代浏览器（Chrome / Edge / Firefox）
- 如需本地托管，可用 Python 自带的静态服务器
- 无需 Node.js、无需 `npm install`

## 3. 安装方法

本项目无第三方依赖，克隆仓库即可：

```bash
git clone <frontend-repo-url>
cd StudentID_calculator_frontend
```

## 4. 配置说明

后端地址集中在 `src/config.js`：

```js
window.APP_CONFIG = {
  API_BASE_URL: "http://127.0.0.1:8000",
};
```

- 本地开发：保持默认即可（需先启动后端）。
- 部署后：改成后端公网地址，例如 `https://your-backend.example.com`。
- 修改此文件后无需改动任何其他代码。

## 5. 启动方法

> ⚠️ 不建议直接双击 `index.html`（`file://` 协议下浏览器可能拦截跨域请求）。
> 请用静态服务器托管。

```bash
cd StudentID_calculator_frontend/src

# 方式一：Python 内置静态服务器（推荐）
python -m http.server 5500

# 方式二：VS Code 的 Live Server 插件，右键 index.html → Open with Live Server
```

然后访问 <http://127.0.0.1:5500>。

## 6. 与后端连接方式

- 前端通过 `fetch` 调用后端 REST API。
- 请求 / 响应均为 JSON。
- 后端已开启 CORS，支持跨域访问。
- 页面右上角显示「后端状态」，用于快速确认连通性。

用到的接口：

| 方法 | 路径 | 用途 |
| --- | --- | --- |
| POST | `/api/calculate` | 提交表达式，获取计算结果 |
| GET | `/api/history` | 获取计算历史 |
| DELETE | `/api/history/{id}` | 删除单条历史 |
| DELETE | `/api/history` | 清空全部历史 |
| GET | `/api/health` | 检测后端是否可用 |

## 7. 功能说明

### 必需功能
- 四则运算（`+ - × ÷`）与按钮 / 键盘输入
- 复合表达式：优先级、括号、一元正负号、小数
- 结果由后端计算并返回，前端仅显示
- 计算历史从后端数据库读取并展示（含表达式、结果、时间）
- 删除指定历史记录（删除后重新拉取后端数据）
- 错误提示：非法表达式、除零等

### 扩展功能（额外加分）
- **清空全部历史**
- **键盘快捷键**：数字与 `+ - * / ( )` 直接输入，`Enter` 计算，`Backspace` 删除，`Esc` 清空
- **主题切换**（明 / 暗），偏好保存于 `localStorage`
- **后端状态检测**指示
- 历史记录数量统计

## 8. 项目结构

```
StudentID_calculator_frontend/
├── src/
│   ├── index.html    # 页面结构
│   ├── style.css     # 样式与主题
│   ├── config.js     # 运行时配置（后端地址）
│   ├── api.js        # 后端 API 封装
│   └── app.js        # 交互逻辑（调用 API、渲染）
├── codestyle.md
└── README.md
```

## 9. 部署

静态页面，可部署到任意静态托管：

- **GitHub Pages**：把 `src/` 内容推到仓库并开启 Pages。
- **Vercel / Netlify**：导入仓库，将根目录设为 `src`（或构建输出目录为 `src`）。
- 部署后记得把 `src/config.js` 的 `API_BASE_URL` 改为后端公网地址。

## 10. 验证前后端分离

1. 启动后端与前端，进行一次计算，确认结果显示且历史出现。
2. **停止后端服务**，刷新页面：
   - 页面仍可正常交互（点击按钮、输入表达式）；
   - 提交计算时提示请求失败，**无法得到新的有效结果**；
   - 「后端状态」显示为「不可用」。
3. 重新启动后端，刷新页面，历史记录仍然存在（数据持久化在后端数据库）。
