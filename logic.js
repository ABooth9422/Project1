'use strict';

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
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

function pull(cityVal, tattooStyle) {
    // yelp url and api call for searching tattoo shops in the area specifically three
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=tattoos&location=" + cityVal;

    $.ajax({

        headers: {
            Authorization: "BEARER pggyYPUFjKRZwKGVB3XiuwMO0wrXgQxau8y3DZW7geuRWY4AgHMklAati700_uZcpaX7LA92bSIxf8YgoYZpI4VBB1dVtoGUgTivNlASsTnoL8Nr1ZxNM90NNSP1XHYx",
        },
        url: queryURL,

        method: "GET"
         //using GET method
        // call a method "then" for function to use as the callbacks
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
                address: businessArray[i].location.display_address,
                latitude: businessArray[i].coordinates.latitude,
                longitude: businessArray[i].coordinates.longitude,
                style: style
            })

             //using business array and forloop to attain a random amount of business from three different areas
            //also pulling location name of business phone rating and review count, etc..


        }
       
        rowExplanation();
     

        database.ref().on("child_added", function (snapshot) {
            //when a child is added we are checking to see if it matches the users choice of style
            //if it does we are dynamically creating all of these elements on the page
            var sv = snapshot.val();
            console.log(sv)
            if (sv.style === tattooStyle) {
                createContent(sv)
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
$(document).on("click", ".imgModal", function () {
    //we are getting the id from the button we stored the value i
   
    var id = $(this).data("id")
    
    moreResults(id)
})
//on click function for the clickMap function
$(document).on("click", ".clickMap", function (latitude,longitude) {
    //we are getting the values from the button that we stored
    var longitude = $(this).data("longitude")
    
    var latitude = $(this).data("latitude")
    initMap(latitude, longitude)

})

$(document).on("click",".clickReview",function(id){

    var id=$(this).data("id")
    reviewContent(id);

})
function reviewContent(id){
    let id1 = id;
    var queryId1 = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"+id1+"/reviews";
    $("#modalRow").empty();
    
    $.ajax({

        headers: {
            Authorization: "BEARER pggyYPUFjKRZwKGVB3XiuwMO0wrXgQxau8y3DZW7geuRWY4AgHMklAati700_uZcpaX7LA92bSIxf8YgoYZpI4VBB1dVtoGUgTivNlASsTnoL8Nr1ZxNM90NNSP1XHYx",
        },
        url: queryId1,

        method: "GET"
    }).then(function (response) {
        console.log(response)
        for (let i = 0; i < response.reviews.length; i++) {
        var title=$("<h5>")
        title.addClass("row")
        title.addClass("text-center")
        title.addClass("d-flex justify-content-center")
        title.text(response.reviews[i].time_created)
        var context=$("<p>")
        context.addClass("row")
        context.addClass("text-center")
        context.addClass("p-5")
        context.text(response.reviews[i].text)
        title.appendTo($("#modalRow"))
        context.appendTo($("#modalRow"))
        
        }
})
}
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
//function used to display the map in the modal
function initMap(latitude, longitude) {
   console.log(latitude)
   console.log(longitude)
   $("#modalRow").empty();
  
    var address = "https://www.mapquestapi.com/staticmap/v5/map?key=loorHzIG2sew2tOMV3HYNMxhCMwd8i8i&locations="+latitude+","+longitude+"&zoom=14&size=400,400"
        
        var map=$("<img src= still image'>")
        map.attr("src",address)
        map.appendTo($("#modalRow"))
    
}
function createContent(sv){
    var row = $("<div>")
    row.addClass("container")
    row.addClass("my-5")
    row.addClass("results")
    var image = $("<img src= still image'>")
    image.addClass("img-thumbnail")
    image.addClass("imgModal")
    image.attr("src", sv.thumbnail)
    image.attr("data-target", ".moreImages")
    image.attr("data-toggle", "modal")
    image.data("id", sv.id)
    var ul = $("<ul>")
    ul.addClass("mx-5")
    var name = $("<h5>")
    name.text("Shop Name: " + sv.name)
    var stars=$("<img src= still image'>")
    reviewStars(sv,stars);
    var address = $("<h5>")
    address.text(sv.address[0])
    var address2 = $("<h5>")
    address2.text(sv.address[1])
    var phone = $("<h5>")
    phone.text("Phone: " + sv.phone)
    
    var reviewCount = $("<h5>")
    reviewCount.text("Reviews: " + sv.reviewCount)
    var button = $("<button>")
    button.addClass("btn btn-secondary my-2")
    button.addClass("resultButton")

    button.data("id", sv.id)
    button.attr("data-target", ".moreImages")
    button.attr("data-toggle", "modal")
    button.text("More pictures!")

    var mapButton = $("<button>")
    mapButton.addClass("clickMap")
    mapButton.addClass("btn btn-secondary mx-2 my-2")
    mapButton.attr("data-target", ".moreImages")
    mapButton.attr("data-toggle", "modal")
    mapButton.text("Click for the Map")
    mapButton.data("latitude", sv.latitude)
    mapButton.data("longitude", sv.longitude)
    var reviewButton=$("<button>")
    reviewButton.data("id",sv.id)
    reviewButton.attr("data-target", ".moreImages")
    reviewButton.addClass("btn btn-secondary mx-2 my-2")
    reviewButton.addClass("clickReview")
    reviewButton.attr("data-toggle", "modal")
    reviewButton.text("Reviews")
    
      //using child added and snapshot fucntion to retrieve business names, reviews, pictures through pressing buttons
    //added buttons to get map location and click for map and added variables to place tattoo shop information on page

    ul.append(name,stars, address, address2, phone, reviewCount, button, mapButton,reviewButton)
    row.append(image, ul)
    row.appendTo("#resultsDiv")
}



function reviewStars(ratings,stars){
    console.log(ratings)
    if(ratings.ratings===1.0){
    stars.attr("src","../Project1/yelpStars/small_1.png")
    }else if(ratings.ratings===1.5){
    stars.attr("src","../Project1/yelpStars/small_1_half.png")
    }else if(ratings.ratings===2.0){
        stars.attr("src","../Project1/yelpStars/small_2.png")
    }else if(ratings.ratings===2.5){
        stars.attr("src","../Project1/yelpStars/small_2_half.png")
    }else if(ratings.ratings===3.0){
        stars.attr("src","../Project1/yelpStars/small_3.png")
    }else if(ratings.ratings===3.5){
        stars.attr("src","../Project1/yelpStars/small_3_half.png")
    }else if(ratings.ratings===4.0){
        stars.attr("src","../Project1/yelpStars/small_4.png")
    }else if(ratings.ratings===4.5){
        stars.attr("src","../Project1/yelpStars/small_4_half.png")
    }else if(ratings.ratings===5.0){
        stars.attr("src","../Project1/yelpStars/small_5.png")
    }

}

function rowExplanation(){
    
    var rowExplanation = $("<div>")
    rowExplanation.addClass("container")
    rowExplanation.addClass("h1")
    rowExplanation.addClass("my-5")
    rowExplanation.css({"text-decoration":"underline"})
    var tattooData=$("#tattooInput").find('option:selected').attr('id')
    console.log(tattooData)
    rowExplanation.text("Shops that cater to " +tattooData+ " style tattoos")
    rowExplanation.prependTo("#resultsDiv")
}