import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { sequelize } from "../../db/models";
import { QueryTypes } from "sequelize";
import { validate_date } from "../../helpers";

export const valCreate = [
  body("tanggal")
    .notEmpty()
    .withMessage("Tanggal harus di pilih")
    .toDate()
    .withMessage("Format tanggal salah")
    .custom(async (tanggal) => {
      let tgl = validate_date(tanggal);
      const cek = await sequelize.query(
        `SELECT * FROM hari_liburs WHERE tanggal = ${tgl}`,
        { type: QueryTypes.SELECT }
      );
      if (cek.length > 0) {
        throw new Error("Hari libur di tanggal yang di pilih sudah ada");
      }
      return true;
    }),
  body("nama").notEmpty().withMessage("Nama harus di isi"),
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
  body("tanggal")
    .notEmpty()
    .withMessage("Tanggal harus di pilih")
    .toDate()
    .withMessage("Format tanggal salah")
    .custom(async (tanggal, { req }) => {
      let tgl = validate_date(tanggal);
      let tgl_lama = validate_date(req.body.tanggal_lama);
      const cek = await sequelize.query(
        `SELECT * FROM hari_liburs WHERE tanggal = ${tgl}`,
        { type: QueryTypes.SELECT }
      );
      if (tgl !== tgl_lama && cek.length > 0) {
        throw new Error("Hari libur di tanggal yang di pilih sudah ada");
      }
      return true;
    }),
  body("nama").notEmpty().withMessage("Nama harus di isi"),
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
