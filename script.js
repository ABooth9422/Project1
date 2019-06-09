$(document).ready(function () {
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
            $("#area").hide();
            $("#carouselTattoo").hide();
            $("#imageParagraph").hide();
            $("#lastInput").hide();
            $("#intro").show();
            $("#body").css({
                "background": "url(../Project1/images/background.jpg)"
            })
        })
    }

    //after Start button is clicked
    function start() {
        $("#start").on("click", function () {
            $("#intro").hide();
            $("#area").show();
            $("#body").css({
                "background": "url(../Project1/images/backgroundShopTest.jpg)"
            })

        })
    }

    //on page load
    function load() {
        $("#area").hide();
        $("#carouselTattoo").hide();
        $("#imageParagraph").hide();
        $("#lastInput").hide();
        $("#newSearch").hide();
    }

    // after city is selected and Submit clicked
    function citySelect() {
        $("#citySubmit").on("click", function () {
            $("#area").hide();
            $("#carouselTattoo").show();
            $("#lastInput").show();
            $("#imageParagraph").show();
            $("#body").css({
                "background": "url(../Project1/images/backgroundShop2.jpg)"
            })
            
        })

    }

    //after tattoo style selected and Submit button clicked
    function finalSelection() {
        $("#tatSubmit").on("click", function () {
            $("#area").hide();
            $("#carouselTattoo").hide();
            $("#imageParagraph").hide();
            $("#lastInput").hide();
            cityValue();
            $("#body").css({"background": "url(../Project1/images/backgroundInk.jpg)"})
            $("#newSearch").show();
           $("#newSearch").on("click",function(){
            reload();
           })
            
        })
    }

    //after Back button is clicked on third "page"
    function back2() {
        $("#goBack2").on("click", function () {
            $("#intro").hide();
            $("#area").show();
            $("#body").css({
                "background": "url(../Project1/images/backgroundShopTest.jpg)"
            })
            $("#city").val("")
            $("#carouselTattoo").hide();
            $("#imageParagraph").hide();
            $("#lastInput").hide();
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