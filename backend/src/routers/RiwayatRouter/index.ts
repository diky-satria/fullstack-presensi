import BaseRouter from "../BaseRouter";
import RiwayatController from "../../controllers/RiwayatController";
import { VerifyIsUser, VerifyAuth } from "../../middleware";

class RiwayatRouter extends BaseRouter {
  public routers(): void {
    this.route.get(
      "/riwayat",
      VerifyAuth,
      VerifyIsUser,
      RiwayatController.index
    );
  }
}

export default new RiwayatRouter().route;
