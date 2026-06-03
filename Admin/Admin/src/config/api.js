import axios from "axios";

export const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const assetUrl = (path = "") => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = String(path).startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
