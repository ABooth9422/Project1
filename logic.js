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





function pull(cityVal) {
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=tattoos&location=" + cityVal;

    $.ajax({
        headers: {
            Authorization: "BEARER pggyYPUFjKRZwKGVB3XiuwMO0wrXgQxau8y3DZW7geuRWY4AgHMklAati700_uZcpaX7LA92bSIxf8YgoYZpI4VBB1dVtoGUgTivNlASsTnoL8Nr1ZxNM90NNSP1XHYx",
        },
        url: queryURL,

        method: "GET"
    }).then(function (response) {
        var businessArray = response.businesses;
          for (let i = 0; i < businessArray.length; i++) {

            database.ref(businessArray[i].id+"/").set({
                id: businessArray[i].id,
                name: businessArray[i].name,
                phone: businessArray[i].phone,
                ratings: businessArray[i].rating,
                reviewCount: businessArray[i].review_count,
                thumbnail:businessArray[i].image_url
            })
        }
        
        //added today...................
        var makeARandomNumber = function(){
            return Math.floor(Math.random() * 9);
        }
        var randoms = Array(6).fill(0).map(makeARandomNumber);
        console.log(randoms)
        // => [4, 4, 3, 2, 6]
    
        
        //griffin added to try and see if this method might work? If not then delete.
        //$.ajax({
           // type: "GET",
           // dataType: 'json',
           // cache: false,
            //url: url,
            //success: function (data) {
        
                // Parse the  data:
                //var resultsString = "";
               // for (var i in data.Results){
                 //   console.log( data.Results[i] );
                   //resultsString+= "<div>"+data.Results[i].Title+ " ("+data.Results[i].businesses+")</div>";
              //  }
              //  $("#results").html(resultsString);
        
            // If you want to see the raw JSON displayed on the webpage, use this instead:
            //$("#results").html(  JSON.stringify(data) );
            //added today..........................from griffin line 51-71
            // });

        // const calls = [];
        // for (let i = 0; i < businessArray.length; i++) {
        //     var name = businessArray[i].id;
        //     console.log(name);
        //     var locationURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + name;
        //     calls.push(locationURL);
        // }
        // calls.map(url => {
        //     return $.ajax({ headers: { 
        //         Authorization: "BEARER pggyYPUFjKRZwKGVB3XiuwMO0wrXgQxau8y3DZW7geuRWY4AgHMklAati700_uZcpaX7LA92bSIxf8YgoYZpI4VBB1dVtoGUgTivNlASsTnoL8Nr1ZxNM90NNSP1XHYx", 
        //     }, 
        //     url: url, 
        //     method: "GET"}).then(data => {
        //         console.log(data);            
        //     })    
        // })
        // var locationURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + name + cityVal;
        // console.log(response)
        // $.ajax({
        //     headers: {
        //         Authorization: "BEARER pggyYPUFjKRZwKGVB3XiuwMO0wrXgQxau8y3DZW7geuRWY4AgHMklAati700_uZcpaX7LA92bSIxf8YgoYZpI4VBB1dVtoGUgTivNlASsTnoL8Nr1ZxNM90NNSP1XHYx",
        //     },
        //     url: locationURL,

        //     method: "GET"

        // })
    })
}