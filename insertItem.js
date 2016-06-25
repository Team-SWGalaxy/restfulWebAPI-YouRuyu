var express = require('express');
var app = express();
var fs = require('fs');
var nextId = require('./nextId');

var bodyParser = require("body-parser");
app.use(bodyParser.json());
var itemsInformations = './items.json';

app.post('/', function (req, res) {
    fs.readFile(itemsInformations, 'utf-8', function (err, data) {
        if (err) {
            res.status(404).end();
        }
        else {
            var items = JSON.parse(data);
            console.log("add success!");
            addTofile(req, res, items);
        }
    })
});

function addTofile(req, res, items) {
    var inputItem = insertItem(req, items);
    if (inputItem) {
        items.push(inputItem);
        fs.writeFile(itemsInformations, JSON.stringify(items));
        res.status(201).json(items);
    }
    else {
        res.status(400).end();
    }
}

function insertItem(req, items) {
    var inputItem = {
        "id":nextId(),
        "barcode": req.body.barcode,
        "name": req.body.name,
        "unit": req.body.unit,
        "price": req.body.price
    };

    var correctFormatItem = judgeItemFormat(inputItem);
    if (correctFormatItem) {
        return inputItem;
    }
    else {
        return false;
    }
}

function judgeItemFormat(inputItem) {
    var correctFormat = typeof (inputItem.barcode) === 'string' && typeof (inputItem.name) === 'string' && typeof (inputItem.unit) === 'string' && typeof (inputItem.price) === 'number';
    if (correctFormat) {
        return true;
    }
    else {
        return false;
    }
}


module.exports = app;