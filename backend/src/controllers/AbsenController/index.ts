import { Request, Response } from "express";
import IController from "../IController";
import { at, calculateDistance } from "../../helpers";
import { sequelize } from "../../db/models/index";
import { QueryTypes } from "sequelize";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const Models = require("../../db/models/index.js");

class AbsenController implements IController {
  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      let tombol_type: string; // masuk, pulang, belum_dimulai
      let tombol_status: boolean = false;
      let message: string;
      let absen_status: string; // tidak_telat, telat, absen_pulang, belum_dimulai
      let sudah_absen: boolean;
      let user_id: number = 2; // diky satria ramadanu (id user yang sedang login)

      // cek kondisi masuk db dan pulang db
      let kondisi_masuk = await sequelize.query(
        `SELECT * FROM absens WHERE user_id = ${user_id} AND tgl_in LIKE '%${
          at().tgl_sekarang
        }%'`,
        { type: QueryTypes.SELECT }
      );
      let kondisi_pulang = await sequelize.query(
        `SELECT * FROM absens WHERE user_id = ${user_id} AND tgl_out LIKE '%${
          at().tgl_sekarang
        }%'`,
        { type: QueryTypes.SELECT }
      );

      // cek kondisi tombol muncul di frontend
      // jika masuk antara pukul 07:00 - 08:00
      if (
        at().now >= at().masuk_ts &&
        at().now <= at().batas_masuk_ts + at().toleransi &&
        at().now <= at().pulang_ts
      ) {
        if (kondisi_masuk.length > 0) {
          tombol_status = false;
          sudah_absen = true;
        } else {
          tombol_status = true;
          sudah_absen = false;
        }
        tombol_type = "masuk";
        message = "Tombol masuk muncul dan tidak telat";
        absen_status = "tidak_telat";

        //   jika masuk antara pukul 07:00 - 17:00
      } else if (
        at().now >= at().masuk_ts &&
        at().now > at().batas_masuk_ts + at().toleransi &&
        at().now <= at().pulang_ts
      ) {
        if (kondisi_masuk.length > 0) {
          tombol_status = false;
          sudah_absen = true;
        } else {
          tombol_status = true;
          sudah_absen = false;
        }
        tombol_type = "masuk";
        message = "Tombol masuk muncul dan telat";
        absen_status = "telat";

        //   jika pulang antara pukul 17:00 - 24:00
      } else if (
        at().now >= at().pulang_ts &&
        at().now <= at().batas_pulang_ts
      ) {
        if (kondisi_pulang.length > 0) {
          tombol_status = false;
          sudah_absen = true;
        } else {
          tombol_status = true;
          sudah_absen = false;
        }
        tombol_type = "pulang";
        message = "Tombol pulang muncul";
        absen_status = "absen_pulang";

        //   jika jam antara 00:00 - 06:59
      } else {
        tombol_status = false;
        tombol_type = "belum_dimulai";
        message = "Absensi belum di mulai";
        absen_status = "belum_dimulai";
        sudah_absen = false;
      }

      return res.status(200).json({
        status: 200,
        message: message,
        tombol_type: tombol_type,
        tombol_status: tombol_status,
        absen_status: absen_status,
        sudah_absen: sudah_absen,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 500,
        messsage: "Server error",
      });
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      let user_id: number = 2; // diky satria ramadanu (id user yang sedang login)
      const { foto, latitude, longitude, tombol_type, absen_status } = req.body;

      let fileName: string = `${user_id}-${Date.now()}.jpg`;
      let lokasi: string = `${latitude}|${longitude}`;
      let date: Date = new Date();

      // radius absen tidak boleh lebih dari 20 meter
      let jarak = calculateDistance(latitude, longitude);
      if (jarak > 20) {
        return res.status(200).json({
          status: 200,
          message: "Lokasi kamu lebih dari 20 meter dari kantor",
          jarak: jarak,
        });
      } else {
        if (tombol_type === "masuk") {
          // handle thumbnail
          let buffer = Buffer.from(foto.split(",")[1], "base64");
          let filePath = `${process.env.FILE_UPLOAD}/in/${fileName}`;
          fs.writeFileSync(path.join(__dirname, filePath), buffer);

          await Models.absens.create({
            user_id: user_id,
            date_now: date,
            tgl_in: date,
            status_in: absen_status,
            foto_in: fileName,
            lokasi_in: lokasi,
          });

          // ---------------------------
          // table absens harus ada satu data absens dengan column date_now hari ini, yang selain date_now nya harus null, ini dilakukan karena ketika query di halaman riwayat tapi user_id nya tidak ada, maka yang berurutan itu beberapa akan hilang. Maka dilakukanlah cara ini

          // cek dulu apakah ada data di table absens dengan date_now hari ini dan user_id nya null
          let kondisi_isTgl_isUserId_null = await sequelize.query(
            `SELECT * FROM absens WHERE date_now = '${
              at().tgl_sekarang
            }' and user_id is null`,
            { type: QueryTypes.SELECT }
          );
          if (kondisi_isTgl_isUserId_null.length <= 0) {
            await Models.absens.create({
              date_now: date,
            });
          }
          // --------------------------
        }
        if (tombol_type === "pulang") {
          // handle thumbnail
          let buffer = Buffer.from(foto.split(",")[1], "base64");
          let filePath = `${process.env.FILE_UPLOAD}/out/${fileName}`;

          // cek dulu apakah ada absen masuk
          let kondisi_masuk = await sequelize.query(
            `SELECT * FROM absens WHERE user_id = ${user_id} AND tgl_in LIKE '%${
              at().tgl_sekarang
            }%'`,
            { type: QueryTypes.SELECT }
          );

          if (kondisi_masuk.length > 0) {
            fs.writeFileSync(path.join(__dirname, filePath), buffer);
            await Models.absens.update(
              {
                tgl_out: date,
                status_out: absen_status,
                foto_out: fileName,
                lokasi_out: lokasi,
              },
              {
                where: {
                  date_now: date,
                  user_id: user_id,
                },
              }
            );
          } else {
            fs.writeFileSync(path.join(__dirname, filePath), buffer);

            await Models.absens.create({
              user_id: user_id,
              date_now: date,
              tgl_out: new Date(),
              status_out: absen_status,
              foto_out: fileName,
              lokasi_out: lokasi,
            });
          }
        }

        return res.status(200).json({
          status: 200,
          message: `berhasil absen ${tombol_type}`,
          jarak: jarak,
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 500,
        messsage: "Server error",
      });
    }
  };

  show(req: Request, res: Response): Response | Promise<Response> {
    return res.status(200).json({
      status: 200,
      message: "absen show",
    });
  }
  update(req: Request, res: Response): Response | Promise<Response> {
    return res.status(200).json({
      status: 200,
      message: "absen update",
    });
  }
  delete(req: Request, res: Response): Response | Promise<Response> {
    return res.status(200).json({
      status: 200,
      message: "absen delete",
    });
  }
}

export default new AbsenController();
