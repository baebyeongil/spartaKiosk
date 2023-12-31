const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { sequelize } = require("./models");
const indexRouter = require("./routes/index.routes");
const OptionRepository = require("./repositories/options.repositories");
const myCache = require("./cache");

class Server {
  optionRepository = new OptionRepository();

  expressConnect = async () => {
    this.app = express();
    this.PORT = 3000;
  };

  fetchOptionData = async () => {
    const optionData = await this.optionRepository.viewOption();
    const optionCache = await myCache.set("option", optionData);
    if (!optionCache) {
      console.log("optionCache False");
    } else {
      console.log("optionCache True");
    }
  };

  connectMiddleware = async (test) => {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use("/api", indexRouter);
    this.app.use(express.static("public"));
  };

  connectDatabase = async () => {
    sequelize
      .sync({ force: true })
      .then(() => {
        console.log(`${this.PORT}번 포트가 정상적으로 열렸습니다1`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  start = async () => {
    this.fetchOptionData();
    this.expressConnect();
    this.connectMiddleware();
    // this.connectDatabase();
    this.app.listen(3000, () => {
      console.log(`${this.PORT}번 포트가 정상적으로 열렸습니다`);
    });

    this.connectApi();
  };

  connectApi = async () => {
    this.app.get("/", (req, res) => {
      res.send("Hello");
    });
  };
}

const server = new Server();

server.start();
