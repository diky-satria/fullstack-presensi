import { Request, Response } from "express";
import IController from "../IController";
import { sequelize } from "../../db/models/index";
import { QueryTypes } from "sequelize";
const Models = require("../../db/models/index.js");

class JabatanController implements IController {
  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      let page: number = Number(req.query.page) || 0;
      let limit: number = Number(req.query.limit) || 10;
      let search: any = req.query.search || "";
      let search_db: string = search
        ? `WHERE kode LIKE '%${search}%' OR nama LIKE '%${search}%'`
        : "";
      let offset: number = page * limit;

      let total = await sequelize.query(
        `SELECT count(*) as total FROM jabatans ${search_db}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      let total_page: number = Math.ceil(total[0].total / limit);

      let data = await sequelize.query(
        `SELECT id, kode, nama FROM jabatans ${search_db}
       order by id desc limit ${offset},${limit}`,
        { type: QueryTypes.SELECT }
      );

      return res.status(200).json({
        status: 200,
        messsage: "Semua data jabatan",
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
      const { kode, nama } = req.body;
      let data = await Models.jabatans.create({
        kode: kode,
        nama: nama,
      });
      return res.status(200).json({
        status: 200,
        message: "Jabatan berhasil ditambahkan",
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

  show(req: Request, res: Response): Response | Promise<Response> {
    return res.status(200).json({
      message: "Jabatan show",
    });
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { kode, nama } = req.body;

      await Models.jabatans.update(
        {
          kode: kode,
          nama: nama,
        },
        {
          where: {
            id: id,
          },
        }
      );

      return res.status(200).json({
        status: 200,
        message: "Jabatan berhasil diupdate",
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
      const { id } = req.params;
      await Models.jabatans.destroy({
        where: {
          id: id,
        },
      });
      return res.status(200).json({
        status: 200,
        message: "Jabatan berhasil dihapus",
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        message: "Data parent tidak bisa dihapus!",
      });
    }
  };

  jabatanAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      let data = await sequelize.query(
        `SELECT id, kode, nama FROM jabatans
       order by id desc`,
        { type: QueryTypes.SELECT }
      );

      return res.status(200).json({
        status: 200,
        messsage: "Semua data jabatan",
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
}

export default new JabatanController();
