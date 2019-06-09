'use strict';



var firebaseConfig = {
    apiKey: "AIzaSyBh9Wg4jgKRJrMgmm3c-qZJeYbFeLKuiog",
    authDomain: "tattoo4u-1.firebaseapp.com",
    databaseURL: "https://tattoo4u-1.firebaseio.com",
    projectId: "tattoo4u-1",
    storageBucket: "",
    messagingSenderId: "773493730411",
    appId: "1:773493730411:web:61f541ef89821a05"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();





function pull(cityVal, tattooStyle) {
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=tattoos&location=" + cityVal;

    $.ajax({

        headers: {
            Authorization: "BEARER pggyYPUFjKRZwKGVB3XiuwMO0wrXgQxau8y3DZW7geuRWY4AgHMklAati700_uZcpaX7LA92bSIxf8YgoYZpI4VBB1dVtoGUgTivNlASsTnoL8Nr1ZxNM90NNSP1XHYx",
        },
        url: queryURL,

        method: "GET"
    }).then(function (response) {
        var businessArray = response.businesses;
        var styleArray = ["newSchool", "traditional", "realism", "script", "watercolor"]

        for (let i = 0; i < businessArray.length; i++) {
            var style = styleArray[Math.floor(Math.random() * styleArray.length)];
            database.ref(businessArray[i].id + "/").set({
                id: businessArray[i].id,
                name: businessArray[i].name,
                phone: businessArray[i].phone,
                ratings: businessArray[i].rating,
                reviewCount: businessArray[i].review_count,
                thumbnail: businessArray[i].image_url,
                style: style
            })




        }
        database.ref().on("child_added", function (snapshot) {
            var sv = snapshot.val();
            console.log(sv)
            if (sv.style === tattooStyle) {
                var row=$("<div>")
                row.addClass("container")
                row.addClass("my-5")
                row.addClass("results")
                var image=$("<img src= still image'>")
                image.addClass("img-thumbnail")
                image.attr("src", sv.thumbnail)
                var ul=$("<ul>")
                var name = $("<h5>")
                name.text("Shop Name: "+sv.name)
                var phone=$("<h5>")
                phone.text("Phone: "+sv.phone)
                var rating=$("<h5>")
                rating.text("Rating: "+ sv.ratings)
                var reviewCount=$("<h5>")
                reviewCount.text("Reviews: " +sv.reviewCount)
            
                var button=$("<button>")
                button.addClass("btn btn-secondary")
                button.addClass("resultButton")
                $(".resultButton").on("click",function(){
                    moreResults(sv.id)
                })
                button.attr("data-target",".moreImages")
                button.attr("data-toggle","modal")
                button.text("click for more pictures!")

                ul.append(name,phone,rating,reviewCount,button)
                row.append(image,ul)
                row.appendTo("#resultsDiv")
            }
        })
    })
}

function moreResults(id){
    
    let id1 = id;
    var queryId1 = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + id1;
    
    $.ajax({
    
      headers: {
            Authorization: "BEARER pggyYPUFjKRZwKGVB3XiuwMO0wrXgQxau8y3DZW7geuRWY4AgHMklAati700_uZcpaX7LA92bSIxf8YgoYZpI4VBB1dVtoGUgTivNlASsTnoL8Nr1ZxNM90NNSP1XHYx",
        },
        url: queryId1,
    
        method: "GET"
    }).then(function (response) {
            console.log(response)
            for (let index = 0; index < response.photos.length; index++) {
            var moreImages=$("<img src= still image'>")
            moreImages.attr("src",response.photos[index])
            moreImages.addClass("img-thumbnail")
            moreImages.appendTo($(".modal-content"))
            } 
        }
    );
    
}


