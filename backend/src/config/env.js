const normalizeUrl = (value = "") => String(value).trim().replace(/\/+$/, "");

const readList = (value = "") =>
  String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const requiredEnv = [
  "MONGO_URI",
  "JWT_SECRET",
  "JWT_EXPIRE",
  "ADMIN_EMAIL",
  "RESEND_API_KEY",
  "EMAIL_FROM",
  "FRONTEND_URL",
  "ADMIN_FRONTEND_URL",
];

const validateEnv = () => {
  const missing = requiredEnv.filter((key) => !String(process.env[key] || "").trim());

  if (!process.env.ADMIN_PASSWORD_DASH && !process.env.ADMIN_PASSWORD) {
    missing.push("ADMIN_PASSWORD_DASH or ADMIN_PASSWORD");
  }

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  const mongoUri = String(process.env.MONGO_URI).trim().replace(/^MONGO_URI=/, "").replace(/^["']|["']$/g, "");
  if (!mongoUri.startsWith("mongodb://") && !mongoUri.startsWith("mongodb+srv://")) {
    throw new Error('Invalid MONGO_URI. It must start with "mongodb://" or "mongodb+srv://".');
  }
};

const defaultCorsOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
  "https://ijaht.com",
  "https://www.ijaht.com",
];

const getCorsOrigins = () => {
  const configuredOrigins = readList(process.env.CORS_ORIGINS);
  return Array.from(new Set([...defaultCorsOrigins, ...configuredOrigins]));
};

module.exports = {
  validateEnv,
  getCorsOrigins,
  normalizeUrl,
  frontendUrl: () => normalizeUrl(process.env.FRONTEND_URL),
  adminResetUrl: () => {
    const configuredResetUrl = normalizeUrl(process.env.ADMIN_RESET_URL);
    if (configuredResetUrl) return configuredResetUrl;

    return `${normalizeUrl(process.env.ADMIN_FRONTEND_URL)}/reset-password`;
  },
  publicArchiveUrl: () =>
    normalizeUrl(process.env.PUBLIC_ARCHIVE_URL || `${normalizeUrl(process.env.FRONTEND_URL)}/archives`),
};
