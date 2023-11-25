import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { pool } from "./database";
import { LlavaRouter, usersRouter } from "./routes";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors())
  .use(helmet())
  .use('/api/v1/llava', LlavaRouter)
  .use('/api/v1/users', usersRouter);

  app.get("/", async (_req, res) => {
    try {
      const result = await pool.query("SELECT NOW()");
      res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.DEPLOY_SERVER || `http://localhost:${PORT}`}`);
});
