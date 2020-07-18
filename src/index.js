const moment = require("moment");
const express = require("express");
const bodyParser = require("body-parser");

const hostname = "127.0.0.1";
const port = 3000;
const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const router = express.Router();
router.get("/", function (req, res, next) {
  res.status(200).send({
    date: moment().format("DD/MM/YYYY HH:mm:ss"),
    info: "Olá mundo",
  });
});

server.use(router);

server.listen(port, hostname, async () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
