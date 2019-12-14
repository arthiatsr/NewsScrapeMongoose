var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var cheerio = require("cheerio");
var PORT = process.env.PORT || 3000;
var db = require("./models");
var app = express();
var request = require("request");

app.use(logger("dev"));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/populate";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI,{ useNewUrlParser: true });

app.post("/scrape", function(req, res) {

    // request("https://www.foxnews.com/",function(err,response,html) {
    // $("article h2").each(function(i, element) {
    // var result = {};
    // result.title = $(this)
    //     .children("a")
    //     .text();
    // result.link = $(this)
    //     .children("a")
    //     .attr("href");

    // I coded for the newyork times but since my article collection has so much records, not using the below
    console.log("hi")

    request("https://www.nytimes.com/section/us",function(err,response,html) {
    var $ = cheerio.load(html);

        $("li.css-ye6x8s").each(function(i,element){
        var result = {};
        result.title = $(this).find("h2").text();
        result.desc = $(this).find("p").text();
        result.link = $(this).find("a").attr("href");
        console.log(result);


        db.Article.create(result)
            .then(function(dbArticles) {
                console.log("dbconnection succeful", dbArticles);
                // res.json(dbArticles);

            })
            .catch(function(err) {
                 throw err;
            });
        });

    // res.send("result");

    });
});

app.get("/articles", function(req, res) {
db.Article.find({})
    .then(function(dbArticle) {
    res.json(dbArticle);
    console.log("%%%%%",dbArticle);

    })
    .catch(function(err) {
    res.json(err);
    });
});

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });