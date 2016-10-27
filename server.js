var express = require('express');
var logic = require('./logic');
var path = require('path');
var app = express();
var logic = require('./logic');
var logger = require('morgan');

var port = 3000;

function InitServer() {
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, 'public')));
    // app.use(logger('dev'));

    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, 'public/interface.html'));
    });

    app.get('/client/status', function(req, res) {
        var player_id = req.query.player_id;
        var player = logic.getPlayerObj(player_id);
        if (player)
            res.send(player.getStatus());
        else
            res.send("Error");
    });

    app.get('/client/battery', function(req, res) {
        var battery_id = req.query.battery_id;
        try {
            var is_used = logic.useBattery(battery_id);
            if (is_used) {
                res.send('OK');
            } else {
                res.send('FAIL');
            }
        } catch (err) {
            res.send("Error");
        }
    });

    app.get('/client/revive', function(req, res) {
        var player_id = req.query.player_id;
        try {
            var time_left = logic.revive(player_id);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ 'time_left': time_left }));
        } catch (err) {
            res.send("Error");
        }
    });

    app.get('/admin', function(req, res) {
        var playerStat = logic.getPlayerStat();
        var gameStatus = logic.getGameStatus();
        var batteryStat = logic.getBatteryStat();
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ 'player': playerStat, 'game': gameStatus, 'battery': batteryStat }));
    });

    app.get('/admin/reset', function(req, res) {
        var result = logic.reset();
        if (result)
            res.send("OK");
        else
            res.send("FAIL");
    });

    app.get('/admin/start', function(req, res) {
        var result = logic.start();
        if (result)
            res.send("OK");
        else
            res.send("FAIL");
    });

    app.get('/admin/toggleDead', function(req, res) {
        var player_id = req.query.player_id;
        logic.togglePlayerDead(player_id);
        res.send("OK");
    });

    app.listen(port, function() {
        console.log('Web Server is running at ' + port);
    });
}

InitServer();
