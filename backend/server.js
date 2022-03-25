const { Console } = require('console');
const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 300)

const server = http.createServer(app, console.log("Server Started"));

server.listen(process.env.PORT || 3000);