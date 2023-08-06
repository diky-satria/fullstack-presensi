import { ucwords } from "./../../helpers/index";
import IController from "../IController";
import { Request, Response } from "express";
import { sequelize } from "../../db/models/index";
import { QueryTypes } from "sequelize";
import { from_date, to_date } from "../../helpers";

class DashboardController implements IController {
  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      let user_id: number = Number(req.query.user_id) || 0;

      // cek user_id yang dipilih ada atau tidak
      let isUserCreated = await sequelize.query(
        `SELECT DATE_FORMAT(createdAt, "%Y-%m-%d %H:%i") as createdAt FROM users where id = ${user_id}`,
        { type: QueryTypes.SELECT }
      );

      if (user_id == 0 || isUserCreated.length <= 0) {
        return res.status(200).json({
          status: 200,
          message: "Riwayat absensi",
          data: [],
          page: 0,
          limit: 10,
          total_rows: 0,
          total_page: 0,
          from_date: "",
          to_date: "",
          pie_data_in: [],
          pie_label_in: [],
          pie_data_out: [],
          pie_label_out: [],
          pernah_absen: "User ini tidak terdaftar",
        });
      }

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

      // format date sql %Y-%m-%d
      let data = await sequelize.query(
        `WITH RECURSIVE date_range AS (SELECT DATE('${fd}') AS date UNION ALL SELECT DATE_ADD(date, INTERVAL 1 DAY) FROM date_range WHERE date < '${td}' ) SELECT date, DATE_FORMAT(tgl_in, "%H:%i") as tgl_in, DATE_FORMAT(tgl_out, "%H:%i") as tgl_out, status_in, status_out, foto_in, foto_out, lokasi_in, lokasi_out, hari_liburs.nama as libur, users.id as user_id, users.nama as nama FROM date_range LEFT JOIN (SELECT * FROM absens WHERE user_id = ${user_id}) as absens ON date_range.date = absens.date_now LEFT JOIN hari_liburs ON date_range.date = hari_liburs.tanggal LEFT JOIN users ON absens.user_id = users.id WHERE user_id = ${user_id} or user_id is null ORDER BY date ASC limit ${offset},${limit}`,
        { type: QueryTypes.SELECT }
      );

      // cek apakah sudah pernah melakukan absensi atau belum(ini dibutuhkan untuk notifikasi di frontend)
      let isPernahAbsen: string;
      let isAbsen = await sequelize.query(
        `SELECT * FROM absens where user_id = ${user_id} and date_now >= '${fd}' and date_now <= '${td}' order by date_now asc limit 1`,
        { type: QueryTypes.SELECT }
      );
      if (isAbsen.length > 0) {
        isPernahAbsen = `Karyawan ini didaftarkan pada ${isUserCreated[0].createdAt} dan melakukan absensi pertama kali pada tanggal ${isAbsen[0].date_now}`;
      } else {
        isPernahAbsen = `Karyawan ini didaftarkan pada ${isUserCreated[0].createdAt} dan belum pernah melakukan absensi sama sekali`;
      }

      // pie chart in
      let query_pie_in = await sequelize.query(
        `SELECT status_in, count(*) as total FROM absens where user_id = ${user_id} and date_now >= '${fd}' and date_now <= '${td}' group by status_in`,
        { type: QueryTypes.SELECT }
      );

      let pie_data_in: number[] = [];
      let pie_label_in: string[] = [];
      let pie_color_in: string[] = [];
      for (let i = 0; i < query_pie_in.length; i++) {
        let label_kondisi: string;
        let color_in: string;
        if (query_pie_in[i].status_in === "tepat_waktu_masuk") {
          label_kondisi = "Tepat waktu";
          color_in = "rgb(83,86,251)";
        } else if (query_pie_in[i].status_in === "telat") {
          label_kondisi = "Telat";
          color_in = "rgb(255,193,7)";
        } else {
          label_kondisi = "Tidak absen";
          color_in = "rgb(220,53,69)";
        }
        if (query_pie_in[i].total != 0) {
          pie_data_in.push(query_pie_in[i].total);
          pie_label_in.push(label_kondisi);
          pie_color_in.push(color_in);
        }
      }
      // end pie chart in

      // pie chart out
      let query_pie_out = await sequelize.query(
        `SELECT status_out, count(*) as total FROM absens where user_id = ${user_id} and date_now >= '${fd}' and date_now <= '${td}' group by status_out`,
        { type: QueryTypes.SELECT }
      );

      let pie_data_out: number[] = [];
      let pie_label_out: string[] = [];
      let pie_color_out: string[] = [];
      for (let i = 0; i < query_pie_out.length; i++) {
        let label_kondisi: string;
        let color_out: string;
        if (query_pie_out[i].status_out === "tepat_waktu_pulang") {
          label_kondisi = "Tepat waktu";
          color_out = "rgb(83,86,251)";
        } else {
          label_kondisi = "Tidak absen";
          color_out = "rgb(220,53,69)";
        }
        if (query_pie_out[i].total != 0) {
          pie_data_out.push(query_pie_out[i].total);
          pie_label_out.push(label_kondisi);
          pie_color_out.push(color_out);
        }
      }
      // end pie chart out

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
        pie_data_in: pie_data_in,
        pie_label_in: pie_label_in,
        pie_color_in: pie_color_in,
        pie_data_out: pie_data_out,
        pie_label_out: pie_label_out,
        pie_color_out: pie_color_out,
        pernah_absen: isPernahAbsen,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 500,
        messsage: "Server error",
      });
    }
  };

  getAllUserForSelect = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let data_query = await sequelize.query(
        `SELECT id, nama, role, status FROM users WHERE role != 'admin' and status = 1 order by nama ASC`,
        { type: QueryTypes.SELECT }
      );

      let data = [];
      for (let i = 0; i < data_query.length; i++) {
        data.push({
          value: data_query[i].id,
          label: ucwords(data_query[i].nama),
        });
      }

      return res.status(200).json({
        message: "Semua user",
        data: data,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Server error",
      });
    }
  };

  create(req: Request, res: Response): Response | Promise<Response> {
    return res.status(200).json({
      status: 200,
      message: "dashboard create",
    });
  }

  show(req: Request, res: Response): Response | Promise<Response> {
    return res.status(200).json({
      status: 200,
      message: "dashboard show",
    });
  }

  update(req: Request, res: Response): Response | Promise<Response> {
    return res.status(200).json({
      status: 200,
      message: "dashboard update",
    });
  }

  delete(req: Request, res: Response): Response | Promise<Response> {
    return res.status(200).json({
      status: 200,
      message: "dashboard delete",
    });
  }
}

export default new DashboardController();
