const cron = require("node-cron");
const { app } = require("./app.js");
let whatToBuy = ["ltcusd", "ethusd"];
let count = 0;

const task = cron.schedule("1,10,20,30,40 * * * * *", () => {
  console.log("running INSIDE every minute", count);
  app(whatToBuy);
  count++;
  if (count === 2) {
    task.stop();
  }
});
// app(whatToBuy).then(console.log);
task.start();
