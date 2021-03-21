// global.fetch = require("node-fetch");
const GeminiAPI = require("gemini-api").default;

const { key, secret } = require("./config/keys");
const restClient = new GeminiAPI({ key, secret, sandbox: true });

async function buyOrder(symbol, price, amount) {
  await restClient
    .newOrder({
      symbol: symbol,
      amount: amount,
      price: price,
      side: "buy",
      //   options: ["immediate-or-cancel"],
    })
    .catch((e) => console.error(`Inside newOrder: ${symbol} ` + e));
}
async function getBalanceUSD(param) {
  let currency = param.toUpperCase();
  let balance = await restClient
    .getMyAvailableBalances()
    .then((res) => {
      return res.filter((arr) => {
        return arr.currency == currency ? true : false;
      });
    })
    .catch((e) => console.error("GetBalance error: ", e));
  return balance;
}
async function getLastTrade(iterator) {
  return await restClient.getMyPastTrades({ symbol: iterator });
}
async function getPrice(currency) {
  return await restClient
    .getTicker(currency)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((e) => console.error("Inside method.js getPrice(): ", e));
}
async function cancelOrder() {
  return await restClient.cancelAllActiveOrders();
}
module.exports = {
  getBalanceUSD,
  getPrice,
  buyOrder,
  getLastTrade,
  cancelOrder,
};
