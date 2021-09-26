var number_set = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var numGen = [];
var marker = ["#","#","#","#"]
var user_number = [];
var cssColor = [
     '#3cba54',
     '#f4c20d',
     '#db3236',
     '#4885ed',
     '#FF6F61',
     '#6B5B95',
     '#88B04B',
     '#009B77',
     '#DD4124',
     '#D65076',
     '#45B8AC',
     '#EFC050',
     '#5B5EA6',
     '#9B2335',
     '#BC243C',
     '#C3447A',
     '#FF6F61',
     '#935529',
     '#E08119',
     '#2A4B7C',
     '#577284',
     '#F96714',
     '#264E36',
     '#2A293E',
     '#797B3A',
     '#DD4132',
     '#9E1030',
     '#FE840E',
     '#FF6F61',
     '#8D9440',
     '#FFD662',
     '#00539C',
     '#755139',
     '#D69C2F',
     '#616247',
     '#343148'
];
var a_location = [];
var b_location = [];
var checkBox = [];    
var winCount = 0;
var guessCount = 0;
var scoreBox = [];

function numGenf(arr_set){
    var arr = [];
    var newArr= [];
    for (let i = 0; i < 50; i++){
        if (newArr.length < 4){   
            arr.push(arr_set[Math.floor(Math.random()*arr_set.length)]);
            newArr = deDupe(arr);
        }  else  
        return newArr;
            }
}

numGen = numGenf(number_set);
numDisplay(marker, '.guess');

function numDisplay(arr, location){  
    var chgColor = [];  
    for (i = 0; i < arr.length; i++){     
        chgColor[i] = cssColor[Math.floor(Math.random()*cssColor.length)]; 
        var charDiv = $("<div>");
        charDiv.addClass("circlePad").css('background',chgColor[i]); 
        charDiv.text(arr[i])
        $(location).append(charDiv);
    }
    $(location).append("<br>")
}


console.log('new_compuetr_number : ' + numGen)

// Perform digits comparison
$(document).on("click", "#numCheck", function(){
    guessCount++
    var userInput = $("#display").val().trim();
    userInput = userInput.substring(0,4)
    numArr = userInput.split("");
    if(deDupe(numArr).length < 4){
        numDisplay(numArr, "#urGuess");
        numRepeat();
        return
    }else{
        if(numArr.length > 4){
            numArr.pop();
        }
        if(a_location.length == 4){
            // uWon();
            $("#display").val("")
            hintDisplay1();
        }else{        
            numDisplay(numArr, "#urGuess");
            numComp(numArr, numGen);
            $("#display").val("")
            hintDisplay();
        }
    }
});

//Reset game
$(document).on("click", "#gameReset", function(){
    a_location = [];
    b_location = [];
    $(".guess").empty();
    $("#urGuess").empty();
    $("#Loc").empty();
    $("#display").val("")
    numGen = numGenf(number_set);
    console.log('new_compuetr_number : ' + numGen)
    numDisplay(marker, '.guess');
    guessCount = 0;
    $("#numCheck").prop("disabled", false);
});

function deDupe(arr){
    //check for duplicates, not return them
    var newArr= [];
    var i;
    // console.log("length " + arr.length);
    
    for (let i = 0; i <= arr.length-1; i++){
        // console.log("i value = " + i);
    //     //check does arr[i] exist in newArr
    //     if(newArr.indexOf(arr[i])===-1){
    //         newArr.push(arr[i]);
           
            if(!newArr.includes(arr[i])){
                newArr.push(arr[i]);

            // console.log('Output: ' + newArr);
            // console.log('Input' + arr);
            // console.log("i=  "+i);
            
        }
    }
    return newArr;
}

function numComp(guessArr, computerArr){
    a_location = [];
    b_location = [];
    checkBox = [];    
    for (let i = 0; i < guessArr.length; i++){      
        for (let j = 0; j < computerArr.length; j++){
            if(guessArr[i] == computerArr[j]){
                if(i == j){
                    a_location.push(j);
                    if(a_location.length == 4){
                        winCount++
                        // $("#Loc").empty();
                        $(".guess").empty();
                        numDisplay(computerArr,".guess");
                        hintDisplay1();
                        // uWon();
                        
                    }
                    // console.log('A '+ a_location.length);
                }else {
                    b_location.push(j);
                    // console.log('B '+ b_location.length)
                }
            }

        }
    }    
    
}

function hintDisplay(){
    checkBox[0] = "A:"
    checkBox[1] = a_location.length;;
    checkBox[2] = "B:"
    checkBox[3] = b_location.length;
    checkBox[4] = "-"
    checkBox[5] = guessCount;
    for (let k = 0; k < checkBox.length; k++){
        var checkDiv = $("<div>");
        checkDiv.addClass("squarePad").css("background",'white');
        // console.log(checkBox);
        checkDiv.text(checkBox[k]);
        $("#Loc").append(checkDiv)
    }
    $("#Loc").append("<br>");
}
function hintDisplay1(){
    checkBox[0] = "A:"
    checkBox[1] = a_location.length;;
    checkBox[2] = "B:"
    checkBox[3] = b_location.length;
    checkBox[4] = "-"
    checkBox[5] = guessCount;
    for (let k = 0; k < checkBox.length; k++){
        var checkDiv = $("<div>");
        checkDiv.addClass("squarePad").css("background",'white');
        // console.log(checkBox);
        checkDiv.text(checkBox[k]);
        $("#Loc").append(checkDiv)
    }
    $("#Loc").append("<br>")
    $("#Loc").empty();
    uWon();
}


function uWon(){
    var winDiv = $("<div>");
    winDiv.addClass("winPad");    
    winDiv.text("You won!!");
    $("#Loc").append(winDiv);
    $("#Loc").append("<br>");
    $("#numCheck").prop("disabled", true);
}

function numRepeat(){
    var repeatDiv = $("<div>");
    repeatDiv.addClass("repeatPad");    
    repeatDiv.text("Number Must Not Repeat! - " + guessCount).css("color","#3F69AA");
    $("#Loc").append(repeatDiv);
    $("#Loc").append("<br>");
}