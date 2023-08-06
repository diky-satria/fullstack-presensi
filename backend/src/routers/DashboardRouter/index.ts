import BaseRouter from "../BaseRouter";
import DashboardController from "../../controllers/DashboardController";
import { VerifyIsAdmin, VerifyAuth } from "../../middleware";

class DashboardRouter extends BaseRouter {
  public routers(): void {
    this.route.get(
      "/dashboard",
      VerifyAuth,
      VerifyIsAdmin,
      DashboardController.index
    );
    this.route.get(
      "/dashboard/select/user",
      VerifyAuth,
      VerifyIsAdmin,
      DashboardController.getAllUserForSelect
    );
  }
}

export default new DashboardRouter().route;
