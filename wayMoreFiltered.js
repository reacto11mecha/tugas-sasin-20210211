const fs = require("fs");

const getter = require("./getter");

const data = fs
  .readFileSync("./text.txt", "utf8")
  .trim()
  .replace(new RegExp("\n", "g"), " ")
  .trim()
  .split(" ");
const after = data.map((r) =>
  r
    .replace('"', "")
    .replace(",", "")
    .replace(".", "")
    .replace("“", "")
    .replace("”", "")
    .replace("‘", "")
    .replace("(", "")
    .replace(")", "")
);

const normalize = (x) => x.toLowerCase();
const filtered = [
  ...new Set(
    after
      .filter((t) => t !== "")
      .reduce((result, element) => {
        let normalizedElement = normalize(element);
        if (
          result.every(
            (otherElement) => normalize(otherElement) !== normalizedElement
          )
        )
          result.push(element);

        return result;
      }, [])
  ),
];

(async () => {
  await getter(filtered, "./hasil-simplified.json");
})();
