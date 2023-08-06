import BaseRouter from "../BaseRouter";
import AuthController from "../../controllers/AuthController";
import {
  valLogin,
  valLupaPassword,
  valResetPassword,
} from "../../validation/AuthValidation";
import { VerifyAuth } from "../../middleware";

class AuthRouter extends BaseRouter {
  public routers(): void {
    this.route.post("/login", valLogin, AuthController.login);
    this.route.get("/remember_me", AuthController.remember_me);
    this.route.post(
      "/lupa_password",
      valLupaPassword,
      AuthController.lupa_password
    );
    this.route.patch(
      "/reset_password/:email/:token",
      valResetPassword,
      AuthController.reset_password
    );
    this.route.get("/me", VerifyAuth, AuthController.me);
    this.route.delete("/logout", VerifyAuth, AuthController.logout);
  }
}

export default new AuthRouter().route;
