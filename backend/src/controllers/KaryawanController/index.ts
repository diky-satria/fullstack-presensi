import { Request, Response } from "express";
import IController from "../IController";
import { sequelize } from "../../db/models/index";
import { QueryTypes } from "sequelize";
import bcrypt from "bcryptjs";
const Models = require("../../db/models/index.js");

class KaryawanController implements IController {
  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      let page: number = Number(req.query.page) || 0;
      let limit: number = Number(req.query.limit) || 10;
      let search: any = req.query.search || "";
      let search_db: string = search
        ? `where nip like '%${search}%' or users.nama like '%${search}%' or email like '%${search}%' or telepon like '%${search}%' or alamat like '%${search}%' or jabatans.nama like '%${search}%'`
        : "";
      let offset: number = page * limit;

      let total = await sequelize.query(
        `SELECT count(*) as total FROM karyawans JOIN users on users.id = karyawans.user_id join jabatans on jabatans.id = karyawans.jabatan_id ${search_db}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      let total_page: number = Math.ceil(total[0].total / limit);

      let data = await sequelize.query(
        `SELECT karyawans.id, user_id, jabatan_id, nip, users.nama as nama_karyawan, email, telepon, alamat, kode, jabatans.nama as nama_jabatan, status FROM karyawans JOIN users on users.id = karyawans.user_id join jabatans on jabatans.id = karyawans.jabatan_id ${search_db}
         order by karyawans.id desc limit ${offset},${limit}`,
        { type: QueryTypes.SELECT }
      );

      return res.status(200).json({
        status: 200,
        messsage: "Semua data karyawan",
        data: data,
        page: page,
        limit: limit,
        total_rows: total[0].total,
        total_page: total_page,
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
      const {
        nama,
        email,
        password,
        konfirmasi_password,
        jabatan_id,
        nip,
        telepon,
        alamat,
      } = req.body;

      const encrypt_password = await bcrypt.hash(password, 10);
      let user = await Models.users.create({
        nama: nama,
        email: email,
        role: "user",
        password: encrypt_password,
        status: 1,
      });
      let karyawan = await Models.karyawans.create({
        user_id: user.id,
        jabatan_id: jabatan_id,
        nip: nip,
        telepon: telepon,
        alamat: alamat,
      });

      return res.status(200).json({
        status: 200,
        message: "Karyawan berhasil ditambahkan",
        user: user,
        karyawan: karyawan,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 500,
        messsage: "Server error",
      });
    }
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      let data = await sequelize.query(
        `SELECT karyawans.id, user_id, jabatan_id, nip, users.nama as nama_karyawan, email, telepon, alamat, kode, jabatans.nama as nama_jabatan FROM karyawans JOIN users on users.id = karyawans.user_id join jabatans on jabatans.id = karyawans.jabatan_id where karyawans.id = ${id}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      return res.status(200).json({
        status: 200,
        message: "Detail karyawan",
        data: data,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 500,
        messsage: "Server error",
      });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params; // in router use user_id instead of id
      const { nama, jabatan_id, nip, telepon, alamat, email } = req.body;

      await Models.users.update(
        {
          nama: nama,
          email: email,
        },
        {
          where: {
            id: id,
          },
        }
      );

      await Models.karyawans.update(
        {
          jabatan_id: jabatan_id,
          nip: nip,
          telepon: telepon,
          alamat: alamat,
        },
        {
          where: {
            user_id: id,
          },
        }
      );

      return res.status(200).json({
        status: 200,
        message: "Karyawan berhasil diupdate",
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 500,
        messsage: "Server error",
      });
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params; // in router use user_id instead of id

      // cek dulu di table absen ada data yang punya user_id = id, kalo ada jangan hapus
      let data = await sequelize.query(
        `SELECT * FROM absens WHERE user_id = ${id} limit 1`,
        { type: QueryTypes.SELECT }
      );
      if (data.length > 0) {
        return res.status(400).json({
          status: 400,
          errors: "Data parent tidak bisa dihapus",
        });
      }

      await Models.karyawans.destroy({
        where: {
          user_id: id,
        },
      });
      await Models.users.destroy({
        where: {
          id: id,
        },
      });
      return res.status(200).json({
        status: 200,
        message: "Karyawan berhasil dihapus",
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 500,
        messsage: "Server error",
      });
    }
  };

  status = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params; // in router use user_id instead of id
      const { status } = req.body;
      var status_db = status === true ? 1 : 0;

      await Models.users.update(
        {
          status: status_db,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res.status(200).json({
        status: 200,
        message: "Status karyawan berhasil diedit",
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 500,
        messsage: "Server error",
      });
    }
  };
}

export default new KaryawanController();
