import BaseRouter from "../BaseRouter";
import JabatanController from "../../controllers/JabatanController";
import { valCreate, valUpdate } from "../../validation/JabatanValidation";
import { VerifyIsAdmin, VerifyAuth } from "../../middleware";

class JabatanRouter extends BaseRouter {
  public routers(): void {
    this.route.get(
      "/jabatan",
      VerifyAuth,
      VerifyIsAdmin,
      JabatanController.index
    );
    this.route.get(
      "/jabatan_all",
      VerifyAuth,
      VerifyIsAdmin,
      JabatanController.jabatanAll
    );
    this.route.post(
      "/jabatan",
      VerifyAuth,
      VerifyIsAdmin,
      valCreate,
      JabatanController.create
    );
    this.route.patch(
      "/jabatan/:id",
      VerifyAuth,
      VerifyIsAdmin,
      valUpdate,
      JabatanController.update
    );
    this.route.delete(
      "/jabatan/:id",
      VerifyAuth,
      VerifyIsAdmin,
      JabatanController.delete
    );
  }
}

export default new JabatanRouter().route;
