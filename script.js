// Stop Img Draggins

$('#bgImg').attr('draggable', false);
$('#carImg').attr('draggable', false);
$('#speedoImg').attr('draggable', false);
$('#txtBlur').attr('draggable', false);

// Text input and verification

var targStr = "Apparently, I need to think of some sentences to fill the space with :)";
var pos = 0;
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
            //return html.replace(/.{2}/,'<span class="grey">$&</span>');
        });
    }

});