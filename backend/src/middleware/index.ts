import { Request, Response, NextFunction } from "express";
import { sequelize } from "../db/models/index.js";
import { QueryTypes } from "sequelize";

export const VerifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({
      msg: "Unauthorized",
    });
  } else {
    next();
  }
};

export const VerifyIsAdmin = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const user = await sequelize.query(
    `SELECT * FROM users WHERE id = ${req.user.id}`,
    { type: QueryTypes.SELECT }
  );

  if (user[0].role !== "admin") {
    return res.status(403).json({
      msg: "Admin only",
    });
  } else {
    next();
  }
};

export const VerifyIsUser = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const user = await sequelize.query(
    `SELECT * FROM users WHERE id = ${req.user.id}`,
    { type: QueryTypes.SELECT }
  );

  if (user[0].role !== "user") {
    return res.status(403).json({
      msg: "User only",
    });
  } else {
    next();
  }
};
