import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { authenticate } from "./middleware/auth";
import { errorHandler } from "./middleware/errorHandler";
import { swaggerSpec } from "./config/swagger";
import Logger from "./logger/Logger";
import { SERVER_PORT, SERVER_URL, API_ROUTES } from "./config/constants";
import { rateLimit } from "./middleware/rateLimit";

dotenv.config();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Serve Swagger UI
const swaggerMiddleware = swaggerUi.setup(swaggerSpec);
app.use(API_ROUTES.DOCS, swaggerUi.serve, swaggerMiddleware);

// Authentication and rate limiting
app.use(authenticate);
app.use(rateLimit);

// Routes

// Error handler middleware > should be the last middleware
app.use(errorHandler);

// Start the server

if (require.main === module) {
  const server = app.listen(SERVER_PORT, () => {
    Logger.getInstance().log(`Server running at ${SERVER_URL}`);
    Logger.getInstance().log(
      `Swagger UI available at ${SERVER_URL}${API_ROUTES.DOCS}`
    );
  });

  // Graceful shutdown
  const gracefulShutdown = (): void => {
    Logger.getInstance().log("Shutting down gracefully...");

    // Clean up scheduled jobs

    // Close the server
    server.close(() => {
      Logger.getInstance().log("Server closed");
      process.exit(0);
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
      Logger.getInstance().error(
        "Could not close connections in time, forcefully shutting down"
      );
      process.exit(1);
    }, 10000);
  };

  // Handle shutdown signals
  process.on("SIGTERM", gracefulShutdown);
  process.on("SIGINT", gracefulShutdown);
}

export default app;
