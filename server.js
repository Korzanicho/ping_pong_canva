const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3001;

fs.readFile('./index.html', function(err, html){
	if(err){
		throw err;
	}
	const server = http.createServer(function(request, response){
		response.writeHeader(200, {"Content-Type": "text/html"});
		response.write(html);
		response.end();
		}).listen(port, hostname, ()=>{
			console.log(`Server running at http://${hostname}:${port}`);
		});
});

// http.createServer(function(req, res){
// 	res.writeHead(200);
// 	res.end("Serwer działa okej");
// }).listen(3000);