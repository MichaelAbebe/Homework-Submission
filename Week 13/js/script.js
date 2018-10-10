// Decalring the object for user grettings and replys
var test = [{ input:["Hello","Hi","Greetings"],output:["Good!","Hey!","Olla!"]},
{ input:["Whats up?","How is it going?","Whats new?"], output:["Chillen!","Noting much!","Same old same old"]},
{ input:["How is your day going?","how is Canada?","How is HYF course?"],output:["Great!","Boring!","Intresting!!"]}];
// objects for chatbot friends
 var friend = {firstName:"Michael",
              lastName:"Muluneh",
              age:32,
              eyeColor:"Brown",
              fullName:function concatName(){
                       return this.firstName +" "+ this.lastName;
                       },
              details:function getDetails(){
                      return "Hey you know " + this.firstName+" ? I know "+ this.firstName +" too! Their fullname is "
                      +this.fullName()+" they are "+this.age+ " years old and has "+ this.eyeColor+" eyes and Nice fella! "},
              bestFriend:function getBestFriend(){
                      return this.firstName+"'s bestfriend is "+ friend1.fullName();}
              };
 var friend1 = { firstName:"Yonathan",
               lastName:"Shimelis",
               age: 35,
               eyeColor:"Black",
               bestFriend:friend.fullName(),
               fullName:function concatName(){
                        return this.firstName +" "+ this.lastName;
                        },
               details:function getDetails(){
                       return "Hey you know " + this.firstName+" ? I know "+ this.firstName +" too! Their fullname is "
                       +this.fullName()+" they are "+this.age+ " years old and has "+ this.eyeColor+" eyes and Nice fella! "},
               bestFriend:function getBestFriend(){
                       return this.firstName+"'s bestfriend is "+ friend.fullName();}
              };

//reply function
function reply(){
  //declaring variables
  var question= document.getElementById("input").value;//setting the input value into variable
  var randomNumber= Math.floor(Math.random() * 3) + 0;//generating randomumber and seting it to a variable
  var filterType=null;
  var invalidInput=0;//variable to use if invalid input is entered
  //Condition if user input is show me a dog
  //if input is Friends name
  if(question==friend.firstName){
    invalidInput=1;
    document.getElementById('output').value="\nUser:"+question+"\nChatbot:"+friend.details();
  };
  if(question==friend1.firstName){
    invalidInput=1;
    document.getElementById('output').value="\nUser:"+question+"\nChatbot:"+friend1.details();
  }
  //Checking bestfriend
  if(question=="Who is the best friend of "+friend.firstName){
    invalidInput=1;
    document.getElementById('output').value+="\nUser:"+question+"\nChatbot:"+friend.bestFriend();
  }
 if (question=="Who is the best friend of "+friend1.firstName) {
    invalidInput=1;
    document.getElementById('output').value+="\nUser:"+question+"\nChatbot:"+friend1.bestFriend();
  }
  if(question=="Show me a dog"){
    loadImage();//load image function call
    invalidInput=1;
  }
  //condition if user input is set an alarm
  else if(question=="Set an alarm"){
    delayedAlert();//delayedAlert function call
    invalidInput=1;
  }
  else if(question=="Show me the weather")
  {
    invalidInput=1;
    //getWeather();
    weatherApi().then((weather)=>{
    document.getElementById("output").value="Cloudiness:"+weather.weather[0].description+"\nPressure:"+weather.main.pressure+"hpa"+"\nTemp:"+Math.ceil(weather.main.temp-273)+
                                            "\nHumidity:"+weather.main.humidity+"%"+"\nCity:"+weather.name+"\nCountry:"+weather.sys.country;
    }).catch((error)=>{
       document.getElementById("output").value=error.message;
    })
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
} //function using promises
// async function getWeather() {
//     let promise = new Promise(function(resolve,reject) {
//     let request = new XMLHttpRequest();
//     let url = "https://api.openweathermap.org/data/2.5/weather?q=Toronto,CA&APPID=9a2fce8fcdcf747ba7c1bc57e068db93";
//     request.onload =   function(response) {
//       if (this.status === 200) {
//         resolve(request.response)
//       }
//       else {
//         reject (Error(request.statusText));
//       }
//       promise.then(function(response){
//         let weather=JSON.parse(response)
//         document.getElementById("output").value="Cloudiness:"+weather.weather[0].description+"\nPressure:"+weather.main.pressure+"hpa"+"\nTemp:"+Math.ceil(weather.main.temp-273)+
//         "\nHumidity:"+weather.main.humidity+"%"+"\nCity:"+weather.name+"\nCountry:"+weather.sys.country;
//       })
//     }
//     request.open("GET", url, true);
//     request.send();
//   })
// };
async function weatherApi(){
  let request=await fetch("https://api.openweathermap.org/data/2.5/weather?q=Toronto,CA&APPID=9a2fce8fcdcf747ba7c1bc57e068db93");
  let data = await request.json();
  return data;
}
document.getElementById("submit").onclick = function () {reply()};
