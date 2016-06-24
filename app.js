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
        if (!fs.createWriteStream(itemsInformations, {encoding: "utf8"})) {
            console.log('error error');
        }

        fs.writeFile(itemsInformations, JSON.stringify([{"count":0}]));
    }
});

app.use('/items', insertItem);
app.use('/items', deleteItem);
app.use('/items', updateItem);
app.use('/items', getOneItem);
app.use('/items', getAllItem);

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log("server start with "+port);
});


module.exports = app;
