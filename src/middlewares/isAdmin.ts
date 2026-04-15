import { NextFunction, Request, Response } from "express";
import prismaClient from "../prisma";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user_id = req.userId;

  if (!user_id) {
    return res.status(401).json({ error: "Usuário não tem permissão." });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      id: user_id,
    },
  });

  if (!user) {
    return res.status(403).json({ error: "Acesso negado. Admins apenas." });
  }

  if (user.role !== "ADMIN") {
    return res.status(403).json({ error: "Acesso negado. Admins apenas." });
  }

  return next();
};
