// When scrape new acticles is clicked
$(".btn-newarticle").on("click", function() {

    $.post("/scrape",function(data)
    {
        console.log("hi i am inside here",data)
    
    //    console.log("scrape")
    });

    $.getJSON("/articles", function(data){

        console.log(data);
        for (var i = 0; i<data.length; i++)
        {
            $("#articles").append(
                "<p data-id='"+data[i]._id + "'>" + data[i].title + "<br />" + data[i].desc + "<br />" + data[i].link + "</p>");

        }
    });
});

// app.delete("/cleararticle",function(req, res) {
//     db.Article.remove().populate("note").then(function(dbnote){

//     })
// });
