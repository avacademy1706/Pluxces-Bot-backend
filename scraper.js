// import axios from "axios";
// import cheerio from "cheerio";

// export async function scrapeWebsite(url) {
//   try {
//     const { data } = await axios.get(url);
//     const $ = cheerio.load(data);

//     let text = "";

//     $("h1, h2, h3, p, li").each((_, el) => {
//       const content = $(el).text().trim();
//       if (content.length > 20) {
//         text += content + "\n";
//       }
//     });

//     return text;
//   } catch (err) {
//     console.error("SCRAPING ERROR:", err.message);
//     return "";
//   }
// }

import * as cheerio from "cheerio";

export async function scrapeWebsite(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    let text = "";

    $("h1, h2, h3, p, li").each((_, el) => {
      const content = $(el).text().trim();
      if (content.length > 20) {
        text += content + "\n";
      }
    });

    return text;
  } catch (err) {
    console.error("SCRAPING ERROR:", err.message);
    return "";
  }
}
