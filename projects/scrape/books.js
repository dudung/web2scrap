const cheerio = require("cheerio");
const axios = require("axios");

const url = "https://dudung.github.io/web2scrap/library.html";
const book_data = [];

async function getBooks() {
  try {
      const response = await axios.get(url);
      const $ =cheerio.load(response.data);
      
      const books = $(".book");
      books.each(function() {
          title = $(this).find(".title").text();
          author = $(this).find(".author").text();
          year = $(this).find(".year").text();
          
          book_data.push({title, author, year});
      });
      
      console.log(book_data);
  }  
  catch(error) {
    console.log(error);
  }
}

getBooks();
