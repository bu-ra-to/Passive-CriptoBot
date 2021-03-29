const cron = require("node-cron");
const { app } = require("./app.js");
let whatToBuy = ["ltcusd", "ethusd"];
const task = cron.schedule(
  " * 6,12 * * *",
  () => {
    app(whatToBuy);
  },
  {
    scheduled: false,
  }
);
module.exports = { task };
