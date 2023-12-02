const http = require('http');

http.createServer(function(req, res){
	res.write("resopnse2!");
	res.end();
}).listen(3000);
console.log("server started on port:",3000);
