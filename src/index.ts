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
import userRoutes from "./routes/user.routes";
import { UserManager } from "./controllers/UserManager";
import { AdminSetup } from "./config/admin.setup";

dotenv.config();
const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Serve Swagger UI
const swaggerMiddleware = swaggerUi.setup(swaggerSpec);
app.use(API_ROUTES.DOCS, swaggerUi.serve, swaggerMiddleware);

const initializeApp = async (): Promise<typeof app> => {
  try {
    await AdminSetup.initializeAdmin();

    const userManager = UserManager.getInstance();
    await userManager.initialize();

    app.use(authenticate);
    app.use(rateLimit);

    app.use("/api/users", userRoutes);

    app.use(errorHandler);

    return app;
  } catch (error) {
    Logger.getInstance().error("Failed to initialize application:", error);
    process.exit(1);
  }
};

// Start the server
if (require.main === module) {
  initializeApp().then((app) => {
    const server = app.listen(SERVER_PORT, () => {
      Logger.getInstance().log(`Server running at ${SERVER_URL}`);
      Logger.getInstance().log(
        `Swagger UI available at ${SERVER_URL}${API_ROUTES.DOCS}`
      );
    });

    // Graceful shutdown
    const gracefulShutdown = (): void => {
      Logger.getInstance().log("Shutting down gracefully...");
      server.close(() => {
        Logger.getInstance().log("Server closed");
        process.exit(0);
      });

      setTimeout(() => {
        Logger.getInstance().error(
          "Could not close connections in time, forcefully shutting down"
        );
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  });
}

export default app;
