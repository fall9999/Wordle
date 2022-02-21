var curr_pointer=1;
var end_of_word=false;
var game_ended=false;
var curr_input=[];
var wordle=new wordle_5();
//var xxxx=wordle.interactor("mukul");
//console.log(xxxx);
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    var keyPressed=event.key;
    if(keyPressed=="Escape"){
        location.reload();
    }

    if(!game_ended) {
        if (keyPressed == "Enter") {
            if (end_of_word){
                var inp = curr_input.reduce((a, b) => a + b);
                console.log(inp);
                //interactor starts
                var xx=wordle.interactor(inp);
                console.log(xx);
                if(xx.length){
                    if(xx[0]==9){
                        console.log("congrats! you solved it!");
                        for(var i=curr_pointer-4;i<=curr_pointer;i++){
                            document.getElementById("d"+i).classList.add("won");
                        }
                        game_ended=true;
                    }else{
                        for(var i=0;i<5;i++){
                            var classname="";
                            if(xx[i]==0){
                                classname="wrong";
                            }else if(xx[i]==1){
                                classname="correct";
                            }else{
                                classname="semi-correct";
                            }
                            document.getElementById("d"+(i+curr_pointer-4)).classList.add(classname);
                        }
                    }
                }else{
                    document.getElementById("d"+curr_pointer).parentNode.classList.add("shake-class");
                    // window.setTimeout(function() {
                    //     document.getElementById("d"+curr_pointer).parentNode.classList.remove("shake-class");
                    // }, 3);
                }
                //interactor ends
                if(xx.length) {
                    if (curr_pointer < 30) {
                        end_of_word = false;
                        curr_pointer++;
                    } else {
                        game_ended = true;
                    }
                    curr_input = [];
                }
            } else {

            }
        } else if (keyPressed == "Backspace") {
            document.getElementById("d"+curr_pointer).parentNode.classList.remove("shake-class");
            if (curr_pointer % 5 != 1) {
                if (end_of_word) {
                    //document.getElementById("d" + curr_pointer).innerHTML = "";
                    end_of_word = false;
                } else {
                    curr_pointer--;
                }
                curr_input.pop();
            }
            document.getElementById("d" + curr_pointer).innerHTML = "";


        } else if (keyPressed.length == 1 && (('a' <= keyPressed && keyPressed <= 'z') || ('A' <= keyPressed && keyPressed <= 'Z'))) {
            if (!end_of_word) {
                document.getElementById("d" + curr_pointer).innerHTML = ((event.key) + "").toUpperCase();
                curr_input.push(((event.key) + "").toUpperCase());
                if (curr_pointer % 5 != 0) {
                    curr_pointer++;
                } else {
                    end_of_word = true;
                }
            }
        }
    }else{//game ended

    }
    console.log(keyPressed,curr_pointer,end_of_word,curr_input);

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);
