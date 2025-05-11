import { Router } from "express";
import { UserManager } from "../controllers/UserManager";
import { CreateUserInput } from "../types/User";
import { Prisma } from "../generated/prisma";

const router = Router();

router.get("/", async (_req, res) => {
  const userManager = UserManager.getInstance();
  const users = await userManager.getUsers();
  res.status(200).json(users);
});

router.post("/", async (req, res) => {
  try {
    const userData: CreateUserInput = req.body;
    const userManager = UserManager.getInstance();
    const newUser = await userManager.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      // Prisma unique constraint violation
      res.status(409).json({ error: "Username already exists" });
    } else {
      res.status(500).json({ error: "Failed to create user" });
    }
  }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - first_name
 *               - last_name
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *               password:
 *                 type: string
 *                 minLength: 6
 *               first_name:
 *                 type: string
 *                 maxLength: 50
 *               last_name:
 *                 type: string
 *                 maxLength: 100
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: Username already exists
 *       500:
 *         description: Server error
 */

export default router;
