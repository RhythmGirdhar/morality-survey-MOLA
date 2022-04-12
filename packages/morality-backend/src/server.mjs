import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import log from "log-beautify";
import GracefulShutdownManager from "@moebius/http-graceful-shutdown";
import { dbConfig } from "./db/config.mjs";
import { buildRoutes } from "./routes.mjs";

const app = express();
const port = 5002;

const corsOptions = {
  //Frontend resides on this origin
  origin: "http://localhost:5001",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", (request, response) => {
  response.json({ message: "Welcome to Morality application." });
});

app.listen(port, () => {
  log.info(`Example app listening on port ${port}`);
});

dbConfig.mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    log.ok("Connected to the database!");
  })
  .catch((err) => {
    log.error("Cannot connect to the database!", err);
    process.exit();
  });

buildRoutes(app);

const shutdownManager = new GracefulShutdownManager.GracefulShutdownManager(
  app
);

process.on("SIGTERM", () => {
  shutdownManager.terminate(() => {
    console.log("Server is gracefully terminated");
  });
});
