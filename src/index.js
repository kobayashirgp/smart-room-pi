const moment = require("moment");
const express = require("express");
const bodyParser = require("body-parser");
const SerialPort = require("serialport");
const ByteLength = require("@serialport/parser-byte-length");

const hostname = "127.0.0.1";
const port = 3000;
const server = express();

var serialPort = new SerialPort("/dev/ttyACM0", {
  baudRate: 9600,
  dataBits: 8,
  parity: "none",
  stopBits: 1,
  flowControl: false,
});

var parser = serialPort.pipe(new ByteLength({ length: 16 }));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const router = express.Router();
router.get("/", function (req, res, next) {
  res.status(200).send({
    date: moment().format("DD/MM/YYYY HH:mm:ss"),
    info: "Olá mundo",
  });
  serialPort.write("hello from node\n", (err) => {
    if (err) {
      return console.log("Error on write: ", err.message);
    }
    console.log("message written");
  });
});

server.use(router);

server.listen(port, hostname, async () => {
  parser.on("data", function (data) {
    var dataUTF8 = data.toString("utf-8");
    if (dataUTF8.substring(0, 1) === ":") {
      console.log("Data: " + data);
    }
  });
  console.log(`Server running at http://${hostname}:${port}/`);
});
