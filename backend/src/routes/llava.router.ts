import { Router } from "express";
import { LlavaController } from "../controllers";

const LlavaControllerInstance = new LlavaController();

export const LlavaRouter = Router().post('/analyze-photo', LlavaControllerInstance.analyzePhoto);