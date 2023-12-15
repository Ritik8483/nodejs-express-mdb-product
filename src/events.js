const fs = require("node:fs");
const EventEmitter = require("node:events");

const readStream = fs.createReadStream("./data.json", "utf-8");

readStream.on("data", (data) => {
//   console.log(`readable:`, data);
});

readStream.on("end", (data) => {
//   console.log(`end:`, data);
});

const myEmitter = new EventEmitter();
myEmitter.on("demo", () => {
  console.log("an demo occurred!");
});
myEmitter.emit("demo");
