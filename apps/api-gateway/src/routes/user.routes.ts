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

router.get("/:id", async (req, res: any) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const userManager = UserManager.getInstance();
    const user = await userManager.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to get user" });
  }
});

router.delete("/:id", async (req, res: any) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const userManager = UserManager.getInstance();
    await userManager.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(500).json({ error: "Failed to delete user" });
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
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a user
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

export default router;
