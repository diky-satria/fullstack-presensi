import BaseRouter from "../BaseRouter";
import KaryawanController from "../../controllers/KaryawanController";
import { valCreate, valUpdate } from "../../validation/KaryawanValidation";
import { VerifyIsAdmin, VerifyAuth } from "../../middleware";

class KaryawanRouter extends BaseRouter {
  public routers(): void {
    this.route.get(
      "/karyawan",
      VerifyAuth,
      VerifyIsAdmin,
      KaryawanController.index
    );
    this.route.post(
      "/karyawan",
      VerifyAuth,
      VerifyIsAdmin,
      valCreate,
      KaryawanController.create
    );
    this.route.get(
      "/karyawan/:id",
      VerifyAuth,
      VerifyIsAdmin,
      KaryawanController.show
    );
    this.route.patch(
      "/karyawan/:id",
      VerifyAuth,
      VerifyIsAdmin,
      valUpdate,
      KaryawanController.update
    );
    this.route.delete(
      "/karyawan/:id",
      VerifyAuth,
      VerifyIsAdmin,
      KaryawanController.delete
    );
    this.route.patch(
      "/karyawan/status/:id",
      VerifyAuth,
      VerifyIsAdmin,
      KaryawanController.status
    );
  }
}

export default new KaryawanRouter().route;
