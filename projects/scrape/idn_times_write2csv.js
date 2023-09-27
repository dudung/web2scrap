const cheerio = require("cheerio");
const axios = require("axios");
const j2cp = require("json2csv").Parser;
const fs = require("fs");

const url = "https://www.idntimes.com/";
const news_data = [];

async function getNews() {
  try {
      const response = await axios.get(url);
      const $ =cheerio.load(response.data);
      
      const news = $('.title-text');
      news.each(function() {
          title = $(this).text();
     
          news_data.push({title});
      });
      
      console.log(news_data);
      const parser = new j2cp();
      const csv = parser.parse(news_data);
      fs.writeFileSync("./idn_times_info.csv", csv);
  }  
  catch(error) {
    console.log(error);
  }
}

getNews();
