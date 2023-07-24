import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { sequelize } from "../../db/models";
import { QueryTypes } from "sequelize";

export const valCreate = [
  body("nip")
    .notEmpty()
    .withMessage("NIP harus di isi")
    .custom(async (nip) => {
      const cek = await sequelize.query(
        `SELECT * FROM karyawans WHERE nip = '${nip}'`,
        { type: QueryTypes.SELECT }
      );
      if (cek.length > 0) {
        throw new Error("NIP sudah terdaftar");
      }
      return true;
    }),
  body("nama").notEmpty().withMessage("Nama harus di isi"),
  body("jabatan_id").notEmpty().withMessage("Jabatan harus dipilih"),
  body("telepon")
    .notEmpty()
    .withMessage("Telepon harus di isi")
    .isNumeric()
    .withMessage("Telepon harus angka")
    .custom(async (telepon) => {
      const cek = await sequelize.query(
        `SELECT * FROM karyawans WHERE telepon = '${telepon}'`,
        { type: QueryTypes.SELECT }
      );
      if (cek.length > 0) {
        throw new Error("Telepon sudah terdaftar");
      }
      return true;
    }),
  body("alamat").notEmpty().withMessage("Alamat harus di isi"),
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
      if (cek.length > 0) {
        throw new Error("Email sudah terdaftar");
      }
      return true;
    }),
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

export const valUpdate = [
  body("nip")
    .notEmpty()
    .withMessage("NIP harus di isi")
    .custom(async (nip, { req }) => {
      const cek = await sequelize.query(
        `SELECT * FROM karyawans WHERE nip = '${nip}'`,
        { type: QueryTypes.SELECT }
      );
      if (nip !== req.body.nip_lama && cek.length > 0) {
        throw new Error("NIP sudah terdaftar");
      }
      return true;
    }),
  body("nama").notEmpty().withMessage("Nama harus di isi"),
  body("jabatan_id").notEmpty().withMessage("Jabatan harus di pilih"),
  body("telepon")
    .notEmpty()
    .withMessage("Telepon harus di isi")
    .isNumeric()
    .withMessage("Telepon harus angka")
    .custom(async (telepon, { req }) => {
      const cek = await sequelize.query(
        `SELECT * FROM karyawans WHERE telepon = '${telepon}'`,
        { type: QueryTypes.SELECT }
      );
      if (telepon !== req.body.telepon_lama && cek.length > 0) {
        throw new Error("Telepon sudah terdaftar");
      }
      return true;
    }),
  body("alamat").notEmpty().withMessage("Alamat harus di isi"),
  body("email")
    .notEmpty()
    .withMessage("Email harus di isi")
    .isEmail()
    .withMessage("Email tidak valid")
    .custom(async (email, { req }) => {
      const cek = await sequelize.query(
        `SELECT * FROM users WHERE email = '${email}'`,
        { type: QueryTypes.SELECT }
      );
      if (email !== req.body.email_lama && cek.length > 0) {
        throw new Error("Email sudah terdaftar");
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
