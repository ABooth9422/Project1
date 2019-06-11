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
    });
     //animation of the tattoo4u symbol on the page

     //putting our functions into place as the page loads to make sure that the elements are shown and hidden
    load();
    start();
    citySelect();
    back();
    finalSelection();
    back2(event);
   
    //when the Back button is clicked from 2nd "page"
    function back() {
        $("#goBack").on("click", function () {
            $("#modalRow").empty();
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
            anime({
                targets:'div.studentName',
                translateY:[
                    {value:-25,duration:1000},
                    {value:0,duration:1000}, 
                ],
                delay: function(el, i, l) {
                    return i * 200;
             } })
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
            if($("#city").val()==="Shop Location"){
                $("#citySubmit").attr("data-target", ".moreImages")
                $("#citySubmit").attr("data-toggle", "modal")
                var denied=$("<h3>")
                denied.text("Make a selection to continue!")
                denied.appendTo("#modalRow")
            return
            }else    
            $("#modalRow").empty();
            $("#citySubmit").removeAttr("data-target")
            $("#citySubmit").removeAttr("data-toggle")
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
            console.log($("#tattooInput").val())
            if($("#tattooInput").val()==="Which tattoo style did you decide on?"){
            $("#tatSubmit").attr("data-target", ".moreImages")
            $("#tatSubmit").attr("data-toggle", "modal")
            var denied=$("<h3>")
            denied.text("Make a selection to continue!")
            denied.appendTo("#modalRow")
                return;
            }else
            $("#modalRow").empty();
            $("#tatSubmit").removeAttr("data-target")
            $("#tatSubmit").removeAttr("data-toggle")
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
            $("#modalRow").empty();
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

