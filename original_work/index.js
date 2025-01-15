var connect = require('connect');
var serveStatic = require('serve-static');

var fs = require('fs');
let data = JSON.parse(fs.readFileSync("list.json", "utf8"));

connect()
	.use(serveStatic(__dirname))
	.listen(8080, () => console.log('Server running on 8080...'));
