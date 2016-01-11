const http = require('http');
const os = require('os');
const mdns = require('mdns');
const address = require('network-address');

function handleScan(webContents, request, response) {
  var body = '';

  request.on('data', function(data) {
    body += data;
    // prevent too much data, one kb should be enough.
    if (body.length > 1024) {
      request.connection.destroy();
    }
  });
  request.on('end', function() {
    const scan = JSON.parse(body);

    webContents.send('scan', scan);

    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end();
  });
}

function startServer(webContents) {
  const server = http.createServer(function onRequest(request, response) {
    if (request.method === 'POST' && request.url === '/scan') {
      return handleScan(webContents, request, response);
    }
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('Not Found');
  });

  server.listen(0, '0.0.0.0', function onStarted() {
    const options = {
      networkInterface: address(),
      host: os.hostname()
    };
    const ad = mdns.createAdvertisement(mdns.tcp('esrhttp'), server.address().port, options, function registered() {});
    ad.start();
  });
}

module.exports = startServer;
