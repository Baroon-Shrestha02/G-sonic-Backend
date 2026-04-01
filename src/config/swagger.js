import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "G-Sonic Backend API",
      version: "1.0.0",
      description: "API documentation for G-Sonic - Home Appliances Store",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "https://g-sonic-backend.onrender.com",
        description: "Hosted testing server",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
          description: "JWT token stored in httpOnly cookie (set via login)",
        },
      },
      schemas: {
        Feedback: {
          type: "object",
          properties: {
            _id: { type: "string", example: "67f0b2c9a1b2c3d4e5f67890" },
            firstName: { type: "string", example: "Birendra" },
            lastName: { type: "string", example: "Dhami" },
            email: { type: "string", example: "birendra@example.com" },
            phoneNumber: { type: "string", example: "+977-9800000000" },
            message: {
              type: "string",
              example: "Great service. Please call me back.",
            },
            image: {
              type: "string",
              nullable: true,
              example: "https://res.cloudinary.com/.../feedback.png",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-03-18T12:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-03-18T12:00:00.000Z",
            },
          },
        },
        FeedbackCreateRequest: {
          type: "object",
          required: ["firstName", "lastName", "email", "phoneNumber", "message"],
          properties: {
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string" },
            phoneNumber: { type: "string" },
            message: { type: "string", maxLength: 1000 },
            image: { type: "string", format: "binary" },
          },
        },
      },
    },
    security: [],
    tags: [
      { name: "Auth", description: "Authentication and session management" },
      { name: "User", description: "User operations" },
      { name: "Feedback", description: "Feedbacks on products." },
    ],
  },
  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
