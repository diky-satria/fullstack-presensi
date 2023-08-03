import { Request, Response } from "express";
import IController from "../IController";
import { sequelize } from "../../db/models";
import { QueryTypes } from "sequelize";
import { from_date, to_date } from "../../helpers";
const Models = require("../../db/models/index.js");

class HariLiburController implements IController {
  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      let fd: any = req.query.from_date || from_date();
      let td: any = req.query.to_date || to_date();

      let page: number = Number(req.query.page) || 0;
      let limit: number = Number(req.query.limit) || 10;
      let search: any = req.query.search || "";
      let search_db: string = search
        ? `WHERE date LIKE '%${search}%' OR nama LIKE '%${search}%'`
        : "";
      let offset: number = page * limit;

      let total = await sequelize.query(
        `WITH RECURSIVE date_range AS (SELECT DATE('${fd}') as date UNION ALL SELECT DATE_ADD(date, INTERVAL 1 DAY) FROM date_range WHERE date < '${td}' ) SELECT count(date) as total FROM date_range left join hari_liburs on date_range.date = hari_liburs.tanggal ${search_db}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      let total_page: number = Math.ceil(total[0].total / limit);

      //   sql format date
      // DATE_FORMAT(date, "%a, %e-%c-%Y")
      let data = await sequelize.query(
        `WITH RECURSIVE date_range AS (SELECT DATE('${fd}') as date UNION ALL SELECT DATE_ADD(date, INTERVAL 1 DAY) FROM date_range WHERE date < '${td}' ) SELECT date as tanggal, nama FROM date_range left join hari_liburs on date_range.date = hari_liburs.tanggal ${search_db} order by date asc limit ${offset},${limit}`,
        { type: QueryTypes.SELECT }
      );

      return res.status(200).json({
        status: 200,
        message: "Hari libur index",
        data: data,
        page: page,
        limit: limit,
        total_rows: total[0].total,
        total_page: total_page,
        from_date: fd,
        to_date: td,
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
      const { tanggal, nama } = req.body;

      await Models.hari_liburs.create({
        tanggal: tanggal,
        nama: nama,
      });

      return res.status(200).json({
        status: 200,
        message: "Hari libur berhasil ditambahkan",
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
      status: 200,
      message: "Hari libur show",
    });
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params; // id of hari_liburs table
      const { tanggal, nama } = req.body;

      await Models.hari_liburs.update(
        {
          tanggal: tanggal,
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
        message: "Hari libur berhasil diedit",
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
      const { tanggal } = req.params; // tanggal of hari_liburs table

      await Models.hari_liburs.destroy({
        where: {
          tanggal: tanggal,
        },
      });

      return res.status(200).json({
        status: 200,
        message: "Hari libur berhasil diganti menjadi masuk",
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

export default new HariLiburController();
