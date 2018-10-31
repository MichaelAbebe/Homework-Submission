var myHttp = require('http');
var myFS = require('fs');
var myUrl = require('url');
var myPath = require('path');
const myServerPort = process.argv[2] || 8080;
var type="";
const mimeType = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.eot': 'appliaction/vnd.ms-fontobject',
  '.ttf': 'aplication/font-sfnt'
};

function sendDefaultResponse(myResponse) {
  myFS.readFile('index.html', function(err, data) {
    myResponse.writeHead(200, {
      'Content-Type': 'text/html'
    });
    myResponse.write(data);
    myResponse.end();
  });
}

function sendShoeResponce(myResponse) {
  myFS.readFile('shoes.html', function(err, data) {
    myResponse.writeHead(200, {
      'Content-Type': 'text/html'
    });
    myResponse.write(data);
    myResponse.end();
  });
}

function sendFormalShoesResponce(myResponse) {
  myFS.readFile('formalShoes.html', function(err, data) {
    myResponse.writeHead(200, {
      'Content-Type': 'text/html'
    });
    myResponse.write(data);
    myResponse.end();
  });
}
function sendCasualShoesResponce(myResponse) {
  myFS.readFile('casualShoes.html', function(err, data) {
    myResponse.writeHead(200, {
      'Content-Type': 'text/html'
    });
    myResponse.write(data);
    myResponse.end();
  });
}
function sendCasualSocksResponce(myResponse) {
  myFS.readFile('casualSocks.html', function(err, data) {
    myResponse.writeHead(200, {
      'Content-Type': 'text/html'
    });
    myResponse.write(data);
    myResponse.end();
  });
}
function sendFormalSocksResponce(myResponse) {
  myFS.readFile('FormalSocks.html', function(err, data) {
    myResponse.writeHead(200, {
      'Content-Type': 'text/html'
    });
    myResponse.write(data);
    myResponse.end();
  });
}
function sendSocksResponce(myResponse) {
  myFS.readFile('socks.html', function(err, data) {
    myResponse.writeHead(200, {
      'Content-Type': 'text/html'
    });
    myResponse.write(data);
    myResponse.end();
  });
}

function handleIncomingRequest(inRequest, myResponse) {

  var parsedUrl = myUrl.parse(inRequest.url, true);
  var pathName = decodeURI(myPath.join(__dirname, parsedUrl.pathname));
  var ext = myPath.parse(pathName).ext;
  var inQuery = parsedUrl.query;
  var inPath = parsedUrl.pathname;


  switch (inPath) {
    case "/":
      sendDefaultResponse(myResponse);
      break;
    case "/shoes":
      console.log("in");
      sendShoeResponce(myResponse);
      break;
     case "/socks":
      sendSocksResponce(myResponse);
      break;

      case "/shoes/":
      type = inQuery.type;
      if(type=="formal"){
        sendFormalShoesResponce(myResponse);
      }
      else if (type=="casual"){
        sendCasualShoesResponce(myResponse);
      }
      break;
      case "/socks/":
      type = inQuery.type;
      if(type=="formal"){
        sendFormalSocksResponce(myResponse);
        break;
      }
      else if (type=="casual"){
        sendCasualSocksResponce(myResponse);
        break;
      }

    default:
      myFS.exists(pathName, function(exist) {
        if (!exist) {
          // if the file is not found, return 404
          myResponse.statusCode = 404;
          myResponse.end(`File ${pathName} not found!`);
          return;
        }
        // read file from file system
        myFS.readFile(pathName, function(err, data) {
          if (err) {
            myResponse.statusCode = 500;
            myResponse.end(`Error getting the file: ${err}.`);
          } else {
            // based on the URL path, extract the file extention. e.g. .js, .doc, ...
            const ext = myPath.parse(pathName).ext;
            // if the file is found, set Content-type and send data
            myResponse.setHeader('Content-type', mimeType[ext] || 'text/plain');
            myResponse.end(data);
          }
        });
      });
      break;
  }
}

var myServer = myHttp.createServer(handleIncomingRequest);
myServer.listen(myServerPort, function() {
  console.log("Server listening on port " + myServerPort)
});
