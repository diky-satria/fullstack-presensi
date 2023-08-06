import BaseRouter from "../BaseRouter";
import SettingController from "../../controllers/SettingController";
import { VerifyAuth } from "../../middleware";
import { valUbahPassword } from "../../validation/SettingValidation";

class SettingRouter extends BaseRouter {
  public routers(): void {
    this.route.patch(
      "/ubah_password",
      VerifyAuth,
      valUbahPassword,
      SettingController.index
    );
  }
}

export default new SettingRouter().route;
