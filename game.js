// alert("test");

var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;
// Use jQuery to detect 
// when a keyboard key has been pressed

$(document).keypress(function () {
    if (!started) {
        // The h1 title starts out saying "Press A Key to Start", when the game has started
        // change this to say "Level 0".
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
})

// Use jQuery to detect 
// when any of the buttons are clicked and trigger a handler function

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);


});



function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);

    // Use jQuery to select the button 
    // with the same id as the randomChosenColour

    // animate a flash to the button selected in step 1.
    // setInterval(() => {
    //     $("#" + randomChosenColour).fadeIn();
    //     $("#" + randomChosenColour).fadeOut();
    // }, 30);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //  play the sound for the button colour selected
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 500);
}

function checkAnswer(currentLevel) {
    // heck if the most recent user answer is the same 
    // as the game pattern. 
    // If so then log "success" 
    // otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("game over press Any Key to Restart");
        startOver();
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}




