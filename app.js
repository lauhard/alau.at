const http = require('http');

http.createServer(function(req, res){
	res.write("resopnse3!");
	res.end();
}).listen(3000);
console.log("server started on port:",3000);
