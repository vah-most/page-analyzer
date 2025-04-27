import swaggerJsdoc from "swagger-jsdoc";
import { SERVER_URL, SWAGGER_CONFIG } from "./constants";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: SWAGGER_CONFIG.TITLE,
      version: SWAGGER_CONFIG.VERSION,
      description: SWAGGER_CONFIG.DESCRIPTION,
    },
    servers: [
      {
        url: SERVER_URL,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        basicAuth: {
          type: "http",
          scheme: "basic",
        },
      },
    },
    security: [
      {
        basicAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
