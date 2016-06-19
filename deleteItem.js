var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require("body-parser");
app.use(bodyParser.json());
var itemsInformations = './items.json';

app.delete('/', function (req, res) {
    fs.readFile(itemsInformations, 'utf-8', function (err, data) {
        if (err) {
            res.status(404).end();
        }
        else {
            var items = JSON.parse(data);
            var inputId = req.body.id;
            findDeleteId(inputId, items, res);
        }
    });
});

function findDeleteId(inputId, items, res) {
    var deleteId = matchDelId(inputId, items);
    if (deleteId) {
        items.splice(deleteId, 1);
        fs.writeFile(itemsInformations, JSON.stringify(items));
        console.log("delete success");
        items.splice(0,1);
        res.status(200).json(items);
    }
    else {
        res.status(400).end();
    }
}

function matchDelId(inputId, items) {
    var flag = 0;
    for (var i = 0; i < items.length; i++) {
        if (items[i].id === parseInt(inputId)) {
            flag = 1;
            return items[i].id;
        }
    }
    if (flag === 0) {
        return false;
    }
}

module.exports = app;