var express = require('express');
var app = express();
var fs = require('fs');

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
            var inputItem = insertItem(req, items);
            items.push(inputItem);
            items[0].count++;
            res.status(201).json(items);
            fs.writeFile(itemsInformations, JSON.stringify(items));
            items.splice(0, 1);
            console.log(items);
            res.end();
        }
    })
});

function insertItem(req, items) {
    var inputItem = {
        "id": items[0].count + 1,
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