import express from "express";
import {
  getLoggedUser,
  login,
  logout,
  resigter,
} from "../controllers/authController.js";
import protect from "../middlewares/protectUser.js";

const router = express.Router();

router.post("/register", resigter);
router.post("/login", login);
router.get("/logged-user", protect, getLoggedUser);
router.post("/logout", logout);

export default router;
