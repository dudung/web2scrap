const cheerio = require("cheerio");
const axios = require("axios");

const url = "https://dudung.github.io/web2scrap/library.html";
const div_data = [];

async function getDiv() {
  try {
      const response = await axios.get(url);
      const $ =cheerio.load(response.data);
      
      const div = $("div");
      div.each(function() {
          subdiv = $(this).find(".title").text();
          
          div_data.push({subdiv});
      });
      
      console.log(div_data);
  }  
  catch(error) {
    console.log(error);
  }
}

getDiv();
