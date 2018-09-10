// Decalring the object
var test = [{ input:["Hello","Hi","Greetings"],output:["Good!","Hey!","Olla!"]},
           { input:["Whats up?","How is it going?","Whats new?"], output:["Chillen!","Noting much!","Same old same old"]},
           { input:["How is your day going?","how is Canada?","How is HYF course?"],output:["Great!","Boring!","Intresting!!"]}];

//reply function
function reply(){
  //declaring variables
  var question= document.getElementById("input").value;//setting the input value into variable
  var randomNumber= Math.floor(Math.random() * 3) + 0;//generating randomumber and seting it to a variable
  var filterType=null;
  var invalidInput=0;//variable to use if invalid input is entered
  //Check if the question is included in the Object
  for (var i=0;i<test.length;++i){
    //Check if the user input is included in the array test
    if(test[i].input.includes(question)==true){
      var invalidInput=1;
      var includedInput = test[i]; //the array in which the user input is located
      var userInput = test[i].input.filter(filtered=>filtered==question);//filtering the user input
      //condition for the longest reply
       if(document.getElementById('longest').checked==true){
        var longest = includedInput.output.sort(function(a,b) {return b.length-a.length})[0];
        document.getElementById('output').value+="User:"+userInput+"\nChatbot:"+longest+"\n\n";
      }
      //condition for the shortest reply
      else if(document.getElementById('shortest').checked==true){
        var shortest = includedInput.output.sort(function (a, b) { return a.length - b.length})[0];
        document.getElementById('output').value+="User:"+userInput+"\nChatbot:"+shortest+"\n\n";
      }
      //condition fot the random
      else if(document.getElementById("random").checked==true){
        var random=includedInput.output[randomNumber];
        document.getElementById('output').value += "User:"+userInput+"\nChatbot:"+random+"\n\n";
      }
    }
 }
    if(invalidInput==0){//if user entered invalid input
    document.getElementById('output').value+="Sorry I have no answer to that!\n";
   }
}
document.getElementById("submit").onclick = function () {reply()};
