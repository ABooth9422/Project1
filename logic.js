'use strict';
//indicate that the code should be executed in "strict mode"


//using firebase in the code to store variables that we are getting from the api
var firebaseConfig = {
    apiKey: "AIzaSyBh9Wg4jgKRJrMgmm3c-qZJeYbFeLKuiog",
    authDomain: "tattoo4u-1.firebaseapp.com",
    databaseURL: "https://tattoo4u-1.firebaseio.com",
    projectId: "tattoo4u-1",
    storageBucket: "",
    messagingSenderId: "773493730411",
    appId: "1:773493730411:web:61f541ef89821a05"
};
//initialize Firebase
firebase.initializeApp(firebaseConfig);
//create a variable to reference database
var database = firebase.database();





function pull(cityVal, tattooStyle) {
    // yelp url and api call for searching tattoo shops in the area specifically three
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=tattoos&location=" + cityVal;
// yelp url and api call for searching tattoo shops in the area specifically three
    $.ajax({
        //getting yelp ajax call
        headers: {
            //yelp  personal authorization key
            Authorization: "BEARER pggyYPUFjKRZwKGVB3XiuwMO0wrXgQxau8y3DZW7geuRWY4AgHMklAati700_uZcpaX7LA92bSIxf8YgoYZpI4VBB1dVtoGUgTivNlASsTnoL8Nr1ZxNM90NNSP1XHYx",
        },
        url: queryURL,

        method: "GET"
         //using GET method
        // call a method "then" for function to use as the callbacks
    }).then(function (response) {
        var businessArray = response.businesses;
        var styleArray = ["newSchool", "traditional", "realism", "script", "watercolor"]
        //array for different types of tattoos
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
                address: businessArray[i].location.display_address,
                latitude: businessArray[i].coordinates.latitude,
                longitude: businessArray[i].coordinates.longitude,
                style: style
            })

             //using business array and forloop to attain a random amount of business from three different areas
            //also pulling location name of business phone rating and review count, etc..


        }
        database.ref().on("child_added", function (snapshot) {
            //when a child is added we are checking to see if it matches the users choice of style
            //if it does we are dynamically creating all of these elements on the page
            var sv = snapshot.val();
            console.log(sv)
            if (sv.style === tattooStyle) {
                var row = $("<div>")
                row.addClass("container")
                row.addClass("my-5")
                row.addClass("results")
                var image = $("<img src= still image'>")
                image.addClass("img-thumbnail")
                image.attr("src", sv.thumbnail)
                var ul = $("<ul>")
                ul.addClass("mx-5")
                var name = $("<h5>")
                name.text("Shop Name: " + sv.name)
                var address = $("<h5>")
                address.text(sv.address[0])
                var address2 = $("<h5>")
                address2.text(sv.address[1])
                var phone = $("<h5>")
                phone.text("Phone: " + sv.phone)
                var rating = $("<h5>")
                rating.text("Rating: " + sv.ratings)
                var reviewCount = $("<h5>")
                reviewCount.text("Reviews: " + sv.reviewCount)
                var button = $("<button>")
                button.addClass("btn btn-secondary")
                button.addClass("resultButton")

                button.data("id", sv.id)
                button.attr("data-target", ".moreImages")
                button.attr("data-toggle", "modal")
                button.text("click for more pictures!")

                var mapButton = $("<button>")
                mapButton.addClass("clickMap")
                mapButton.addClass("btn btn-secondary mx-2")
                mapButton.attr("data-target", ".moreImages")
                mapButton.attr("data-toggle", "modal")
                mapButton.text("Click for the Map")
                mapButton.data("latitude", sv.latitude)
                mapButton.data("longitude", sv.longitude)

                  //using child added and snapshot fucntion to retrieve business names, reviews, pictures through pressing buttons
                //added buttons to get map location and click for map and added variables to place tattoo shop information on page

                ul.append(name, address, address2, phone, rating, reviewCount, button, mapButton)
                row.append(image, ul)
                row.appendTo("#resultsDiv")
            }
        })
    })
}
//on click function for the resultButton
$(document).on("click", ".resultButton", function () {
    //we are getting the id from the button we stored the value i
    console.log($(this))
    var id = $(this).data("id")
    console.log(id)
    moreResults(id)
})
//on click function for the clickMap function
$(document).on("click", ".clickMap", function () {
    //we are getting the values from the button that we stored
    var longitude = $(this).data("longitude")
    console.log(longitude)
    var latitude = $(this).data("latitude")
    console.log(latitude)
    initMap(latitude, longitude)

})

function moreResults(id) {

    let id1 = id;
    var queryId1 = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + id1;
    $("#modalRow").empty();
    //ajax call for yelp authorization key and tattoo businesses in area
    $.ajax({

        headers: {
            Authorization: "BEARER pggyYPUFjKRZwKGVB3XiuwMO0wrXgQxau8y3DZW7geuRWY4AgHMklAati700_uZcpaX7LA92bSIxf8YgoYZpI4VBB1dVtoGUgTivNlASsTnoL8Nr1ZxNM90NNSP1XHYx",
        },
        url: queryId1,

        method: "GET"
    }).then(function (response) {
        console.log(response)
        // variable more images to get different images from the yelp search
        for (let index = 0; index < response.photos.length; index++) {
            var moreImages = $("<img src= still image'>")
            moreImages.attr("src", response.photos[index])
            moreImages.addClass("img-thumbnail")
            moreImages.addClass("mx-2 my-2")
            moreImages.appendTo($("#modalRow"))
        }
    });

}
//a function used to display the map in the modal
function initMap(latitude, longitude) {
   console.log(latitude)
   console.log(longitude)
   $("#modalRow").empty();
  
    var address = "https://www.mapquestapi.com/staticmap/v5/map?key=loorHzIG2sew2tOMV3HYNMxhCMwd8i8i&locations="+latitude+","+longitude+"&size=400,400"
        
        var map=$("<img src= still image'>")
        map.attr("src",address)
        map.appendTo($("#modalRow"))
    
}
//api key for map location on google maps and created a function to achieve exact latitudes and longitudes
