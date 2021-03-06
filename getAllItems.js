var express = require('express');
var app = express();
var fs = require('fs');

var itemsInformations = './items.json';

app.get('/', function (req, res) {
    fs.readFile(itemsInformations, 'utf-8', function (err, data) {
        if (!err) {
            var items = JSON.parse(data);
            console.log("success!");
            res.status(200).json(items);
        } else {
            res.sendStatus(404);
        }
    });
});

module.exports = app;