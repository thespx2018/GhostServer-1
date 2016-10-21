var express = require('express');
var logic = require('./logic');
var engine = require('ejs-locals');
var path = require('path');
var app = express();
var logic = require('./logic');

var port = 3000;

function InitServer() {
    app.engine('ejs', engine);

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', function(req,res){
        
    });

    app.get('/client/status', function(req, res) {
        var player_id = req.query.player_id;
        var player = logic.getPlayerObj(player_id);
        res.send(player.getStatus);
    });

    app.get('/client/reset', function(req, res){
        var ret = logic.validateReset();
        if (ret == true){
            res.send('OK');
        } else {
            res.send('NO');
        }
    });

    app.get('/client/battery', function(req, res){
        res.send('OK');
    });

    app.get('/client/revive', function(req, res){
        var player_id = req.query.player_id;
        var player_revived = req.query.revived;
        logic.revive(player_id,player_revived);
        res.send('OK');
    });

    app.get('/admin/reset', function(req, res){

    });

    app.listen(port, function() {
        console.log('Web Server is running at ' + port);
    });
}

InitServer();