import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

// router
import RootRouter from "./routers/RootRouter";
import JabatanRouter from "./routers/JabatanRouter";
import KaryawanRouter from "./routers/KaryawanRouter";
import HariLiburRouter from "./routers/HariLiburRouter";
import AbsenRouter from "./routers/AbsenRouter";
import RiwayatRouter from "./routers/RiwayatRouter";

class App {
  public app: Express;

  constructor() {
    this.app = express();
    dotenv.config();
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
  }

  protected routes(): void {
    this.app.use("/", RootRouter);
    this.app.use("/api/v1/", JabatanRouter);
    this.app.use("/api/v1/", KaryawanRouter);
    this.app.use("/api/v1/", HariLiburRouter);
    this.app.use("/api/v1/", AbsenRouter);
    this.app.use("/api/v1/", RiwayatRouter);
  }
}

const app = new App().app;
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
