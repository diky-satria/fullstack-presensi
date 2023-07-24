import { Router } from "express";
import IRouter from "./IRouter";

abstract class BaseRouter implements IRouter {
  public route: Router;

  constructor() {
    this.route = Router();
    this.routers();
  }

  public abstract routers(): void;
}

export default BaseRouter;
