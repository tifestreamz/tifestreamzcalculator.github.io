//so i've got to add some comments here

function getHistory(){
    return document.getElementById("history-value").innerText;
}
function printHistory(num){
    return document.getElementById("history-value").innerText=num;
}

function getOutput(){
    return document.getElementById("output-value").innerText;
}

function printOutput(num){
    if(num==""){
        document.getElementById("output-value").innerText=num;
    }
    else{
        document.getElementById("output-value").innerText=getFormattedNumber(num);
    }
   //getFormattedNumber helps to add comma where necessary, the function has been defined below.
}
function getFormattedNumber(num){
    if(num=="-"){//this if satement allow us to use backspace on negative values
        return ""; //so this makes it return an empty value
    }  
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}

function reverseNumberFormat(num){
    return Number(num.replace(/,/g, ''))
}

//operations

var operator = document.getElementsByClassName("operator");
for(var i = 0; i < operator.length; i++){
    operator[i].addEventListener('click', function(){
        //for the clear button
        if(this.id == "clear"){
            printHistory("");
            printOutput(""); //this is to clear the screen of the calculator, so both the output and the history would be set to an empty string
        }
        //for the backspace button
        else if(this.id =="backspace"){
            var output = reverseNumberFormat(getOutput()).toString(); //coversion to string
            if(output){// if the output has a value
                output = output.substr(0, output.length-1);
                printOutput(output);
                
            }
        }
        
        //for other operators, operator would not work if output is empty
        else{
            var output = getOutput();
            var history = getHistory();
            if(output==""&&history!=""){
                if(isNan(history[history.length-1])){
                    history = history.substr(0, history.length-1);
                }
            }
            if(output!="" || history!=""){
                //condition?true:false //(this is another way to write conditional statement)//
                output=output==""? //this is where i found the possible bug, i need to debug this particular line of code
                output:reverseNumberFormat(output);
                history = history+output;
                if(this.id=="="){
                    var result=eval(history);
                    printOutput(result);
                    printHistory("");
                }
                else{
                    history = history+this.id;
                    printHistory(history);
                    printOutput(""); 
                }
            }
        }
    });
}

//Numbers buttons on the calculator

var number = document.getElementsByClassName("number");
for(var i = 0; i < number.length; i++){
    number[i].addEventListener('click', function(){
        var output = reverseNumberFormat(getOutput())
        if(output!=NaN){ //if output is a number
            output = output+this.id //we concatenate the id to the output
            printOutput(output); //and print it to the screen
        }
    });
}