/*
var http = require('http');
http.createServer(function (req, res) {
  fs.readFile('./index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);
*/

var connect = require('connect');
var serveStatic = require('serve-static');

var fs = require('fs');
let data = JSON.parse(fs.readFileSync("list.json", "utf8"));

connect()
	.use(serveStatic(__dirname))
	.listen(8080, () => console.log('Server running on 8080...'));
