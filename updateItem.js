var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require("body-parser");
app.use(bodyParser.json());
var itemsInformations = './items.json';

app.post('/:id', function (req, res) {
    fs.readFile(itemsInformations, 'utf-8', function (err, data) {
        if (err) {
            console.log ("1111");
            res.status(404).end();
        }
        else {

            var items = JSON.parse(data);
            var updateId = req.params.id;
            updateItems(items, updateId, req, res);
        }
    });
});

function updateItems(items, updateId, req, res) {
    var position = matchId(items, updateId);
    if (position) {
        var updateItem = modifyItem(req, res);
        items[position].barcode = updateItem.barcode;
        items[position].name = updateItem.name;
        items[position].unit = updateItem.unit;
        items[position].price = updateItem.price;
        fs.writeFile(itemsInformations, JSON.stringify(items));
        console.log("update success");
        res.status(200).json(items);
    }
    else {
        res.status(400).end();
    }
}

function matchId(items, updateId) {
    var flag = 0;
    for (var i = 1; i < items.length; i++) {
        if (items[i].id == parseInt(updateId)) {
            flag = 0;
            return i;
        }
    }
    if (flag === 0) {
        return false;
    }
}

function modifyItem(req, res) {
    var item = {
        "barcode": req.body.barcode,
        "name": req.body.name,
        "unit": req.body.unit,
        "price": req.body.price
    };
    var correctDataFormat = matchDataFormat(item);
    if (correctDataFormat === true) {
        return item;
    }
    else {
        res.status(400).end();
    }
}

function matchDataFormat(item) {
    var dataFormat = typeof (item.barcode) === 'string' && typeof (item.name) === 'string' && typeof (item.unit) === 'string' && typeof (item.price) === 'number';
    if (!dataFormat) {
        return false;
    } else {
        return true;
    }
}

module.exports = app;