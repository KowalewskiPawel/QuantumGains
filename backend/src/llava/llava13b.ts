import Replicate from "replicate";
import dotenv from "dotenv";
import {
  PrepareDiet,
  LlavaReplicate13b,
  getEstimateBodyFatAndTrainings,
} from "../consts";

dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_AUTH,
});

export const getBodyFatAndExercises = async (photoUrl: string, enableErrorCheck = false) => {
  try {
    const bodyFatAndTrainingsOutput = await replicate.run(LlavaReplicate13b, {
      input: {
        image: photoUrl,
        prompt: getEstimateBodyFatAndTrainings(false),
        max_tokens: 1024,
        temperature: 0.6,
      },
    });

    if (enableErrorCheck && (Object.keys(bodyFatAndTrainingsOutput).includes("Error") || bodyFatAndTrainingsOutput.toString().includes("Error"))) {
      throw new Error(JSON.stringify(bodyFatAndTrainingsOutput));
    }

    return bodyFatAndTrainingsOutput;
  } catch (error) {
    console.error(error);
    throw new Error(JSON.stringify(error));
  }
};

export const getSuggestedDiet = async (photoUrl: string) => {
  try {
    const suggestedDietOutput = await replicate.run(LlavaReplicate13b, {
      input: {
        image: photoUrl,
        prompt: PrepareDiet,
        max_tokens: 1024,
        temperature: 0.6,
      },
    });

    return suggestedDietOutput;
  } catch (error) {
    console.error(error);
    throw new Error(JSON.stringify(error));
  }
};
