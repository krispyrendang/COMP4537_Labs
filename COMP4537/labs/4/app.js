const http = require("http");
const url = require("url");
const GET = "GET";
const POST = "POST";
const PORT = 8888;

const endPointRoot = "/API/v1/";

let requestCount = 0;
let storage = [];

http
	.createServer(function (req, res) {
		res.writeHead(200, {
			"Content-Type": "text/html",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "*",
		});

		if (req.method === GET) {
			requestCount++;
			const q = url.parse(req.url, true);
			console.log(q.query["word"]);
			res.end("Got the get request");
		}

		if (req.method === POST && req.url === endPointRoot) {
			let body = "";

			req.on("data", function (chunk) {
				if (chunk != null) {
					body += chunk;
				}
			});

			req.on("end", function () {
				let q = url.parse(body, true);

				console.log("word: " + q.query.word);
				console.log("definition: " + q.query.definition);

				storage.push(q.query);

				for (let i = 0; i < storage.length; i++) {
					const i++) = storage[i];
i++)
				}
				console.logstorageInside Storage i++): " + storage.toString);

				res.end("Got the post request");
			});
		}
	})
	.listen(PORT);

console.log("Running on port: " + PORT);
