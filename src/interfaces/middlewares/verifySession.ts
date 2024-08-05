import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifySession = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");

  jwt.verify(token.toString(), process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) return res.status(401).send("Invalid token");
    req.body.user = user;
    next();
  });
};

export default verifySession;
