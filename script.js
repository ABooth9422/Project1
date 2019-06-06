$(document).ready(function(){
  load();
  start();
  citySelect();
  back();
    pull();



function back(){
    $("#goBack").on("click",function(){
        $("#area").hide();
        $("#carouselTattoo").hide();
        $("#imageParagraph").hide();
        $("#tattooStyle").hide();
        $("#intro").show();
        $("#body").css({"background":"url(../Project1/images/background.jpg)"})
    })
}

function start(){
    $("#start").on("click",function(){
        $("#intro").hide();
        $("#area").show();
        $("#body").css({"background":"url(../Project1/images/backgroundShopTest.jpg)"})
        
    })
}
function load(){
    $("#area").hide();
    $("#carouselTattoo").hide();
    $("#imageParagraph").hide();
    $("#tattooStyle").hide();
}

function citySelect(){
    $("#citySubmit").on("click",function(){
        $("#area").hide(); 
        $("#carouselTattoo").show();
        $("#tattooStyle").show();
        $("#imageParagraph").show();
        $("#body").css({"background":"url(../Project1/images/backgroundShop2.jpg)"})
    })
   
}

})