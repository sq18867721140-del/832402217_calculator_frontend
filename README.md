# 832402217_calculator_frontend

The **frontend** of a front-end / back-end separated calculator system. It handles user interaction and information display: entering expressions, calling the backend API for results, and displaying / managing calculation history.

> **Important**: this frontend contains **no calculation logic**. Expressions are always sent to the backend for evaluation; the frontend only displays the returned result. If the backend is stopped, the frontend can still be used for interaction but cannot produce a new calculation result.

## 1. Tech Stack

| Item | Choice |
| --- | --- |
| Structure | Native HTML5 |
| Styling | Native CSS3 (CSS variables + Grid layout, light / dark themes) |
| Scripting | Native JavaScript (ES2015+, no framework, no build step) |
| Communication | `fetch` + JSON over HTTP API |

Native technologies were chosen deliberately: no build tools or dependencies are needed, which simplifies deployment and verification while clearly demonstrating front-end / back-end separation.

## 2. Runtime Environment

- Any modern browser (Chrome / Edge / Firefox)
- A static server is recommended for local serving (see below)
- No Node.js and no `npm install` required

## 3. Installation

This project has no third-party dependencies; just clone the repository:

```bash
git clone <frontend-repo-url>
cd 832402217_calculator_frontend
```

## 4. Configuration

The backend address is centralized in `src/config.js`:

```js
window.APP_CONFIG = {
  API_BASE_URL: "http://127.0.0.1:8000",
};
```

- Local development: keep the default (the backend must be running first).
- After deployment: change it to the public backend URL, e.g. `https://your-backend.example.com`.
- No other code needs to change when this file is modified.

## 5. Running

> Opening `index.html` directly via the `file://` protocol is not recommended, because browsers may block cross-origin requests. Serve it with a static server instead.

```bash
cd 832402217_calculator_frontend/src

# Option 1: Python built-in static server (recommended)
python -m http.server 5500

# Option 2: VS Code Live Server extension (right-click index.html → Open with Live Server)
```

Then visit <http://127.0.0.1:5500>.

## 6. Connecting to the Backend

- The frontend calls the backend REST API with `fetch`.
- Requests and responses are JSON.
- CORS is enabled on the backend, so cross-origin calls work.
- A backend status indicator is shown in the top-right corner of the page.

Endpoints used:

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/calculate` | Submit an expression and get the result |
| GET | `/api/history` | Get calculation history |
| DELETE | `/api/history/{id}` | Delete one history record |
| DELETE | `/api/history` | Clear all history |
| GET | `/api/health` | Check whether the backend is reachable |

## 7. Features

### Required features
- Four basic operations (`+ - × ÷`) with button / keyboard input
- Compound expressions: precedence, parentheses, unary plus / minus, decimals
- Results computed by the backend and returned; the frontend only displays them
- Calculation history read from the backend database and displayed (expression, result, time)
- Delete a single history record (the list is re-fetched after deletion)
- Error messages: invalid expression, division by zero, etc.

### Extended features (bonus)
- **Clear all history**
- **Keyboard shortcuts**: type digits and `+ - * / ( )`, `Enter` to calculate, `Backspace` to delete, `Esc` to clear
- **Theme toggle** (light / dark), preference stored in `localStorage`
- **Backend status indicator**
- History record count

## 8. Project Structure

```
832402217_calculator_frontend/
├── src/
│   ├── index.html    # Page structure
│   ├── style.css     # Styles and themes
│   ├── config.js     # Runtime configuration (backend address)
│   ├── api.js        # Backend API wrapper
│   └── app.js        # Interaction logic (calls API, renders)
├── codestyle.md
└── README.md
```

## 9. Deployment

This is a static site and can be deployed to any static host:

- **GitHub Pages**: push the `src/` content to the repository and enable Pages.
- **Vercel / Netlify**: import the repository and set the root (or build output) directory to `src`.
- After deployment, update `API_BASE_URL` in `src/config.js` to the public backend URL.

## 10. Verifying Front-End / Back-End Separation

1. Start the backend and the frontend, perform a calculation, and confirm the result is shown and the history appears.
2. **Stop the backend**, then refresh the page:
   - The page still responds to interaction (clicking buttons, typing expressions);
   - Submitting a calculation reports a request failure and **produces no new valid result**;
   - The backend status indicator shows "Offline".
3. Restart the backend, refresh the page, and the history records are still there (data is persisted in the backend database).
