const http = require('http');
const url = require('url');
const port = 8080;

const utils = require('./COMP4537/labs/3/modules/utils');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html'});

    let q = url.parse(req.url, true);
    // if(q.pathname == "/") {
    //     res.end("This is the root.");
    // }
    // else 
    if(q.pathname == "/COMP4537/labs/3/getDate/") {
        let text = utils.getDate(q.query["name"]);
        res.end(`<div style=color:blue>` + text + `<div>/`);
    }
}).listen(port);


console.log('Server is running and listening');