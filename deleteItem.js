var express = require('express');
var app = express();
var fs = require('fs');
var _ = require('lodash');

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
    var deleteId = _.findIndex(items, function (item) {
        return item.id === parseInt(inputId);
    });
    if (deleteId) {
        items.splice(deleteId, 1);
        fs.writeFile(itemsInformations, JSON.stringify(items));
        console.log("delete success");
        res.status(200).json(items);
    } else {
        res.sendStatus(400);
    }
}

module.exports = app;