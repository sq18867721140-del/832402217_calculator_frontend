/**
 * Calculator UI logic.
 *
 * Responsibilities kept on the front end: user input, rendering, calling the
 * back-end API.  Calculation itself is delegated to the back end.
 */
(function () {
  "use strict";

  const els = {
    expression: document.getElementById("expression"),
    result: document.getElementById("result"),
    message: document.getElementById("message"),
    historyList: document.getElementById("historyList"),
    historyEmpty: document.getElementById("historyEmpty"),
    historyCount: document.getElementById("historyCount"),
    refresh: document.getElementById("refreshHistory"),
    clear: document.getElementById("clearHistory"),
    themeToggle: document.getElementById("themeToggle"),
    backendStatus: document.getElementById("backendStatus"),
    keypad: document.querySelector(".keypad"),
  };

  const THEME_KEY = "calculator-theme";

  // --- display helpers ----------------------------------------------------

  function setMessage(text, type) {
    els.message.textContent = text || "";
    els.message.className = "calculator__message" + (type ? ` calculator__message--${type}` : "");
  }

  function setResult(text, hasError) {
    els.result.textContent = text;
    els.result.classList.toggle("calculator__result--error", Boolean(hasError));
  }

  function insert(value) {
    els.expression.value += value;
    els.expression.focus();
  }

  function backspace() {
    els.expression.value = els.expression.value.slice(0, -1);
    els.expression.focus();
  }

  function clearInput() {
    els.expression.value = "";
    setResult("= …", false);
    setMessage("");
    els.expression.focus();
  }

  // --- back-end status ----------------------------------------------------

  function setBackendStatus(online) {
    els.backendStatus.textContent = online ? "Backend: Online" : "Backend: Offline";
    els.backendStatus.className = online ? "status status--ok" : "status status--down";
  }

  // fetch() throws a TypeError when the network request itself fails
  // (e.g. the back-end service is stopped), as opposed to an HTTP error.
  function isNetworkError(error) {
    return error instanceof TypeError;
  }

  // --- back-end calls -----------------------------------------------------

  async function calculate() {
    const expression = els.expression.value.trim();
    if (!expression) {
      setMessage("Please enter an expression", "error");
      return;
    }
    try {
      setMessage("Calculating…");
      const data = await api.calculate(expression);
      setBackendStatus(true);
      setResult(`= ${data.result}`, false);
      setMessage("");
      await loadHistory();
    } catch (error) {
      if (isNetworkError(error)) {
        setBackendStatus(false);
      }
      setResult("= Error", true);
      setMessage(
        isNetworkError(error)
          ? "Cannot reach the backend. Please make sure it is running."
          : error.message,
        "error"
      );
    }
  }

  async function loadHistory() {
    try {
      const items = await api.getHistory();
      setBackendStatus(true);
      renderHistory(items);
    } catch (error) {
      if (isNetworkError(error)) {
        setBackendStatus(false);
      }
      setMessage(`Failed to load history: ${error.message}`, "error");
    }
  }

  function renderHistory(items) {
    els.historyList.innerHTML = "";
    els.historyCount.textContent = String(items.length);
    els.historyEmpty.hidden = items.length > 0;

    items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "history__item";

      const info = document.createElement("div");
      info.className = "history__info";

      const expression = document.createElement("span");
      expression.className = "history__expression";
      expression.textContent = item.expression;

      const result = document.createElement("span");
      result.className = "history__result";
      result.textContent = `= ${item.result}`;

      const time = document.createElement("span");
      time.className = "history__time";
      time.textContent = item.created_at;

      info.append(expression, result, time);

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "button button--danger button--small";
      remove.textContent = "Delete";
      remove.addEventListener("click", () => deleteRecord(item.id));

      li.append(info, remove);
      els.historyList.appendChild(li);
    });
  }

  async function deleteRecord(id) {
    try {
      await api.deleteHistory(id);
      await loadHistory();
    } catch (error) {
      setMessage(`Delete failed: ${error.message}`, "error");
    }
  }

  async function clearAll() {
    if (!window.confirm("Clear all calculation history? This cannot be undone.")) {
      return;
    }
    try {
      await api.clearHistory();
      await loadHistory();
      setMessage("History cleared", "success");
    } catch (error) {
      setMessage(`Clear failed: ${error.message}`, "error");
    }
  }

  async function checkBackend() {
    try {
      await api.health();
      setBackendStatus(true);
    } catch (error) {
      setBackendStatus(false);
    }
  }

  // --- theme --------------------------------------------------------------

  function applyTheme(theme) {
    document.body.dataset.theme = theme;
    els.themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  function toggleTheme() {
    const next = document.body.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  // --- event wiring -------------------------------------------------------

  els.keypad.addEventListener("click", (event) => {
    const key = event.target.closest(".key");
    if (!key) {
      return;
    }
    if (key.dataset.action === "calculate") {
      calculate();
    } else if (key.dataset.action === "clear") {
      clearInput();
    } else if (key.dataset.action === "backspace") {
      backspace();
    } else if (key.dataset.value !== undefined) {
      insert(key.dataset.value);
    }
  });

  els.expression.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      calculate();
    } else if (event.key === "Escape") {
      event.preventDefault();
      clearInput();
    }
  });

  els.refresh.addEventListener("click", loadHistory);
  els.clear.addEventListener("click", clearAll);
  els.themeToggle.addEventListener("click", toggleTheme);

  // Global keyboard support for digits and operators.
  document.addEventListener("keydown", (event) => {
    if (document.activeElement === els.expression) {
      return; // the input already handles the character
    }
    const allowed = "0123456789+-*/.()";
    if (allowed.includes(event.key)) {
      insert(event.key);
    } else if (event.key === "Enter") {
      calculate();
    } else if (event.key === "Backspace") {
      backspace();
    }
  });

  // --- start-up -----------------------------------------------------------

  function init() {
    applyTheme(localStorage.getItem(THEME_KEY) || "light");
    checkBackend();
    loadHistory();
    // Periodically re-check so the indicator never shows a stale status.
    window.setInterval(checkBackend, 15000);
  }

  init();
})();
