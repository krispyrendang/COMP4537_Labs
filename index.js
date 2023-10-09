const express = require('express');
const port = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.get('/', (req,res) => { 
    res.sendFile("index.html", { root: __dirname })
}); 

app.use(express.static(__dirname));

app.listen(port, () => {
    console.log("Listening on port " + port);
}); 