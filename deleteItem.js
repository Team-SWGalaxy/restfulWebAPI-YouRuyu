var express = require('express');
var app = express();
var fs = require('fs');

var itemsInformations = './items.json';

app.delete('/:id', function (req, res) {
    fs.readFile(itemsInformations, 'utf-8', function (err, data) {
        if (!err) {
            var items = JSON.parse(data);
            var inputId = req.params.id;
            findDeleteId(inputId, items, res);
        } else {
            res.status(404).end();
        }
    });
});

function findDeleteId(inputId, items, res) {
    var deleteId = matchDelId(inputId, items);
    if (deleteId) {
        items.splice(deleteId, 1);
        fs.writeFile(itemsInformations, JSON.stringify(items));
        console.log("delete success");
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
            return i;
        }
    }
    if (flag === 0) {
        return false;
    }
}

module.exports = app;