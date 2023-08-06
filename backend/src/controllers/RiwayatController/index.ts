import { Request, Response } from "express";
import IController from "../IController";
import { sequelize } from "../../db/models/index";
import { QueryTypes } from "sequelize";
import { from_date, to_date } from "../../helpers";

class RiwayatController implements IController {
  index = async (req: Request | any, res: Response): Promise<Response> => {
    try {
      let user_id: number = req.user.id; // diky satria ramadanu
      let fd: any = req.query.from_date || from_date();
      let td: any = req.query.to_date || to_date();

      let page: number = Number(req.query.page) || 0;
      let limit: number = Number(req.query.limit) || 10;
      let offset: number = page * limit;

      let total = await sequelize.query(
        `WITH RECURSIVE date_range AS (SELECT DATE('${fd}') as date UNION ALL SELECT DATE_ADD(date, INTERVAL 1 DAY) FROM date_range WHERE date < '${td}' ) SELECT count(date) as total FROM date_range left join hari_liburs on date_range.date = hari_liburs.tanggal`,
        {
          type: QueryTypes.SELECT,
        }
      );
      let total_page: number = Math.ceil(total[0].total / limit);

      // format date sql DATE_FORMAT(column_name, "%Y-%m-%d")
      let data = await sequelize.query(
        `WITH RECURSIVE date_range AS (SELECT DATE('${fd}') AS date UNION ALL SELECT DATE_ADD(date, INTERVAL 1 DAY) FROM date_range WHERE date < '${td}' ) SELECT date, DATE_FORMAT(tgl_in, "%H:%i") as tgl_in, DATE_FORMAT(tgl_out, "%H:%i") as tgl_out, status_in, status_out, foto_in, foto_out, lokasi_in, lokasi_out, hari_liburs.nama as libur, users.id as user_id, users.nama as nama FROM date_range LEFT JOIN (SELECT * FROM absens WHERE user_id = ${user_id}) as absens ON date_range.date = absens.date_now LEFT JOIN hari_liburs ON date_range.date = hari_liburs.tanggal LEFT JOIN users ON absens.user_id = users.id WHERE user_id = ${user_id} or user_id is null ORDER BY date ASC limit ${offset},${limit}`,
        { type: QueryTypes.SELECT }
      );

      return res.status(200).json({
        status: 200,
        message: "Riwayat absensi",
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
  create(req: Request, res: Response): Response | Promise<Response> {
    return res.status(200).json({
      status: 200,
      message: "riwayat create",
    });
  }
  show(req: Request, res: Response): Response | Promise<Response> {
    return res.status(200).json({
      status: 200,
      message: "riwayat show",
    });
  }
  update(req: Request, res: Response): Response | Promise<Response> {
    return res.status(200).json({
      status: 200,
      message: "riwayat update",
    });
  }
  delete(req: Request, res: Response): Response | Promise<Response> {
    return res.status(200).json({
      status: 200,
      message: "riwayat delete",
    });
  }
}

export default new RiwayatController();
