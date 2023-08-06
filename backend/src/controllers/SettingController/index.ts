import { Request, Response } from "express";
import IController from "../IController";
import { sequelize } from "../../db/models/index";
import { QueryTypes } from "sequelize";
import bcrypt from "bcryptjs";
const Models = require("../../db/models/index.js");

class SettingController implements IController {
  index = async (req: Request | any, res: Response): Promise<Response> => {
    try {
      // cek user berdasarkan email yang di input
      const user = await sequelize.query(
        `SELECT * FROM users WHERE email = "${req.user.email}"`,
        { type: QueryTypes.SELECT }
      );

      if (user.length > 0) {
        const password = await bcrypt.compare(
          req.body.passwordLama,
          user[0].password
        );

        if (password) {
          const cekPasswordBaru = await bcrypt.compare(
            req.body.passwordBaru,
            user[0].password
          );

          if (cekPasswordBaru) {
            return res.status(422).json({
              errors: {
                msg: "Password baru tidak boleh sama dengan password lama",
                param: "passwordBaru",
              },
            });
          }

          const encrypt_password = await bcrypt.hash(req.body.passwordBaru, 10);
          await Models.users.update(
            {
              password: encrypt_password,
            },
            {
              where: {
                email: req.user.email,
              },
            }
          );

          return res.status(200).json({
            msg: "Password berhasil diubah",
          });
        } else {
          return res.status(422).json({
            errors: {
              msg: "Password lama salah",
              param: "passwordLama",
            },
          });
        }
      } else {
        return res.status(422).json({
          errors: {
            msg: "Email tidak terdaftar",
            param: "email",
          },
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
  create(req: Request, res: Response): Response | Promise<Response> {
    return res.status(200).json({
      status: 200,
      message: "Setting create",
    });
  }
  show(req: Request, res: Response): Response | Promise<Response> {
    return res.status(200).json({
      status: 200,
      message: "Setting show",
    });
  }
  update(req: Request, res: Response): Response | Promise<Response> {
    return res.status(200).json({
      status: 200,
      message: "Setting update",
    });
  }
  delete(req: Request, res: Response): Response | Promise<Response> {
    return res.status(200).json({
      status: 200,
      message: "Setting delete",
    });
  }
}

export default new SettingController();
