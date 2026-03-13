import dotenv from "dotenv";
dotenv.config();
import cloudinary from "cloudinary";

import app from "./app.js";
import Database from "./database/database.js";

const PORT = process.env.PORT || 3000;

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

Database()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server listeniing on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
