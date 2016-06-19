var express = require('express');
var app = express();
var fs = require('fs');

var insertItem = require('./insertItem');
var deleteItem = require('./deleteItem');
var updateItem = require('./updateItem');
var getOneItem = require('./getOneItem');
var getAllItem = require('./getAllItems');


var itemsInformations = './items.json';
fs.exists(itemsInformations, function (exists) {
    if (!exists) {
        var creatFile = fs.creatWriteAStream(itemsInformations, {encoding: utf8});
        if (!creatFile) {
            console.log("error!");
        }

        fs.writeFile(itemsInformations, 'utf-8', JSON.stringify([{"count": 0}]));
    }
});


app.use('/items', insertItem);
app.use('/items', deleteItem);
app.use('/items', updateItem);
app.use('/items', getOneItem);
app.use('/items', getAllItem);

var server = app.listen(3000, function () {
    console.log("server start:");
});


module.exports = app;
