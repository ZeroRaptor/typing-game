// Stop Img Draggins

$('#bgImg').attr('draggable', false);
$('#carImg').attr('draggable', false);
$('#speedoImg').attr('draggable', false);
$('#txtBlur').attr('draggable', false);
$('#helicopter').attr('draggable', false);

// Text input and verification

var targStr = "This is a test string.";
var pos = 0;
// To keep counting after letters start being removed from the str
var realPos = 0;
var mistakes = 0;
var seconds = 0;
var miliseconds = 0;
var clock;
var accuracy = 100;
var words = 0;
var wpm = 0;
var carPos = $("#carImg").position().left;
const originalCarPos = $("#carImg").position().left;
$("#txtOut").text(targStr);

// Scorecard Buttons

// Restart game
$("#scoreRetry").click(function(){

    // Functional Resets
    pos = 0;
    realPos = 0;
    mistakes = 0;
    seconds = 0;
    miliseconds = 0;
    accuracy = 100;
    words = 0;
    wpm = 0;
    carPos = originalCarPos;


    // UI resets
    $("#overlay").css({display:"none",backgroundColor:"rgba(255,255,255,0.01)"});
    $("#txtIn").text("");
    $("#txtOut").html("");
    $("#txtOut").text(targStr);
    $("#mistakes").text("100%");
    $("#timer").text("0.0s");
    $("#wpmNum").text("0");
    $("#needle").css({transform:'rotate(-120deg)'});

    // Scorecard Resets
    $("#helicopter").css({right:"-100%"});
    $("#scoreCont").css({left:"131%"});
    $("#cloudBL").css({bottom:"-80%"});
    $("#cloudBR").css({bottom:"-80%"});    
    $("#cloudTL").css({top:"-80%"});
    $("#cloudTR").css({top:"-80%"});
});

// When the user types characters

$(document).keypress(function(e){

    if(realPos < targStr.length){
        // Delete old chars
        if($("#txtIn").text().length>40){
            let temp = $("#txtIn").text().split("");
            temp.shift();
            $("#txtIn").text(temp.join(""));
        }
        
        // Check its the correct char
        if($("#txtOut").text().split("")[pos] == e.key){
            $("#txtIn").text($("#txtIn").text() + e.key);
            pos++;
            realPos++;

            // Move text along
            if(pos>13){
                let temp = $("#txtOut").text().split("");
                temp.shift();
                $("#txtOut").text(temp.join(""));
                pos--;
            }

            // Grey out text
            let temp = $("#txtOut").text();
            $(".grey").remove();
            $("#txtOut").text(temp);

            let regex = new RegExp(`.{${pos}}`);
            $("#txtOut").html(function (i,html){
                return html.replace(regex,'<span class="grey">$&</span>');
            });

            // Recalc wpm
            words+=0.2;
            words = Math.floor(words * 10) / 10;
            wpm = (60 / (seconds + (miliseconds / 100))) * words;
            if(wpm > 200){
                wpm = 200;
            }
            $("#wpmNum").text(Math.floor(wpm));

            // Move Needle
            let degrees = -120 + (Math.floor(wpm) * 2);

            if(degrees > 120){
                degrees = 120;
            }
            $("#needle").css({transform:'rotate('+ degrees +'deg)'});

            // Move Car
            var increment = $(window).width() * 0.9;
            increment -= $("#carImg").width();
            increment /=  targStr.length;
            carPos += increment
            $("#carImg").css({left:carPos});

            // Start Clock
            if(realPos == 1){
                clock = setInterval(function() {
                    miliseconds++;
                    if(miliseconds == 100){
                        miliseconds = 0;
                        seconds++;
                    }
                    $('#timer').text(seconds + "." + miliseconds.toString().padStart(2, "0") + "s");
                }, 10);
            }

            // End Clock
            if(realPos == targStr.length){
                clearInterval(clock);
                showScore();
            }

        } else {
            // Add a mistake
            mistakes++;
            $("#txtCont").css({borderColor:"red",color:"red"});
            setTimeout(function(){
                $("#txtCont").css({borderColor:"white",color:"white"});
            },150);
        }

        // Recalculate Accuracy
        accuracy = (100 / (realPos + mistakes)) * realPos;
        accuracy = Math.round(accuracy)
        $("#mistakes").text(accuracy + "%");

    }

});

function showScore(){
    $("#overlay").css({display:"block"});
    $("#overlay").animate({backgroundColor:"rgba(255,255,255,0.7)"},3000);

    $("#helicopter").animate({right:"8.5%"},3000);
    $("#scoreCont").animate({left:"22.5%"},3000);
    $("#cloudBL").animate({bottom:"-5%"},2000);
    $("#cloudBR").animate({bottom:"-8%"},2000);    
    $("#cloudTL").animate({top:"-5%"},2000);
    $("#cloudTR").animate({top:"-8%"},2000);

    $("#scoreTime").text(`${seconds}.${miliseconds.toString().padStart(2, "0")}s`);
    $("#scoreAccuracy").text(`${Math.round(accuracy)}% Accuracy`);
    $("#scoreWpm").text(`${Math.round(wpm)} WPM`);

    setTimeout(function(){$("#carImg").css({left:"5%"});},2000);
}