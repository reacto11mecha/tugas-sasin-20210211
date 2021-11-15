const fs = require("fs");

const getter = require("./getter");

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
        .replace("(", "")
        .replace(")", "")
    )
  );

(async () => {
  await getter(remap, "./hasil.json");
})();
