var Hapi = require('hapi'),
	routes = require('./routes');

var server = new Hapi.Server();
server.connection({ port: 5000 });

routes(server);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});