const fs = require("fs");
const pptr = require("puppeteer-core");

const requestWrapper = require("./req");

const getter = async (remap, path) => {
  const browser = await pptr.launch({
    executablePath: "/usr/bin/brave-browser",
    userDataDir: "./usrdir",
    headless: false,
  });

  const page = await browser.newPage();
  console.log("Terbuka halaman baru");

  const req = requestWrapper(page);

  await page.goto("https://kbbi.kata.web.id/", {
    timeout: 0,
  });
  console.log("Selesai terbuka web kbbi");

  console.log("Promise dikerjakan");
  const data = await Promise.all(
    remap.map((arr) => {
      if (arr.map) return Promise.all(arr.map(req));
      return req(arr);
    })
  );
  console.log("Promise selesai");

  console.log("Menulis file");
  await fs.promises.writeFile(path, JSON.stringify(data, null, 2));
  console.log("File tertulis");

  const pages = await browser.pages();
  await Promise.all(pages.map((page) => page.close()));
  await browser.close();
  console.log("Browser ditutup");
};

module.exports = getter;
