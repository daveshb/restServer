const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/api/user";

    // Database
    this.connectingDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async connectingDB() {
      await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Reading and parsing body
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.userPath, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port", this.port);
    });
  }
}

module.exports = Server;
