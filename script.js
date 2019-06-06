$(document).ready(function () {
    load();
    start();
    citySelect();


    function start() {
        $("#start").on("click", function () {
            $("#intro").hide();
            $("#area").show();

        })
    }

    function load() {
        $("#area").hide();
        $("#carouselTattoo").hide();
        $("#imageParagraph").hide();
    }

    function citySelect() {
        $("#citySubmit").on("click", function () {
            $("#area").hide();
            $("#carouselTattoo").show();
            $("#imageParagraph").show();
        })
        $.ajax({
            url: queryURL,
            method: "GET",

            header: {
                Authorization: "BEARER ZTlHpxgzx1_7tT8vvjxFt2Fa8fVmKkt4xbjV8Uvd5DnvTRuK78vCoYR_McTUMSlCmYHV65qKj9ChQkkHJqvrKxG8y-5BGXJgzE4xD3Qwnexl-65Jz6QpxFgL0wv3XHYx"


            }
        })
    }

})

// Initialize Firebase
//$(document).ready(function () {
// console.log


// function pull(){
//     var queryURL= "https://api.yelp.com/v3/businesses/search?term=tattoos"

//     $.ajax({
//       header: {
//           Authorization: "BEARER pggyYPUFjKRZwKGVB3XiuwMO0wrXgQxau8y3DZW7geuRWY4AgHMklAati700_uZcpaX7LA92bSIxf8YgoYZpI4VBB1dVtoGUgTivNlASsTnoL8Nr1ZxNM90NNSP1XHYx",    
//       },
//       url:queryURL,
//       method:"GET"
//   }).then(function(response){
//       console.log(response)