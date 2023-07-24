import BaseRouter from "../BaseRouter";
import HariLiburController from "../../controllers/HariLiburController";
import { valCreate } from "../../validation/HariLiburValidation";

class HariLiburRouter extends BaseRouter {
  public routers(): void {
    this.route.get("/hari_libur", HariLiburController.index);
    this.route.post("/hari_libur", valCreate, HariLiburController.create);
  }
}

export default new HariLiburRouter().route;
