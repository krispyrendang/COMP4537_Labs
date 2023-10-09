const http = require("http");
const url = require("url");
const GET = "GET";
const POST = "POST";

const endPointRoot = "/API/v1/";

let requestCount = 0;
let dictionary = [
	// { word: "word", definition: "DEFINTION" },
];

function addDefinition(word, definition) {

	//TODO!! check for empty string after removing spaces
	if(!word.trim()){
		console.log("word after trim: " word.trim());
		return false;
	}
	for (let i = 0; i < dictionary.length; i++) {
		if (dictionary[i].word === word) {
			// Word exists, send message that word is not added
			return false;
		}
	}

	dictionary.push({
		word: word,
		definition: definition,
	});
	return true;
}

function searchDefinition(word) {
	for (let i = 0; i < dictionary.length; i++) {
		if (dictionary[i].word === word) {
			// Word exists, send back the definition
			return dictionary[i].definition;
		}
	}
	//returns false if the word is not found in dictionary
	return false;
}

http
	.createServer(function (req, res) {
		res.writeHead(200, {
			"Content-Type": "text/html",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "*",
		});

		if (req.method === GET) {
			console.log("GET");
			console.log("Words in Dictionary:");
			for (let i = 0; i < dictionary.length; i++) {
				console.log(
					"Word: " +
						dictionary[i].word +
						" Definition: " +
						dictionary[i].definition
				);
			}

			requestCount++;
			const q = url.parse(req.url, true);

			// Search for word in dictionary. Sends an appropriate response
			results = searchDefinition(q.query["word"]);
			if (results) {
				res.end(results);
			} else {
				res.end(
					"Request #" +
						requestCount +
						" The word '" +
						q.query["word"] +
						"' is not found!"
				);
			}
		}

		if (req.method === POST && req.url === endPointRoot) {
			console.log("POST");
			let body = "";

			req.on("data", function (chunk) {
				if (chunk != null) {
					body += chunk;
				}
			});

			req.on("end", function () {
				let q = url.parse(body, true);

				// Adds word to dictionary if it does not exist. Sends an appropriate status message
				let result = addDefinition(q.query.word, q.query.definition);
				if (result) {
					res.end(
						"Request # " +
							requestCount +
							": (Total entries in your dictionary: " +
							dictionary.length +
							")\n\nNew entry recorded:" +
							'\n\n"' +
							q.query.word +
							": " +
							q.query.definition +
							'"'
					);
				} else {
					res.end(
						"Unsuccessful: The new word already exists in the dictionary!"
					);
				}
			});
		}
	})
	.listen(8888);

console.log("Running on port 8888");
