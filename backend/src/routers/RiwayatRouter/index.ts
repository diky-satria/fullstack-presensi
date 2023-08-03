import BaseRouter from "../BaseRouter";
import RiwayatController from "../../controllers/RiwayatController";

class RiwayatRouter extends BaseRouter {
  public routers(): void {
    this.route.get("/riwayat", RiwayatController.index);
  }
}

export default new RiwayatRouter().route;
