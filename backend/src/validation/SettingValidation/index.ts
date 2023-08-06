import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const valUbahPassword = [
  body("passwordLama")
    .notEmpty()
    .withMessage("Password lama harus di isi")
    .isLength({ min: 6 })
    .withMessage("Password lama minimal 6 karakter"),
  body("passwordBaru")
    .notEmpty()
    .withMessage("Password baru harus di isi")
    .isLength({ min: 6 })
    .withMessage("Password baru minimal 6 karakter"),
  body("konfirmasiPasswordBaru")
    .notEmpty()
    .withMessage("Konfirmasi password baru harus di isi")
    .custom((value, { req }) => {
      if (value !== req.body.passwordBaru) {
        throw new Error("Konfirmasi password baru salah");
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
