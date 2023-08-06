import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

// router
import RootRouter from "./routers/RootRouter";
import JabatanRouter from "./routers/JabatanRouter";
import KaryawanRouter from "./routers/KaryawanRouter";
import HariLiburRouter from "./routers/HariLiburRouter";
import AbsenRouter from "./routers/AbsenRouter";
import RiwayatRouter from "./routers/RiwayatRouter";
import DashboardRouter from "./routers/DashboardRouter";
import AuthRouter from "./routers/AuthRouter";
import SettingRouter from "./routers/SettingRouter";

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.static(`${process.env.STATIC_FOLDER}`));
    this.app.use(bodyParser.json({ limit: "100mb" }));
    this.app.use(
      cors({
        credentials: true,
        origin: "http://localhost:3000",
      })
    );
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
          secure: "auto",
          maxAge: Number(process.env.SESSION_EXPIRE),
        },
      })
    );
    this.app.use(cookieParser());
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  protected routes(): void {
    this.app.use("/", RootRouter);
    this.app.use("/api/v1/", JabatanRouter);
    this.app.use("/api/v1/", KaryawanRouter);
    this.app.use("/api/v1/", HariLiburRouter);
    this.app.use("/api/v1/", AbsenRouter);
    this.app.use("/api/v1/", RiwayatRouter);
    this.app.use("/api/v1/", DashboardRouter);
    this.app.use("/api/v1/", AuthRouter);
    this.app.use("/api/v1/", SettingRouter);
  }
}

const app = new App().app;
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
