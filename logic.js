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
        var styleArray=["new school","traditional","realism","script","watercolor"]
        
          for (let i = 0; i < businessArray.length; i++) {
            var style=styleArray[Math.floor(Math.random()*styleArray.length)];
            console.log(style)
            database.ref(businessArray[i].id+"/").set({
                id: businessArray[i].id,
                name: businessArray[i].name,
                phone: businessArray[i].phone,
                ratings: businessArray[i].rating,
                reviewCount: businessArray[i].review_count,
                thumbnail:businessArray[i].image_url,
                style:style
            })
    
        }

        
    
        
        
        
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
