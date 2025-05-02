import { Router } from "express";
import { UserManager } from "../controllers/UserManager";
const router = Router();

router.get("/", async (_req, res) => {
  const userManager = UserManager.getInstance();
  const users = await userManager.getUsers();
  res.status(200).json(users);
});

export default router;
