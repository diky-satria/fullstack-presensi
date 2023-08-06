import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { sequelize } from "../../db/models";
import { QueryTypes } from "sequelize";

export const valLogin = [
  body("username")
    .notEmpty()
    .withMessage("Email harus di isi")
    .isEmail()
    .withMessage("Email tidak valid")
    .custom(async (email) => {
      const cek = await sequelize.query(
        `SELECT * FROM users WHERE email = '${email}'`,
        { type: QueryTypes.SELECT }
      );
      if (cek.length < 1) {
        throw new Error("Email tidak terdaftar");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("Password harus di isi")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()[0],
      });
    }
    next();
  },
];

export const valLupaPassword = [
  body("email")
    .notEmpty()
    .withMessage("Email harus di isi")
    .isEmail()
    .withMessage("Email tidak valid")
    .custom(async (email) => {
      const cek = await sequelize.query(
        `SELECT * FROM users WHERE email = '${email}'`,
        { type: QueryTypes.SELECT }
      );
      if (cek.length < 1) {
        throw new Error("Email tidak terdaftar");
      }
      return true;
    }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()[0],
      });
    }
    next();
  },
];

export const valResetPassword = [
  body("password")
    .notEmpty()
    .withMessage("Password harus di isi")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
  body("konfirmasi_password")
    .notEmpty()
    .withMessage("Konfirmasi password harus di isi")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Konfirmasi password salah");
      }
      return true;
    }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()[0],
      });
    }
    next();
  },
];
