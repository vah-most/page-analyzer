import dotenv from "dotenv";

dotenv.config();

// Server Configuration
export const DEFAULT_PORT = 3000;
export const DEFAULT_HOST = "localhost";

export const SERVER_PORT = process.env.SERVER_PORT || DEFAULT_PORT;
export const SERVER_HOST = process.env.SERVER_HOST || DEFAULT_HOST;
export const SERVER_URL = `http://${SERVER_HOST}:${SERVER_PORT}`;

// Analyzer Service Configuration
export const ANALYZER_SERVICE = {
  URL: process.env.ANALYZER_SERVICE_URL || "http://localhost:3001",
  TIMEOUT: Number(process.env.ANALYZER_SERVICE_TIMEOUT) || 30000, // 30 seconds
} as const;

// API Routes
export const API_ROUTES = {
  DOCS: "/docs",
  USERS: "/api/users",
  ANALYZE: "/api/analyze",
} as const;

// Swagger Configuration
export const SWAGGER_CONFIG = {
  TITLE: "A11y-Analyzer API",
  VERSION: "1.0.0",
  DESCRIPTION: "API for A11y analysis",
} as const;

// Rate Limiting Configuration
export const RATE_LIMIT = {
  WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 100 requests per window
} as const;
