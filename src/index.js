const http = require("http");
const moment = require("moment");
const LCD = require("raspberrypi-liquid-crystal-simple");
const { emit } = require("process");

const lcd = new LCD(1, 0x27, 16, 2);

lcd.lines = ["Hello", "World"];
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer();

server.listen(port, hostname, async () => {
  lcd.on("error", (ex) => console.log(ex));
  lcd.on("ready", () => console.log("ready"));
  await lcd.init();
  lcd.setLine(0, "Hello World");
  setInterval(() => lcd.setLine(0, moment().format("DD/MM/YYYY HH:mm:ss")), 1000);
  console.log(`Server running at http://${hostname}:${port}/`);
});
