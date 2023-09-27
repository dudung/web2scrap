const cheerio = require("cheerio");
const axios = require("axios");

const url = "https://www.kompas.com/";
const headline_data = [];

async function getHeadlines() {
  try {
      const response = await axios.get(url);
      const $ =cheerio.load(response.data);
      
      const books = $(".headline__thumb__item");
      books.each(function() {
          title = $(this).find(".headline__thumb__title").text();
          
          headline_data.push({title});
      });
      
      console.log(headline_data);
  }  
  catch(error) {
    console.log(error);
  }
}

getHeadlines();
