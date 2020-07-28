var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var level = 1;

var flag = false;

var userClickedPattern = [];
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);


  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {


if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
console.log("success");
if(userClickedPattern.length==gamePattern.length)
{
  setTimeout(function(){
    nextSequance();
  },1000);
}
}



else {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function(){
      $("body").removeClass("game-over");
  },200);
  $("#level-title").text("Game Over, Press Any Key To Restart");
  startOver();
}
}

function nextSequance() {
  userClickedPattern=[];
  $("#level-title").text("level " + level);
  level++;
  var randomNumber = Math.floor((Math.random()) * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keypress(function() {
  if (!flag) {
    flag = true;
    nextSequance();
  }
});

function startOver(){
  level=1;
  gamePattern=[];
  flag=false;
}
