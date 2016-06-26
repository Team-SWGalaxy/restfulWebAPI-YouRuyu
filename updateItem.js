var express = require('express');
var app = express();
var fs = require('fs');
var _ = require('lodash');

var bodyParser = require("body-parser");
app.use(bodyParser.json());
var itemsInformations = './items.json';

app.post('/:id', function (req, res) {
    fs.readFile(itemsInformations, 'utf-8', function (err, data) {
        if (!err) {
            var items = JSON.parse(data);
            var updateId = req.params.id;
            updateItems(items, updateId, req, res);
        } else {
            res.sendStatus(404);
        }
    });
});

function updateItems(items, updateId, req, res) {
    var position = _.findIndex(items, function (item) {
        return item.id === parseInt(updateId);
    });
    console.log(position);
    if (position === -1) {
        res.sendStatus(400);
    } else {
        var updateItem = modifyItem(req, res);
        items[position].barcode = updateItem.barcode;
        items[position].name = updateItem.name;
        items[position].unit = updateItem.unit;
        items[position].price = updateItem.price;
        fs.writeFile(itemsInformations, JSON.stringify(items));
        console.log("update success");
        res.status(200).json(items);
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
        res.sendStatus(400);
    }
}

function matchDataFormat(item) {
    return typeof (item.barcode) === 'string' && typeof (item.name) === 'string' && typeof (item.unit) === 'string' && typeof (item.price) === 'number';
}

module.exports = app;