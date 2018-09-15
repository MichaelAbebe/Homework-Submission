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
  //Condition if user input is show me a dog
  if(question=="Show me a dog"){
    loadImage();//load image function call
    invalidInput=1;
  }
  //condition if user input is set an alarm
  else if(question=="Set an alarm"){
    delayedAlert();//delayedAlert function call
    invalidInput=1;
  }
  else {
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
  }
  if(invalidInput==0){//if user entered invalid input
    document.getElementById('output').value+="User:"+question+"\nChatbot:"+"Sorry I have no answer to that!\n\n";
  }
}
//delayedAlert function displaying an alert
function delayedAlert(){
  window.setTimeout(slowAlert,2000);
}
function slowAlert(){
  alert("Did you forget about me? It\’s your friend, the Alarm!");

}
//function to load the image
function loadImage() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      document.getElementById("output").style.backgroundImage= "url("+ obj.message + ")",clear();//assiging image as a background and calling clear function
      function clear(){//clear function to display the background image for 5 sec
        setTimeout(clearBgImage,5000)
      }
      function clearBgImage(){
        document.getElementById('output').style.backgroundImage="";
      }
    }
  };
  http.open("GET", "https://dog.ceo/api/breeds/image/random", true);
  http.send();
}
document.getElementById("submit").onclick = function () {reply()};
