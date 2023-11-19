import type { Request, Response } from "express";
import { getBodyFatAndExercises, getSuggestedDiet } from "../llava";

export class LlavaController {
  async analyzePhoto(req: Request, res: Response) {
    try {
      const { photoUrl } = req.body;

      const bodyFatAndTrainings = JSON.parse(await getBodyFatAndExercises(photoUrl) as unknown as string);
      const suggestedDiet = JSON.parse(await getSuggestedDiet(photoUrl) as unknown as string);

      if (typeof bodyFatAndTrainings !== "object" || typeof suggestedDiet !== "object") {
        throw new Error("Invalid output");
      };

      const analyzedPhotoResults = {
        ...bodyFatAndTrainings,
        ...suggestedDiet,
      };

      res.status(200).send(analyzedPhotoResults);
    } catch (error: any) {
      res.status(500).json({ internalError: error.message });
    }
  }
}
