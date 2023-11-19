import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { LlavaRouter } from "./routes";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors())
  .use(helmet())
  .use('/api/v1/llava', LlavaRouter);

app.get("/", async (_req, res) => {
  try {
    res.send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.DEPLOY_SERVER || `http://localhost:${PORT}`}`);
});
