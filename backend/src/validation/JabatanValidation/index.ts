import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { sequelize } from "../../db/models";
import { QueryTypes } from "sequelize";

export const valCreate = [
  body("kode")
    .notEmpty()
    .withMessage("Kode harus di isi")
    .custom(async (kode) => {
      const cek = await sequelize.query(
        `SELECT * FROM jabatans WHERE kode = '${kode}'`,
        { type: QueryTypes.SELECT }
      );
      if (cek.length > 0) {
        throw new Error("Kode sudah terdaftar");
      }
      return true;
    }),
  body("nama")
    .notEmpty()
    .withMessage("Nama harus di isi")
    .custom(async (nama) => {
      const cek = await sequelize.query(
        `SELECT * FROM jabatans WHERE nama = '${nama}'`,
        { type: QueryTypes.SELECT }
      );
      if (cek.length > 0) {
        throw new Error("Nama jabatan sudah terdaftar");
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
  body("kode")
    .notEmpty()
    .withMessage("Kode harus di isi")
    .custom(async (kode, { req }) => {
      const cek = await sequelize.query(
        `SELECT * FROM jabatans WHERE kode = '${kode}'`,
        { type: QueryTypes.SELECT }
      );
      if (kode !== req.body.kode_lama && cek.length > 0) {
        throw new Error("Kode sudah terdaftar");
      }
      return true;
    }),
  body("nama")
    .notEmpty()
    .withMessage("Nama harus di isi")
    .custom(async (nama, { req }) => {
      const cek = await sequelize.query(
        `SELECT * FROM jabatans WHERE nama = '${nama}'`,
        { type: QueryTypes.SELECT }
      );
      if (nama !== req.body.nama_lama && cek.length > 0) {
        throw new Error("Nama sudah terdaftar");
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
