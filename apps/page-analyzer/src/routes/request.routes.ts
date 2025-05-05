import { Router } from "express";
const router = Router();

router.get("/", async (_req, res) => {
  res.status(200).json({ message: "Hello World" });
});

export default router;
