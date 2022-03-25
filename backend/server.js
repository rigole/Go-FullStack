const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Here the reply of the server');
});

server.listen(process.env.PORT || 3000);