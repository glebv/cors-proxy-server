const http = require('http'),
    httpProxy = require('http-proxy');

const targetPort = 8080;
const listenPort = 8000;

let proxy =  httpProxy.createProxyServer({});


proxy.on('proxyRes', function(proxyReq, req, res, options) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'ACCEPT, CONTENT-TYPE'); //add here all required headers
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
});

proxy.on('error', function(e) {
    console.log(e);
});

let server = http.createServer(function(req, res) {
    proxy.web(req, res, {
        target:'http://localhost:'+targetPort
    });
});

server.listen(listenPort);
console.log('Starting server');
console.log('Listening on port '+listenPort);
