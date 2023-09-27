const cheerio = require("cheerio");
const axios = require("axios");

const url = "https://data.bmkg.go.id/prakiraan-cuaca/";
const cuaca_data = [];

async function getCuaca() {
  try {
      const response = await axios.get(url);
      const $ =cheerio.load(response.data);
      
      const table = $("tbody");
      table.each(function() {
          row = $(this).find("tr");
            row.each(function() {
              col = $(this).find("td");
              nomor = col[0].children[0].data;
              propinsi = col[1].children[0].data;
              berkas = col[2].children[0].children[0].children[0].data;
              tanggal = col[3].children[0].data;
              ukuran = col[4].children[0].data;
              cuaca_data.push({nomor, propinsi, berkas, tanggal, ukuran});
            });
      });
      
      console.log(cuaca_data);
  }  
  catch(error) {
    console.log(error);
  }
}

getCuaca();
