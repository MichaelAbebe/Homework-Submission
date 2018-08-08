// Question Number 1
function vehicle(color,code,year){
  if(code==1){
     if (year>=3&&year<=5){
        console.log(color+"\tUsed car")
     }
    else if (year>=0&&year<3){
       console.log(color+"\tNew car")
     }
  }
    else {
      if(year>=3&&year<=5){
        console.log(color+"\tUsed Motorbike")
      }
      else if((year>=0&&year<3)){
        console.log(color+"\tNew Motorbike")
      }

    }
  }

vehicle("red",2,3)

// Question Number 2
function vehicle(color,code,year){
  switch(code){
    case 1:{
     if (year>=3&&year<=5){
        console.log(color+"\tUsed car")
        break;
     }
    else if (year>=0&&year<3){
       console.log(color+"\tNew car")
       break;
     }
  }

  case 2:{

      if(year>=3&&year<=5){
        console.log(color+"\tUsed Motorbike")
        break;
      }
      else if(year>=0&&year<3){
        console.log(color+"\tNew Motorbike")
        break;
      }
    }
    case 3:{
      if(year>=3&&year<=5){
        console.log(color+"\tUsed caravan")
        break;
      }
      else if(year>=0&&year<3){
        console.log(color+"\tNew caravan")
        break;
      }
    }
      case 4:{
      if(year>=3&&year<=5){
        console.log(color+"\tUsed SUV")
        break;
      }
      else if(year>=0&&year<3){
        console.log(color+"\tNew SUV")
        break;
      }
    }
    default:
      console.log("Not a valid input")
    }
    }

    vehicle("red",5,5);
// Question Number 3
var teachers = { youssef:"Git bash",
                 rajaie:"HTML and CSS",
                 sadd:"Javascript"
               }
