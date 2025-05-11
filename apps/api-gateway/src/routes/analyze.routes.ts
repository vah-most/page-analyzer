import { Router } from "express";
import { Request, Response } from "express";
import axios from "axios";
import Logger from "@logger";
import { AuthenticatedRequest } from "../types/User";
import { ANALYZER_SERVICE } from "../config/constants";

const router = Router();

router.post("/", async (req: Request, res: any) => {
  try {
    const { url } = req.body;
    const userId = (req as AuthenticatedRequest).user?.id;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const analyzerServiceUrl = `${ANALYZER_SERVICE.URL}/api/analyze`;

    const response = await axios.post(
      analyzerServiceUrl,
      {
        url,
        userId,
      },
      {
        timeout: ANALYZER_SERVICE.TIMEOUT,
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    Logger.getInstance().error("Analysis request failed:", error);
    res.status(500).json({ error: "Failed to analyze URL" });
  }
});

/**
 * @swagger
 * /api/analyze:
 *   post:
 *     summary: Analyze a webpage URL
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 format: uri
 *                 description: URL of the webpage to analyze
 *     responses:
 *       200:
 *         description: Analysis results
 *       400:
 *         description: Invalid request (missing URL)
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

export default router;
