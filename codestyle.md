# Frontend Code Style

## Source of the Standard

This project's frontend code follows widely adopted industry standards:

- **JavaScript**: [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- **HTML / CSS**: [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)

References:

- Airbnb JavaScript Style Guide: <https://github.com/airbnb/javascript>
- Google HTML/CSS Style Guide: <https://google.github.io/styleguide/htmlcssguide.html>

## 1. Files and Naming

| Element | Rule | Example |
| --- | --- | --- |
| File / directory | lowercase with hyphens or underscores | `index.html`, `style.css` |
| JS variable / function | `camelCase` | `loadHistory()`, `backendStatus` |
| JS constant | uppercase with underscores | `API_BASE_URL`, `THEME_KEY` |
| CSS class | BEM style, lowercase with hyphens | `calculator__result--error` |
| DOM id | `camelCase` | `historyList` |
| HTML / CSS attributes | lowercase | `data-action`, `border-radius` |

## 2. JavaScript

- Use `"use strict"` and wrap the code in an IIFE to avoid polluting the global scope.
- Prefer `const`; use `let` when reassignment is needed; never use `var`.
- Use double quotes for strings.
- Do not omit semicolons.
- Use `===` / `!==`; never `==` / `!=` (except when comparing with `null`).
- Indent with 2 spaces; keep lines under 100 characters.
- Keep functions single-purpose and short; use `async / await` for all asynchronous code.
- Bind events with `addEventListener`; do not use inline `onclick`.
- Use `event.target.closest()` for event delegation.
- Declare variables and functions before use; avoid deep nesting (no more than 3 levels).

## 3. HTML

- Use the HTML5 doctype `<!DOCTYPE html>`; set `lang` on `<html>`.
- Use lowercase tags and attribute names; wrap attribute values in double quotes.
- Use semantic tags: `header`, `main`, `section`, `footer`, `button`.
- Provide `alt` for every image and a `<label>` or `aria-label` for form controls.
- Use `<button>` for interactive elements rather than `<div>`.
- Keep self-closing tags consistent; keep nesting reasonable with clean 2-space indentation.
- Separate styles and scripts, loaded via `<link>` and `<script src>`.

## 4. CSS

- Use external stylesheets; no inline styles.
- Use lowercase class names with hyphens and BEM naming.
- Prefer CSS custom properties (variables) for themes and colors.
- Use `box-sizing: border-box`.
- Keep selectors flat; avoid deep descendant selectors and `!important`.
- Group properties logically (layout → box model → typography → visuals), keeping a consistent order within each group.
- Prefer lowercase hex values or variables for colors.

## 5. Comments

- Add a header comment at the top of each file describing its responsibility.
- Use block comments for complex logic, explaining "why".
- Keep comments in sync with the code.

## 6. Accessibility

- Use `aria-live="polite"` for dynamically updated result regions.
- Use `role="alert"` for error message containers.
- Ensure sufficient text-to-background contrast (supported by both light and dark themes).

## 7. Check Tools (optional)

```bash
# Requires a Node.js environment
npx eslint --init      # choose the Airbnb config
npx stylelint "src/**/*.css"
```
