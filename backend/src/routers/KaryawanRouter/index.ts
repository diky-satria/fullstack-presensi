import BaseRouter from "../BaseRouter";
import KaryawanController from "../../controllers/KaryawanController";
import { valCreate, valUpdate } from "../../validation/KaryawanValidation";

class KaryawanRouter extends BaseRouter {
  public routers(): void {
    this.route.get("/karyawan", KaryawanController.index);
    this.route.post("/karyawan", valCreate, KaryawanController.create);
    this.route.get("/karyawan/:id", KaryawanController.show);
    this.route.patch("/karyawan/:id", valUpdate, KaryawanController.update);
    this.route.delete("/karyawan/:id", KaryawanController.delete);
    this.route.patch("/karyawan/status/:id", KaryawanController.status);
  }
}

export default new KaryawanRouter().route;
