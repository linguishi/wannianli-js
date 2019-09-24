var express = require('express');
var parseData = require('./date-parser.js');
var app = express();

app.get('/', function (req, res) {
    res.send('日期服务');
})

app.get('/getDateInfo', function (req, res) {
    var y = req.query.year;
    var m = req.query.month;
    var d = req.query.date;
    if (y && m && d) {
        res.json(parseData(parseInt(y), parseInt(m - 1), parseInt(d)))
    } else {
        var now = new Date();
        response = parseData(now.getFullYear(), now.getMonth(), now.getDate());
        res.json(response);
    }
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
