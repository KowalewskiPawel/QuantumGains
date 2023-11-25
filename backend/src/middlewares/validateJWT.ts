import { validateJWT } from "../utils";
import { Response, NextFunction, RequestWithUser } from "../types";

type UserPayload = {
  userId?: number;
  username?: string;
  iat?: number;
  exp?: number;
};

export const authJWT = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json("No token, authorization denied");
  }

  try {
    const decoded = (await validateJWT(token)) as UserPayload;
    req.user = decoded.username;
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json("Token is not valid");
  }
};
