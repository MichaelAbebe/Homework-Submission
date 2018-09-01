// Decalring the object
var test = [{ input:"Halo!!",output:Array("How are you?","Hey!","Olla!")},
            { input:"Whats up?", output:Array("Chillen!","Noting much!","Same old same old")},
            { input:"How is your day going?",output:Array("Great!","Boring!","Intresting!!")}];

//reply function
function reply()
{
  //declaring variables
  var question= document.getElementById("input").value;//setting the input value into variable
  var randomNumber= Math.floor(Math.random() * 3) + 0;//generating randomumber and seting it to a variable
  var filterType=null;
  var result = test.filter(test=>test.input==question);//filtering the user input

    if(result.length > 0)//check if the array has value
     {
       //condition for the longest
       if(document.getElementById('longest').checked==true){
         var longest = result[0].output.sort(function(a,b) {return b.length-a.length})[0];
         document.getElementById('output').value=longest;
         //BONUS arrow function not working properly
         // var longest = result[0].output.sort((a, b) => { b.length - a.length})[0];

       }
       // condition for the shortest
       else if(document.getElementById('shortest').checked==true){
         var shortest = result[0].output.sort(function (a, b) { return a.length - b.length})[0];
         document.getElementById('output').value=shortest;
         //BONUS arrow function not working properly
         // var shortest= result[0].output.sort((a,b) => {a.length - b.length})[0];

       }
       //condition fot the random
       else if(document.getElementById("random").checked==true){
         var random=result[0].output[randomNumber];
         document.getElementById('output').value=random;
       }
     }
     // condition for empty array and different input
   else document.getElementById('output').value ="error";
}
//submit onclick event
document.getElementById("submit").onclick = function () {reply()};
