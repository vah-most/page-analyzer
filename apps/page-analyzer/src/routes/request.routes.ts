import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

router.post("/", async (req, res) => {
  const { url, userId } = req.body;
  res.status(200).json({
    message: `request received from user ${userId}: ${url}`,
  });
});

export default router;
