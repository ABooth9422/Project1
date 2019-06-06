$(document).ready(function(){
  load();
  start();
  citySelect();
   

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
   $.ajax({
        url: queryURL,
        method: "GET",
    
        header: {
            Authorization: "BEARER ZTlHpxgzx1_7tT8vvjxFt2Fa8fVmKkt4xbjV8Uvd5DnvTRuK78vCoYR_McTUMSlCmYHV65qKj9ChQkkHJqvrKxG8y-5BGXJgzE4xD3Qwnexl-65Jz6QpxFgL0wv3XHYx"
            

        }
    })   
}

})

