const fs = require("fs");
const pptr = require("puppeteer-core");

const requestWrapper = require("./req");

const content = fs
  .readFileSync("./text.txt", "utf8")
  .trim()
  .split("\n")
  .filter((t) => t !== "");

const remap = content
  .map((text) => text.split(" "))
  .map((text) => text.map((t) => t.trim()))
  .map((t) => t.filter((tx) => tx !== ""))
  .map((t) =>
    t.map((tx) =>
      tx
        .replace('"', "")
        .replace(",", "")
        .replace(".", "")
        .replace("“", "")
        .replace("”", "")
        .replace("‘", "")
    )
  );

(async () => {
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
  const data = await Promise.all(remap.map((arr) => Promise.all(arr.map(req))));
  console.log("Promise selesai");

  console.log("Menulis file");
  await fs.promises.writeFile("./hasil.json", JSON.stringify(data, null, 2));
  console.log("File tertulis");

  const pages = await browser.pages();
  await Promise.all(pages.map((page) => page.close()));
  await browser.close();
  console.log("Browser ditutup");
})();
