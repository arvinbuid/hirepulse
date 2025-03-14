import jwt from "jsonwebtoken";

interface JWTPayload {
  userId: string;
  role: string;
}

export const createJWT = (payload: JWTPayload) => {
  const token = jwt.sign(payload, "secret", {
    expiresIn: "1d",
  });
  return token;
};
