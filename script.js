$(document).ready(function () {
    load();
    start();
    citySelect();
    back();
    finalSelection();
    back2(event);



    function back(event) {
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

    function start(event) {
        $("#start").on("click", function () {
            $("#intro").hide();
            $("#area").show();
            $("#body").css({
                "background": "url(../Project1/images/backgroundShopTest.jpg)"
            })

        })
    }

    function load() {
        $("#area").hide();
        $("#carouselTattoo").hide();
        $("#imageParagraph").hide();
        $("#lastInput").hide();
    }

    function citySelect(event) {
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

    function finalSelection(event) {
        $("#tatSubmit").on("click", function () {
            $("#area").hide();
            $("#carouselTattoo").hide();
            $("#imageParagraph").hide();
            $("#lastInput").hide();
        })
    }

    function back2(event) {
        $("#goBack2").on("click", function () {
            $("#intro").hide();
            $("#area").show();
            $("#body").css({
                "background": "url(../Project1/images/backgroundShopTest.jpg)"
            })
            $("#carouselTattoo").hide();
            $("#imageParagraph").hide();
            $("#lastInput").hide();
        })
    }

})