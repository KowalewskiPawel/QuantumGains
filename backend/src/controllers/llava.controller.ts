import type { Request, Response } from "express";
import { getBodyFatAndExercises, getSuggestedDiet } from "../llava";
import { MOCK_LLAVA_PHOTO_RESPONSE } from "../MOCKS";

export class LlavaController {
  async analyzePhoto(req: Request, res: Response) {
    try {
      const { photoUrl, isMockRequest } = req.body;

      if (isMockRequest) {
       return res.status(200).send(MOCK_LLAVA_PHOTO_RESPONSE);
      };

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
