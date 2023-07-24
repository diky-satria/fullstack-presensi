import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

// router
import RootRouter from "./routers/RootRouter";
import JabatanRouter from "./routers/JabatanRouter";
import KaryawanRouter from "./routers/KaryawanRouter";
import HariLiburRouter from "./routers/HariLiburRouter";

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
  }
}

const app = new App().app;
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
