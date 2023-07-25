import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { sequelize } from "../../db/models";
import { QueryTypes } from "sequelize";
import { validate_date } from "../../helpers";

export const valCreate = [
  body("tanggal")
    .notEmpty()
    .withMessage("Tanggal harus di pilih")
    .custom(async (tanggal) => {
      const cek = await sequelize.query(
        `SELECT * FROM hari_liburs WHERE tanggal = '${tanggal}'`,
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
    .custom(async (tanggal, { req }) => {
      const cek = await sequelize.query(
        `SELECT * FROM hari_liburs WHERE tanggal = '${tanggal}'`,
        { type: QueryTypes.SELECT }
      );
      if (tanggal !== req.body.tanggal_lama && cek.length > 0) {
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
