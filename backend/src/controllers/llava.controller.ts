import type { Request, Response } from "express";

export class LlavaController {
  async analyzePhoto(req: Request, res: Response) {
    try {
      const { photoUrl } = req.body;
      // ... do something with photo
      res.status(200).json({ message: "Photo analyzed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
