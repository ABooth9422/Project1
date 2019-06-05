$(document).ready(function(){
  load();
  start();
  citySelect();
  back();

function back(){
    $("#goBack").on("click",function(){
        $("#area").hide();
        $("#carouselTattoo").hide();
        $("#imageParagraph").hide();
        $("#intro").show();
    })
}

function start(){
    $("#start").on("click",function(){
        $("#intro").hide();
        $("#area").show();
        
    })
}
function load(){
    $("#area").hide();
    $("#carouselTattoo").hide();
    $("#imageParagraph").hide();
}

function citySelect(){
    $("#citySubmit").on("click",function(){
        $("#area").hide(); 
        $("#carouselTattoo").show();
        $("#imageParagraph").show();
    })
   
}

})