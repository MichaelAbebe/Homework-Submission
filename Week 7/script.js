// Decalring the object
var test = { input:"Hallo!!",
             output:"not good"
};
// Function reply to display the output 
function reply(){
  var question= document.getElementById("input").value;
  if(question==test.input){
    document.getElementById('output').value=test.output;
  }
  else {
    document.getElementById('output').value="I don't understand that command. Please enter another.";
  }
}
