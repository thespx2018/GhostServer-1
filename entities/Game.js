var Human = require('./Human');
var Ghost = require('./Ghost');
var Battery = require('./Battery');
var _ = require('underscore');

var ALL_STATUS = ['playing','standby'];

//debug parameters
var HUMAN_NUM = 4;
var GHOST_NUM = 1;
var BATTERY_NUM = 5;

function Game(human_num,ghost_num,battery_num){
    this.status = 'standby';
    this.players = [];

    this.batteries = [];
    this.init(human_num,ghost_num,battery_num);
}

Game.prototype.init = function(human_num,ghost_num,battery_num){
    // initialize players
    var temp_id = 1;
    for(var i=0;i<human_num;i++){
        this.players.push(new Human(temp_id));
        temp_id++;
    }

    for(var i=0;i<ghost_num;i++){
        this.players.push(new Ghost(temp_id));
        temp_id++;
    }
    // initialize batteries
    for(var i=0;i<battery_num;i++){
        this.batteries.push(new Battery(i));
    }
};

Game.prototype.getPlayer = function(id){
    return _.find(this.players,function(ele){return ele.id == id});
};

Game.prototype.getBattery = function(id){
    return _.find(this.batteries,function(ele){return ele.id == id});
};

Game.prototype.getPlayers = function(){
    return this.players;
};

Game.prototype.getBatteries = function(){
    return this.batteries;
};

Game.prototype.getStatus = function(){return this.status};

Game.prototype.changeStatus = function(status){
    if (ALL_STATUS.indexOf(status)<0){
        throw Error("No game status named "+status);
    } else {
        this.status = status;
    }
};

Game.prototype.reset = function(){
    this.changeStatus('standby');
    for (var ind in this.players){
        var player = this.players[ind];
        player.reset();
    }
    for (var ind in this.batteries){
        var battery = this.batteries[ind];
        battery.reset();
    }
    return true;
};

Game.prototype.start = function(){
    for (var ind in this.players){
        var player = this.players[ind];
        if (player.getStatus()!='ready')
            return false;
        player.startGame();
    }
    this.changeStatus('playing');
    return true;
};

Game.prototype.playerDie = function(player_id){
    var player = this.getPlayer(player_id);
    player.die();
};

Game.prototype.useBattery = function(battery_id){
    var battery = this.getBattery(battery_id);
    return battery.use();
};

module.exports = new Game(HUMAN_NUM,GHOST_NUM,BATTERY_NUM);