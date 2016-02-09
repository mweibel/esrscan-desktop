const http = require('http')
const os = require('os')
const Bonjour = require('bonjour')

function handlePost (webContents, request, response, cb) {
  var body = ''

  request.on('data', function (data) {
    body += data
    // prevent too much data, one kb should be enough.
    if (body.length > 1024) {
      request.connection.destroy()
    }
  })
  request.on('end', function () {
    cb(body, response, webContents)
  })
}

function handleScan (body, response, webContents) {
  const scan = JSON.parse(body)

  webContents.send('scan', scan)

  response.writeHead(200, {'Content-Type': 'application/json'})
  response.end()
}

function handleConnect (body, response, webContents) {
  const info = JSON.parse(body)

  webContents.send('connection-info', info)

  response.writeHead(200, {'Content-Type': 'application/json'})
  response.end()
}

function startServer (app, webContents) {
  const server = http.createServer(function onRequest (request, response) {
    if (request.method === 'POST' && request.url === '/scan') {
      return handlePost(webContents, request, response, handleScan)
    }
    if (request.method === 'POST' && request.url === '/connect') {
      return handlePost(webContents, request, response, handleConnect)
    }
    response.writeHead(404, {'Content-Type': 'text/plain'})
    response.end('Not Found')
  })

  server.listen(0, '0.0.0.0', function onStarted () {
    var bonjour = new Bonjour({
      multicast: true
    })
    var service = bonjour.publish({
      name: os.hostname().split('.')[0].split('-').join(' '),
      port: server.address().port,
      type: 'esrhttp',
      protocol: 'tcp'
    })

    app.on('quit', function () {
      service.stop()
      bonjour.unpublishAll(function () {
        bonjour.destroy()
      })
    })
  })
}

module.exports = startServer
