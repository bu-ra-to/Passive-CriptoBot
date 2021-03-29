const { getBalanceUSD, getPrice, buyOrder, cancelOrder } = require("./methods");
const app = async (whatToBuy) => {
  try {
    /// One time a year get available balance to determine spending budjet for a month
    let availableBalance = await getBalanceUSD("USD").then(
      (data) => data[0].available / 24
    );
    // let spentOnCoin = Math.floor(availableBalance / whatToBuy.length);
    let spentOnCoin = 100 * 0.95;
    // getting price for coin information and creating buy order
    for (const iterator of whatToBuy) {
      const price = await getPrice(iterator).then((res) => res.ask);
      const priceModified = price * 1.003;
      const marketPrice = priceModified.toFixed(2);
      const amount = (spentOnCoin / marketPrice).toFixed(3);

      buyOrder(iterator, marketPrice, amount)
        .then(() => {
          console.log(
            `${iterator} confirmed for the $${marketPrice} vs $${price} amount ${amount} `
          );
        })
        .catch((e) => console.error("buyOrder error: ", e));
    }
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(() => {
      getBalanceUSD("USD").then(console.log);
      cancelOrder();
    }, 1000);
  }
};
// async function app(name) {
//   let date = new Date();
//   console.log(name, date.getSeconds());
// }
module.exports = { app };
