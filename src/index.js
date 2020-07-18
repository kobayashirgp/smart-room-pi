const http = require("http");
const moment = require("moment");
const LCD = require("raspberrypi-liquid-crystal-simple");

const lcd = new LCD(1, 0x27, 16, 2);

const hostname = "127.0.0.1";
const port = 3000;
lcd.cursor = true;
lcd.display = true;
const server = http.createServer();

server.listen(port, hostname, async () => {
  lcd.on("error", (ex) => console.log(ex));
  lcd.on("ready", () => {
    lcd.setLine(0, "Hello World");
    console.log("ready");
    //setInterval(() => lcd.setLine(0, moment().format("DD/MM/YYYY HH:mm:ss")), 1000);
  });
  lcd.initSync();
  console.log(`Server running at http://${hostname}:${port}/`);
});
