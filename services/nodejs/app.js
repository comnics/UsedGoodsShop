var express = require('express');
var path = require('path');
var jquery = require('jquery');

var app = express();



app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.writeln("aaaa");
    res.render('index');
});

app.get('/test', function(req, res){
    res.render('index');
});

app.listen(3000, function(){console.log("Server On")});