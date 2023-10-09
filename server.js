const http = require("http");
const url = require("url");
const PORT = process.env.PORT || 8080;

// app.use(express.static(__dirname));

const utils = require("./COMP4537/labs/3/modules/utils");

http
	.createServer((req, res) => {
		res.writeHead(200, {
			"Content-Type": "text/html",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "*",
		});

		let q = url.parse(req.url, true);
		if (q.pathname == "/") {
			res.end("this is the root.");
		}
		// else if (q.pathname == "/COMP4537/labs/1/index.html") {
		// }
		else if (q.pathname == "/COMP4537/labs/3/getDate/") {
			let text = utils.getDate(q.query["name"]);
			res.end(`<div style=color:blue>` + text + `<div>`);
		}
	})
	.listen(PORT);

console.log("Server is running and listening on port: " + PORT);
