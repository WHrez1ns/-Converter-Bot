const puppeteer = require("puppeteer");
const readlineSync = require("readline-sync");

console.log("Bem vindo ao Bot Conversor 💰");

async function robo() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const moedaBase =
    readlineSync.question("Qual o valor da moeda base? ") || "dolar";
  const moedaFinal =
    readlineSync.question("Qual o valor da moeda final? ") || "real";

  const url = `https://www.google.com/search?client=opera-gx&q=${moedaBase}+for+${moedaFinal}&sourceid=opera&ie=UTF-8&oe=UTF-8`;

  await page.goto(url);

  const resultado = await page.evaluate(() => {
    return document.querySelector(
      "#knowledge-currency__updatable-data-column > div.ePzRBb > div > div.MWvIVe.egcvbb > input"
    ).value;
  });

  console.log(`O valor de 1 ${moedaBase} em ${moedaFinal} é: ${resultado}`);

  await browser.close();
}

robo();
