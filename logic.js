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
        console.log(response)
        for (let i = 0; i < businessArray.length; i++) {
            var style = styleArray[Math.floor(Math.random() * styleArray.length)];
            database.ref(businessArray[i].id + "/").set({
                id: businessArray[i].id,
                name: businessArray[i].name,
                phone: businessArray[i].phone,
                ratings: businessArray[i].rating,
                reviewCount: businessArray[i].review_count,
                thumbnail: businessArray[i].image_url,
                address:businessArray[i].location.display_address,
                latitude:businessArray[i].coordinates.latitude,
                longitude:businessArray[i].coordinates.longitude,
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
                ul.addClass("mx-5")
                var name = $("<h5>")
                name.text("Shop Name: "+sv.name)
                var address=$("<h5>")
                address.text(sv.address[0])
                var address2=$("<h5>")
                address2.text(sv.address[1])
                var phone=$("<h5>")
                phone.text("Phone: "+sv.phone)
                var rating=$("<h5>")
                rating.text("Rating: "+ sv.ratings)
                var reviewCount=$("<h5>")
                reviewCount.text("Reviews: " +sv.reviewCount)
                var button=$("<button>")
                button.addClass("btn btn-secondary")
                button.addClass("resultButton")
                button.attr("id",sv.name)
                button.attr("data-target",".moreImages")
                button.attr("data-toggle","modal")
                button.text("click for more pictures!")
                $(".resultButton").on("click",function(){
                    moreResults(sv.id)
                })
                var mapButton=$("<button>")
                mapButton.attr("id","clickMap")
                mapButton.addClass("btn btn-secondary mx-2")
                mapButton.attr("data-target",".moreMap")
                mapButton.attr("data-toggle","modal")
                mapButton.text("Click for the Map")
                $("#clickMap").on("click",function(){
                    console.log(sv.latitude)
                    console.log(sv.longitude)
                    initMap(sv.latitude,sv.longitude)
                })

           
                ul.append(name,address,address2,phone,rating,reviewCount,button,mapButton)
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
            moreImages.addClass("mx-2 my-2")
            moreImages.appendTo($("#modalRow"))
            }
        }
    );
    
}
function initMap(latitude,longitude) {
   // https://maps.googleapis.com/maps/api/staticmap?center=40.714%2c%20-73.998&zoom=12&size=400x400&key=YOUR_API_KEY
}
