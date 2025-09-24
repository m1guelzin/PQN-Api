const express = require("express");
const cors = require("cors");
const testConnect = require("./db/testConnect");

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    testConnect(); // testa a conexão sempre que a API sobe
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  routes() {
    const apiRoutes = require("./routes/apiRoutes");
    this.express.use("/social-pqn/ticket", apiRoutes); // URL base
  }
}

module.exports = new AppController().express;
