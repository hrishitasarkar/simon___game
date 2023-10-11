var gamepattern=[];
var buttoncolor=["red","blue","green","yellow"];
var userClickedPattern=[];
var started=false;
var level=0;

$(document).keydown(function(){
if(!started){
    $("#level-title").text("Level"+level);
    nextsequence();
    started=true;
}
})

$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playsound(userChosenColour);
    animatepress(userChosenColour);
    checkanswer(userClickedPattern.length-1);
    }
    )

function checkanswer(currentlevel){
if (gamepattern[currentlevel] === userClickedPattern[currentlevel]){
if(userClickedPattern.length===gamepattern.length){
    //console.log("success");
    setTimeout(function () {
        nextsequence();
      }, 1000);
    }
}
else{
    //console.log("wrong");
    $("#level-title").text("game-over");
    $("body").addClass("game-over");
    var audio = new Audio('wrong.mp3');
    startover();
    audio.play();
    setTimeout(function(){
        $("body").removeClass("game-over");},1000);
        startover();
    }
    
}

function playsound(name){
    var audio = new Audio(name+'.mp3');
audio.play();
}

function animatepress(currentColour){
    $("."+currentColour).addClass("pressed");

    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");},100);
    }

function nextsequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    
        var randomnumber=Math.floor(Math.random()*4);
        //console.log(randomnumber);
        var randomchosencolor=buttoncolor[randomnumber];
        gamepattern.push(randomchosencolor);
        
        $("#" + randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
        playsound(randomchosencolor);
        animatepress(randomchosencolor);
        //console.log(randomchosencolor + '.mp3');
        
        }
        function startover(){
            level=0;
            started=false;
            gamepattern=[];
            $("#level-title").text("Press A Key to Start");
        }