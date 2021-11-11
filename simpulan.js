const fs = require("fs");
const hasil = require("./hasil.json");

const txt = hasil
  .map((arr) =>
    arr
      .map(
        ({ lema, kelas }) =>
          `Lema: ${lema}\nKategori Kata: ${!kelas ? "(N/A)" : kelas}`
      )
      .join("\n\n")
  )
  .map(
    (val, idx) =>
      `Paragraf ke ${idx + 1}, berjumlah ${hasil[idx].length} kata\n\n${val}`
  )
  .join("\n\n\n");

fs.writeFileSync("./simpulan.txt", txt);
