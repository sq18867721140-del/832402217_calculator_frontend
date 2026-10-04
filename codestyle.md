# Frontend Code Style

## 代码规范来源

本项目前端代码遵循以下业界主流规范：

- **JavaScript**：[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- **HTML / CSS**：[Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)

参考链接：

- Airbnb JavaScript Style Guide：<https://github.com/airbnb/javascript>
- Google HTML/CSS Style Guide：<https://google.github.io/styleguide/htmlcssguide.html>

## 1. 文件与命名

| 元素 | 规则 | 示例 |
| --- | --- | --- |
| 文件 / 目录 | 小写 + 连字符或下划线 | `index.html`、`style.css` |
| JS 变量 / 函数 | 小写驼峰 `camelCase` | `loadHistory()`、`backendStatus` |
| JS 常量 | 全大写 + 下划线 | `API_BASE_URL`、`THEME_KEY` |
| CSS 类名 | BEM 风格，小写 + 连字符 | `calculator__result--error` |
| DOM id | 小写驼峰 | `historyList` |
| HTML 属性 / CSS 属性 | 小写 | `data-action`、`border-radius` |

## 2. JavaScript

- 使用 `"use strict"`，代码包裹在 IIFE 中避免污染全局。
- 使用 `const` 优先，需要重新赋值时使用 `let`，禁止 `var`。
- 字符串统一使用双引号。
- 语句结尾**不省略**分号。
- 使用 `===` / `!==`，禁止 `==` / `!=`（除与 `null` 比较外）。
- 缩进 2 个空格；每行不超过 100 个字符。
- 函数保持单一职责、短小；异步统一使用 `async / await`。
- 通过 `addEventListener` 绑定事件，不使用内联 `onclick`。
- 使用 `event.target.closest()` 做事件委托。
- 变量与函数先声明后使用；避免深度嵌套（不超过 3 层）。

## 3. HTML

- 使用 HTML5 文档类型 `<!DOCTYPE html>`；`<html>` 声明 `lang`。
- 标签、属性名小写；属性值使用双引号。
- 使用语义化标签：`header`、`main`、`section`、`footer`、`button`。
- 所有图片提供 `alt`；表单控件提供 `<label>` 或 `aria-label`。
- 可交互元素使用 `<button>` 而非 `<div>`。
- 自闭合标签保持一致性；嵌套层级保持合理与缩进清晰（2 个空格）。
- 样式与脚本分离，通过 `<link>` 与 `<script src>` 引入。

## 4. CSS

- 使用外部样式表，禁止行内样式。
- 类名全小写，使用连字符分隔，采用 BEM 命名。
- 优先使用 CSS 自定义属性（变量）管理主题与颜色。
- 使用 `box-sizing: border-box`。
- 选择器保持扁平，避免过深的后代选择器与 `!important`。
- 属性按逻辑分组（布局 → 盒模型 → 排版 → 视觉），每组内保持一致的书写顺序。
- 颜色值优先使用小写十六进制或变量。

## 5. 注释

- 文件顶部注释说明模块职责。
- 复杂逻辑使用块注释解释「为什么」。
- 注释与代码同步维护。

## 6. 可访问性

- 动态结果区域使用 `aria-live="polite"`。
- 错误信息容器使用 `role="alert"`。
- 保证文本与背景对比度足够（支持明暗两套主题）。

## 7. 检查工具（可选）

```bash
# 需 Node.js 环境
npx eslint --init      # 选择 Airbnb 规范
npx stylelint "src/**/*.css"
```
