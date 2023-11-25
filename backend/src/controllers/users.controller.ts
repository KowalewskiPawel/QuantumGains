import {
  comparePasswords,
  generateJWT,
  hashPassword,
  validateUser,
} from "../utils";
import { pool } from "../database";
import type { Request, Response, RequestWithUser } from "../types";

export class UsersController {
  async signup(req: Request, res: Response) {
    try {
      // validate body
      const validationError = validateUser(req.body);

      if (validationError) {
        return res.status(400).json({
          error: true,
          status: 400,
          message: validationError,
        });
      }

      const { username, password, email } = req.body;

      // hash password
      const hashedPassword = await hashPassword(password);

      // Store user in the database
      const newUser = await pool.query(
        "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
        [username, hashedPassword, email]
      );

      res.status(201).json(newUser.rows[0]);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      // Check if user exists
      const user = await pool.query("SELECT * FROM users WHERE username = $1", [
        username,
      ]);

      if (user.rows.length === 0) {
        return res.status(401).json("Invalid credentials");
      }

      // Check password
      const validPassword = await comparePasswords(
        password,
        user.rows[0].password
      );

      if (!validPassword) {
        return res.status(401).json("Invalid credentials");
      }

      // Generate and return a JWT token
      const token = await generateJWT(user.rows[0].user_id, username);

      res.json({ token });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }

  async protected(req: RequestWithUser, res: Response) {
    try {
      res.status(200).json(`User Logged in: ${req.user}`);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
}
