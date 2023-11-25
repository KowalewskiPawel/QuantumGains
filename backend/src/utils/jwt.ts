import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const options = {
  expiresIn: "1h",
};

export const generateJWT = async (userId: number, username: string) => {
  try {
    const payload = { userId, username };
    const token = await jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      options
    );
    return token;
  } catch (error) {
    throw new Error("Generating JWT failed");
  }
};

export const validateJWT = async (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    throw new Error("Generating JWT failed");
  }
};
