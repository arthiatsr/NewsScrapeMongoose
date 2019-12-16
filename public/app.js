
$(document).ready(function(){

$(".btn-newarticle").on("click", function(event) {
    event.preventDefault();

    $.get("/scrape",function(data)
    {

        console.log("hi i am inside here",data);
        for(var i = 0;i<data.length;i++){
            // $("#articles").append("<p>" + data[i].title + "</p><button type='" +"button'"+"class='"+"btn btn-success'"+">Save Article</button>'");
            // $("#articles").append("<p>" + data[i].desc + "</p>");
            // $("#articles").append("<p>" + data[i].link + "</p>");
            $("#articles").append(
            "<div class='"+"container'"+"><div class='"+"row table-primary border border-primary'"+"><div class='"+"col-10'"+"><a href='"+"https://www.nytimes.com"+data[i].link+"' target='"+"blank'"+"><h4>"+data[i].title+"</h4></a></div><div class='"+"col-2'"+"><button type='" +"button'"+"class='"+"btn btn-success btn-savearticle'"+">Save Article</button></div></div><div class='"+"row table-light border border-dark'"+"><div class='"+"col-sm'"+">"+data[i].desc+"</div></div><div class='"+"row'"+"><div class='"+"col-sm'"+"></div></div>")
        }
            //     $("#articles").append("<p>" + articleArr[i].title + "</p>");
        // res.render("articles",{articles: res});
        // app.get("/articles",function(req,res){
        //     res.render("user-listing", { listing: true });
        //   });    
        

    });
    
    // $(".btn-savearticle").on("click", function(event) {
    //     event.preventDefault();

    // });
    //  $.get("/articles", function(data)
    //  {

    //      console.log(data);        
    // // //     // for (var i = 0; i<data.length; i++)
    // // //     // {
    // // //     //     $("#articles").append(
    // // //     //             "<p data-id='"+data[i]._id + "'>" + data[i].title + "<br />" + data[i].desc + "<br />" + data[i].link + "</p>");

    // // //     // }
    // });
});

// app.delete("/cleararticle",function(req, res) {
//     db.Article.remove().populate("note").then(function(dbnote){

//     })
// });

})
