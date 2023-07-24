import BaseRouter from "../BaseRouter";
import JabatanController from "../../controllers/JabatanController";
import { valCreate, valUpdate } from "../../validation/JabatanValidation";

class JabatanRouter extends BaseRouter {
  public routers(): void {
    this.route.get("/jabatan", JabatanController.index);
    this.route.get("/jabatan_all", JabatanController.jabatanAll);
    this.route.post("/jabatan", valCreate, JabatanController.create);
    this.route.patch("/jabatan/:id", valUpdate, JabatanController.update);
    this.route.delete("/jabatan/:id", JabatanController.delete);
  }
}

export default new JabatanRouter().route;
