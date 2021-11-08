const requestWrapper = (page) => async (txt) =>
  await page.evaluate(
    (txt) =>
      fetch(`https://kbbi.kata.web.id/${txt}`)
        .then((response) => response.text())
        .then((t) =>
          new DOMParser()
            .parseFromString(t, "text/html")
            .querySelector(
              "#content article .entry-content p:nth-of-type(3) em"
            )
        )
        .then((e) => ({ lema: txt, kelas: e.innerText }))
        .catch(() => ({ lema: txt, kelas: null })),
    txt
  );

module.exports = requestWrapper;
