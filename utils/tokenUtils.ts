import jwt from "jsonwebtoken";

interface JWTPayload {
  userId: string;
  role: string;
}

export const createJWT = (payload: JWTPayload) => {
  // Cast the JWT_SECRET to string to satisfy TypeScript
  const secret: jwt.Secret = process.env.JWT_SECRET || "secret";

  // Use a type assertion for the expiresIn value
  const token = jwt.sign(payload, secret, {
    expiresIn: (process.env.JWT_EXPIRES_IN || "1d") as jwt.SignOptions["expiresIn"],
  });

  return token;
};
