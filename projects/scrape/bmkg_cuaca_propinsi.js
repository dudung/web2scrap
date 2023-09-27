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
              // col merupakan element dengan tag "td"
              col = $(this).find("td");
              
              // terdapat lima element dengan tag "td"
              // col[0] -- col[4]
              
              // setiap tag "d" dapat memiliki banyak elemen di dalamnya
              // tersimpan dalam children, dan bila hanya ada satu
              // cukup mengakses childre[0]
              // children[0].data
              //    "td"      "informasi"
              nomor = col[0].children[0].data;
              propinsi = col[1].children[0].data;
              tanggal = col[3].children[0].data;
              ukuran = col[4].children[0].data;
              
              // khusus untuk berkas di dalamnya terdapat element
              // dengan tag "pre" lalu diikuti dalamnya oleh
              // element dengan tag "a" sehingga akan ada
              // children[0].children[0].children[0].data
              //    "td"       "pre"       "a"       "informasi"
              berkas = col[2].children[0].children[0].children[0].data;
              
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
