const cheerio = require("cheerio");
const axios = require("axios");
const j2cp = require("json2csv").Parser;
const fs = require("fs");

const url = "https://www.cnnindonesia.com/";
const news_data = [];

async function getNews() {
  try {
      const response = await axios.get(url);
      const $ =cheerio.load(response.data);
      
      const news = $("h2.text-cnn_black_light");
      news.each(function() {
          title = $(this)[0].children[0].data;
     
          news_data.push({title});
      });
      
      //console.log(news_data);
      const parser = new j2cp();
      const csv = parser.parse(news_data);
      fs.writeFileSync("./cnn_id_info.csv", csv);
  }  
  catch(error) {
    console.log(error);
  }
}

getNews();
