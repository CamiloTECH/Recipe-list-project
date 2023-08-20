import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes";

const server: Application = express();

server.use(express.json({ limit: "50mb" }));
server.use(cors());
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

server.use("/", routes);

export default server;
