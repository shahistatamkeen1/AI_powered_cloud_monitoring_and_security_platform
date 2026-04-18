const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    : {
        "Content-Type": "application/json",
      };
}

export async function fetchDashboard() {
  const res = await fetch(`${API_BASE_URL}/dashboard`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to load dashboard");
  return res.json();
}

export async function fetchMetricsSummary() {
  const res = await fetch(`${API_BASE_URL}/metrics/summary`);
  if (!res.ok) throw new Error("Failed to load metrics summary");
  return res.json();
}

export async function fetchMetricsHistory() {
  const res = await fetch(`${API_BASE_URL}/metrics/history`);
  if (!res.ok) throw new Error("Failed to load metrics history");
  return res.json();
}

export async function fetchAlerts() {
  const res = await fetch(`${API_BASE_URL}/alerts`);
  if (!res.ok) throw new Error("Failed to load alerts");
  return res.json();
}

export async function fetchLogs() {
  const res = await fetch(`${API_BASE_URL}/logs`);
  if (!res.ok) throw new Error("Failed to load logs");
  return res.json();
}

export async function fetchInsights() {
  const res = await fetch(`${API_BASE_URL}/insights`);
  if (!res.ok) throw new Error("Failed to load insights");
  return res.json();
}

export async function fetchHistory() {
  const res = await fetch(`${API_BASE_URL}/history`);
  if (!res.ok) throw new Error("Failed to load history");
  return res.json();
}

export async function fetchAiInsights() {
  const res = await fetch(`${API_BASE_URL}/metrics/ai-insights`);
  if (!res.ok) throw new Error("Failed to load AI insights");
  return res.json();
}

export async function fetchAiHistory() {
  const res = await fetch(`${API_BASE_URL}/metrics/ai-history`);
  if (!res.ok) throw new Error("Failed to load AI history");
  return res.json();
}