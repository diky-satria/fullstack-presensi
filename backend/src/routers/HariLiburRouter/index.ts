import BaseRouter from "../BaseRouter";
import HariLiburController from "../../controllers/HariLiburController";
import { valCreate, valUpdate } from "../../validation/HariLiburValidation";
import { VerifyIsAdmin, VerifyAuth } from "../../middleware";

class HariLiburRouter extends BaseRouter {
  public routers(): void {
    this.route.get(
      "/hari_libur",
      VerifyAuth,
      VerifyIsAdmin,
      HariLiburController.index
    );
    this.route.post(
      "/hari_libur",
      VerifyAuth,
      VerifyIsAdmin,
      valCreate,
      HariLiburController.create
    );
    this.route.patch(
      "/hari_libur/:id",
      VerifyAuth,
      VerifyIsAdmin,
      valUpdate,
      HariLiburController.update
    );
    this.route.delete(
      "/hari_libur/:tanggal",
      VerifyAuth,
      VerifyIsAdmin,
      HariLiburController.delete
    );
  }
}

export default new HariLiburRouter().route;
