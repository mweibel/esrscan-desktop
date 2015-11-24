var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

console.log("starting stuff");

var http = require('http');
var os = require('os');
var mdns = require('mdns');
var address = require('network-address');

function handleScan(request, response) {
  var body = '';

  request.on('data', function(data) {
    body += data;
    // prevent too much data, one kb should be enough.
    if (body.length > 1024) {
      request.connection.destroy();
    }
  });
  request.on('end', function() {
    var scan = JSON.parse(body);
    console.log(scan);

    mainWindow.webContents.send('scan', scan);

    response.writeHead(200, {"Content-Type": "application/json"});
    response.end();
  });
}

var server = http.createServer(function onRequest(request, response) {
  if (request.method == 'POST' && request.url == '/scan') {
    return handleScan(request, response);
  }
  response.writeHead(404, {"Content-Type": "text/plain"});
  response.end("Not Found");
});

server.listen(0, '0.0.0.0', function onStarted() {
  console.log(arguments, server.address(), address(), os.hostname());
  var options = {
    networkInterface: address(),
    host: os.hostname()
  };
  var ad = mdns.createAdvertisement(mdns.tcp('esrhttp'), server.address().port, options, function registered() {
    console.log(arguments);
  });
  ad.start();
});
