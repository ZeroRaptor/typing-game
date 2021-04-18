// Stop Img Draggins

$('#bgImg').attr('draggable', false);
$('#carImg').attr('draggable', false);
$('#speedoImg').attr('draggable', false);
$('#txtBlur').attr('draggable', false);

// Text input and verification

var targStr = "Apparently, I need to think of some sentences";
$("#txtOut").text(targStr);

$(document).keypress(function(e){

    // Delete old chars
    if($("#txtIn").text().length>30){
        let temp = $("#txtIn").text().split("");
        temp.shift();
        $("#txtIn").text(temp.join(""));
    }
    
    // Check its the correct char
    if($("#txtIn").text().length == 0){
        if($("#txtOut").text().split("")[0] == e.key){
            $("#txtIn").text($("#txtIn").text() + e.key);
        }
    } else {
        if($("#txtOut").text().split("")[$("#txtIn").text().length] == e.key){
            $("#txtIn").text($("#txtIn").text() + e.key);
        }
    }
    
});