function pull(cityVal){
    var queryURL= "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=tattoos&location="+cityVal;

    $.ajax({
      headers: {
          Authorization: "BEARER pggyYPUFjKRZwKGVB3XiuwMO0wrXgQxau8y3DZW7geuRWY4AgHMklAati700_uZcpaX7LA92bSIxf8YgoYZpI4VBB1dVtoGUgTivNlASsTnoL8Nr1ZxNM90NNSP1XHYx",    
      },
      url:queryURL,
      method:"GET"
  }).then(function(response){
      console.log(response)
  })
}