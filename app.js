const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { sequelize } = require("./models");

class Server {
  expressconnect = async () => {
    this.app = express();
    this.PORT = 3000;
  };

  connectMiddleware = async () => {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(express.static("public"));
  };

  //   connectDatabase = async () => {
  //     sequelize
  //       .sync()
  //       .then(() => {
  //         console.log(`${this.PORT}번 포트가 정상적으로 열렸습니다`);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   };

  start = async () => {
    this.expressconnect();
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