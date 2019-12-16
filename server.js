var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var cheerio = require("cheerio");
var PORT = process.env.PORT || 3000;
var db = require("./models");
var app = express();
var request = require("request");
var exphbs = require("express-handlebars");
var path = require("path");
app.use(express.static("public"));


// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(logger("dev"));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/populate";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI,{ useNewUrlParser: true });


//module.exports = function(app) {
// app.get("/", function(req,res){
//     res.sendFile(path.join(__dirname,"./index.html"));
//     // res.render("home");

//   });

app.get("/scrape", function(req, res) 
{
    // var articlescrape = [];

    // request("https://www.foxnews.com/",function(err,response,html) {
    // $("article h2").each(function(i, element) {
    // var result = {};
    // result.title = $(this)
    //     .children("a")
    //     .text();
    // result.link = $(this)
    //     .children("a")
    //     .attr("href");


    request("https://www.nytimes.com/section/us",function(err,response,html) {
    var $ = cheerio.load(html);
    var articleArr = [];

        $("li.css-ye6x8s").each(function(i,element){
        var result = {};
        result.title = $(this).find("h2").text();
        result.desc = $(this).find("p").text();
        result.link = $(this).find("a").attr("href");
        articleArr.push(result);

        db.Article.create(result)
            .then(function(dbArticles) {
                console.log("dbconnection succeful");
                // res.json(dbArticles);
                // const ArticleObj = {
                // articleArray: articlListing
                
                
                // res.render("articles", ArticleObj);

            })
            .catch(function(err) {
                 throw err;
            });
        });
        console.log("articleArr====",articleArr)
        // const articleObj = {
        //     // listing: true,
        //     articleArray: articleArr}
        // res.render("articles", articleObj);
            //     const articleArray = {
            // // listing: true,
            // title: articleArr}
        // for(var i = 0;i<articleArr.length;i++){
        //     $("#articles").append("<p>" + articleArr[i].title + "</p>");

        //     // var html = "<p>";
        //     // html += articleArr[i].title;
        //     // html += "</p><p>"
        //     // html += articleArr[i].desc;
        //     // html += "</p><p>"
        //     // html += articleArr[i].link;
        //     // html += "</p>"

        // }
        // console.log(html);
        // var container = $("#articles");
        // $("#articles").text(html) ;

     //   res.sendFile(path.join(__dirname,"/public/index.html"));

        res.send(articleArr);
//        res.render("articles", {articles: articleArr});

    //res.send("result");
    // articlescrape = articleArr;
    // console.log("####",dbArticles);

    });
});

    //console.log("^^^^^^",dbArticles);

    // res.render("articles",{articles: articlescrape});
    // app.get("/articles", function(req, res) 
    // {
    //     db.Article.find({})
    //         .then(function(articlListing) 
    //         {
    //             // const ArticleObj = {
    //                 // articleArray: articlListing
    //                 const {title, desc, link} = articlListing.dataValues
    //                 res.render("articles",{
    //                     title,
    //                     desc,
    //                     link
    //                 });
                
    //             // res.render("articles", ArticleObj);

    //         })
    //         .catch(function(err)
    //         {
    //             console.log("There is a db query err");
    //             res.status(500).end();
    //         });        
    // });



//};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
app.listen(PORT, function() 
{
    console.log("App running on port " + PORT + "!");
});
