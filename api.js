/**
 * Thin wrapper around the back-end HTTP API.
 *
 * Every function performs a real network request; the front end never
 * computes a result by itself.
 */
const API_BASE_URL = (window.APP_CONFIG && window.APP_CONFIG.API_BASE_URL) || "http://127.0.0.1:8000";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  let data = null;
  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok || (data && data.success === false)) {
    const message = (data && data.message) || `Request failed (HTTP ${response.status})`;
    throw new Error(message);
  }
  return data;
}

const api = {
  calculate(expression) {
    return request("/api/calculate", {
      method: "POST",
      body: JSON.stringify({ expression }),
    });
  },
  getHistory() {
    return request("/api/history");
  },
  deleteHistory(id) {
    return request(`/api/history/${id}`, { method: "DELETE" });
  },
  clearHistory() {
    return request("/api/history", { method: "DELETE" });
  },
  health() {
    return request("/api/health");
  },
};
