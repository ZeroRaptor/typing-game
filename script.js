// Stop Img Draggins

$('#bgImg').attr('draggable', false);
$('#carImg').attr('draggable', false);
$('#speedoImg').attr('draggable', false);
$('#txtBlur').attr('draggable', false);

// Text input and verification

var targStr = "Apparently, I need to think of some sentences to fill the space with :)";
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
$("#txtOut").text(targStr);

$(document).keypress(function(e){

    // Delete old chars
    if($("#txtIn").text().length>30){
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
    accuracy = Math.floor(accuracy)
    $("#mistakes").text(accuracy + "%");

});