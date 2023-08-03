import BaseRouter from "../BaseRouter";
import HariLiburController from "../../controllers/HariLiburController";
import { valCreate, valUpdate } from "../../validation/HariLiburValidation";

class HariLiburRouter extends BaseRouter {
  public routers(): void {
    this.route.get("/hari_libur", HariLiburController.index);
    this.route.post("/hari_libur", valCreate, HariLiburController.create);
    this.route.patch("/hari_libur/:id", valUpdate, HariLiburController.update);
    this.route.delete("/hari_libur/:tanggal", HariLiburController.delete);
  }
}

export default new HariLiburRouter().route;
