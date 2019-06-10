$(document).ready(function () {
    anime({
        targets:'div.logo',
        translateX:[
            {value:1200, duration:3000},
            {value:0, duration: 1000}
        ],
        rotate:{
            value:'1turn',
            easing: 'easeInOutSine',
            delay:1000
        },
       //animation of the tattoo4u symbol on the page
    });
    load();
    start();
    citySelect();
    back();
    finalSelection();
    back2(event);
    // pull();
    


    //when the Back button is clicked from 2nd "page"
    function back() {
        $("#goBack").on("click", function () {
            $("#area").hide("fast");
            $("#carouselTattoo").hide("fast");
            $("#imageParagraph").hide("fast");
            $("#lastInput").hide("fast");
            $("#intro").fadeIn("slow");
            $("#body").css({
                "background": "url(../Project1/images/background.jpg)"
            })
        })
    }

    //after Start button is clicked
    function start() {
        $("#start").on("click", function () {
            $("#intro").hide("fast");
            $("#area").fadeIn("slow");
            $("#body").css({
                "background": "url(../Project1/images/backgroundShopTest.jpg)"
            })

        })
    }

    //on page load
    function load() {
        $("#area").hide("fast");
        $("#carouselTattoo").hide("fast");
        $("#imageParagraph").hide("fast");
        $("#lastInput").hide("fast");
        $("#newSearch").hide("fast");
    }

    // after city is selected and Submit clicked
    function citySelect() {
        $("#citySubmit").on("click", function () {
            $("#area").hide("fast");
            $("#carouselTattoo").fadeIn("slow");
            $("#lastInput").fadeIn("slow");
            $("#imageParagraph").fadeIn("slow");
            $("#body").css({
                "background": "url(../Project1/images/backgroundShop2.jpg)"
            })
            
        })

    }

    //after tattoo style selected and Submit button clicked
    function finalSelection() {
        $("#tatSubmit").on("click", function () {
            $("#area").hide("fast");
            $("#carouselTattoo").hide("fast");
            $("#imageParagraph").hide("fast");
            $("#lastInput").hide("fast");
            cityValue();
            $("#body").css({"background": "url(../Project1/images/backgroundInk.jpg)"})
            $("#newSearch").delay(3000).fadeIn(0);
           $("#newSearch").on("click",function(){
            reload();
           })
            
        })
    }

    //after Back button is clicked on third "page"
    function back2() {
        $("#goBack2").on("click", function () {
            $("#intro").hide("fast");
            $("#area").fadeIn("slow");
            $("#body").css({
                "background": "url(../Project1/images/backgroundShopTest.jpg)"
            })
            $("#city").val("")
            $("#carouselTattoo").hide("fast");
            $("#imageParagraph").hide("fast");
            $("#lastInput").hide("fast");
        })
    }

    // city and style are stored and pulled from database
    function cityValue(){
        var cityValue=$("#city").val();
        var tattooStyle=$("#tattooInput").val();
        pull(cityValue,tattooStyle)
        console.log(cityValue)
    }
    function reload(){
        location.reload();
    }
})

