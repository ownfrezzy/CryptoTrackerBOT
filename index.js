const { Telegraf } = require("telegraf");
require("dotenv").config();
const axios = require("axios");
const TELEGRAM_BOT_TOKEN = process.env.TOKEN;

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

console.log(`Started: ${TELEGRAM_BOT_TOKEN}`);

function get_price(coin) {
  crypto_data = axios.get(
    `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coin}&tsyms=USD`
  );
  return crypto_data;
}

bot.start((ctx) => {
  ctx.reply('Welcome to Easy Currency Bot! Made by KS');
});

bot.hears(/^[A-Z]+$/i, async (ctx) => {
  console.log(ctx.message.text);
  const clientCoin = ctx.message.text;
  get_price(clientCoin).then((obj) => {
    const coin = obj.data.RAW[clientCoin].USD;
    ctx.reply(`
    ${clientCoin} Live stats>>
PRICE: ${coin.PRICE}$
24h l/h: ${coin.LOW24HOUR}$ - ${coin.HIGH24HOUR}$
24h Change: ${coin.CHANGEPCT24HOUR.toFixed(2)}%
60m Change: ${coin.CHANGEPCTHOUR.toFixed(2)}%
    `);
  });
});

bot.startPolling();
