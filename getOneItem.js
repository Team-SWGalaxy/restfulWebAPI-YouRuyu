var express = require('express');
var app = express();
var fs = require('fs');

var itemsInformations = './items.json';

app.get('/:id', function (req, res) {
    fs.readFile(itemsInformations, 'utf-8', function (err, data) {
        if (err) {
            res.status(404).end();
        }
        else {
            var items = JSON.parse(data);
            var inputId = req.params.id;
            findItem(items, inputId, res);
        }
    });
});

function findItem(items, inputId, res) {
    var id = findId(items, inputId);
    if (id) {
        console.log("get success!");
        res.status(200).json(items[id]);
    }
    else {
        res.status(400).end();
    }
}

function findId(items, inputId) {
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