const fs = require("fs");
const hasil = require("./hasil-simplified.json");

const txt = hasil
  .map(
        ({ lema, kelas }) =>
          `Lema: ${lema}\nKategori Kata: ${!kelas ? "(N/A)" : kelas}`
      )
      .join("\n\n")

fs.writeFileSync("./simpulan.sim.txt", txt);
