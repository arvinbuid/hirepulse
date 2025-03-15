import jwt from "jsonwebtoken";

interface JWTPayload {
  userId: string;
  role: string;
}

// Cast the JWT_SECRET to string to satisfy TypeScript
const secret: jwt.Secret = process.env.JWT_SECRET || "secret";

export const createJWT = (payload: JWTPayload) => {
  // Use a type assertion for the expiresIn value
  const token = jwt.sign(payload, secret, {
    expiresIn: (process.env.JWT_EXPIRES_IN || "1d") as jwt.SignOptions["expiresIn"],
  });

  return token;
};

export const verifyJWT = (token: string) => {
  const decoded = jwt.verify(token, secret) as JWTPayload;
  return decoded;
};
