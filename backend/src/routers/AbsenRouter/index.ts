import BaseRouter from "../BaseRouter";
import AbsenController from "../../controllers/AbsenController";

class AbsenRouter extends BaseRouter {
  public routers(): void {
    this.route.get("/absen", AbsenController.index);
    this.route.post("/absen", AbsenController.create);
  }
}

export default new AbsenRouter().route;
