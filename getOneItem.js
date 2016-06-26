var express = require('express');
var app = express();
var fs = require('fs');
var _ = require('lodash');

var itemsInformations = './items.json';

app.get('/:id', function (req, res) {
    fs.readFile(itemsInformations, 'utf-8', function (err, data) {
        if (!err) {
            var items = JSON.parse(data);
            var inputId = req.params.id;
            console.log(inputId);
            findItem(items, inputId, res);
        } else {
            res.sendStatus(404);
        }
    });
});

function findItem(items, inputId, res) {
    var id = _.findIndex(items, function (item) {
        return item.id === parseInt(inputId);
    });
    if (id === -1) {
        res.sendStatus(400);
    } else {
        console.log("get success!");
        res.status(200).json(items[id]);
    }
}

module.exports = app;