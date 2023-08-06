import BaseRouter from "../BaseRouter";
import AbsenController from "../../controllers/AbsenController";
import { VerifyIsUser, VerifyAuth } from "../../middleware";

class AbsenRouter extends BaseRouter {
  public routers(): void {
    this.route.get("/absen", VerifyAuth, VerifyIsUser, AbsenController.index);
    this.route.post("/absen", VerifyAuth, VerifyIsUser, AbsenController.create);
  }
}

export default new AbsenRouter().route;
