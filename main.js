var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var diont = require('diont')();

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

diont.on("serviceAnnounced", function(serviceInfo) {
  // A service was announced
  // This function triggers for services not yet available in diont.getServiceInfos()
  // serviceInfo is an Object { isOurService : Boolean, service: Object }
  // service.name, service.host and service.port are always filled
  console.log("A new service was announced", serviceInfo.service);
  // List currently known services
  console.log("All known services", diont.getServiceInfos());
});

diont.on("serviceRenounced", function(serviceInfo) {
  console.log("A service was renounced", serviceInfo.service);
  console.log("All known services", diont.getServiceInfos());
});

var service = {
  name: 'ESRScannerServer',
  port: '5476'
};
diont.announceService(service);
