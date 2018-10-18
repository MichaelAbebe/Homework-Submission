var myHttp = require('http');
var myUrl = require('url');
const myServerPort = 8080;
var num1 = 0;
var num2 = 0;
//default responce function
function sendDefaultResponse(myResponse) {
  myResponse.setHeader('Content-Type', 'text/html');
  myResponse.write(`
   	 <!html>
   	 <html>
   		 <head>
   			 <title>Calculator</title>
   		 </head>
   		 <body>
       	 <h1>Add, Substract and Multiply two numbers </h1>
   		 </body>
   	 </html>
    `);
}
//Addition function
function sendAdditionResponse(result, myResponse) {
  myResponse.setHeader('Content-Type', 'text/html');
  myResponse.write(`
     <!html>
    <html>
      <head>
        <title>Calculator</title>
      </head>
      <body>
        <h1>` + num1 + `+` + num2 + `=` + result + `</h1>
      </body>
    </html>
  `);
}
//substraction function
function sendSubstractionResponse(result, myResponse) {
  myResponse.setHeader('Content-Type', 'text/html');
  myResponse.write(`
     <!html>
    <html>
      <head>
        <title>Calculator</title>
      </head>
      <body>
        <h1>` + num1 + `-` + num2 + `=` + result + `</h1>
      </body>
    </html>
  `);
}
//multiplicaion function
function sendMultiplyResponse(result, myResponse) {
  myResponse.setHeader('Content-Type', 'text/html');
  myResponse.write(`
     <!html>
    <html>
      <head>
        <title>Calculator</title>
      </head>
      <body>
        <h1>` + num1 + `*` + num2 + `=` + result + `</h1>
      </body>
    </html>
  `);
}
//image function
function sendImageRequest(myResponse) {
  myResponse.setHeader('Content-Type', 'text/html');
  myResponse.write(`
     <!html>
    <html>
      <head>
        <title>Calculator</title>
      </head>
      <body>
      <div>
      <img src="https://cdn.xl.thumbs.canstockphoto.com/done-word-stamp3-done-in-vector-format-clip-art-vector_csp6017086.jpg">
      </div>
      </body>
    </html>
  `);
}

function handleIncomingRequest(inRequest, myResponse) {
  var parsedUrl = myUrl.parse(inRequest.url, true);
  var inPath = parsedUrl.pathname;
  var inQuery = parsedUrl.query;
  switch (inPath) {
    case "/":
      sendDefaultResponse(myResponse);
      break;
    case "/add/":
      var input = [...inQuery.numbers];
      num1 = inQuery.num1;
      num2 = inQuery.num2;
      var result = parseInt(num1) + parseInt(num2);
      sendAdditionResponse(result, myResponse);
      break;
    case "/substract/":
      num1 = inQuery.num1;
      num2 = inQuery.num2;
      var result = parseInt(num1) - parseInt(num2);
      sendSubstractionResponse(result, myResponse);
      break;
    case "/multiply/":
      num1 = inQuery.num1;
      num2 = inQuery.num2;
      var result = parseInt(num1) * parseInt(num2);
      sendMultiplyResponse(result, myResponse);
      break;
    case "/image":
      sendImageRequest(myResponse);
      break;
    default:
      myResponse.statusCode = 404;
      myResponse.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      myResponse.write("Error! Information not found.");
      break;
  }
  myResponse.end();
}

var myServer = myHttp.createServer(handleIncomingRequest);
myServer.listen(myServerPort, function() {
  console.log("Serverz listening on port " + myServerPort)
});
