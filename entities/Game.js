var Human = require('./Human');
var Ghost = require('./Ghost');
var Batteries = require('./Battery');
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
    this.init(human_num,ghost_num,batteries_num);
}

Game.prototype.init = function(human_num,ghost_num,battery_num){
    // initialize players
    var temp_id = 1;
    for(var i=0;i<human_num;i++){
        this.players.push(Human(temp_id));
        temp_id++;
    }

    for(var i=0;i<ghost_num;i++){
        this.players.push(Ghost(temp_id));
        temp_id++;
    }
    // initialize batteries
    for(var i=0;i<batteries_num;i++){
        this.batteries.push(Battery(i));
    }
};

Game.prototype.getPlayer = function(id){
    return _.find(this.players,function(ele){return ele.id == id});
};

Game.prototype.getStatus = function(){return this.status};

Game.prototype.changeStatus = function(status){
    if (ALL_STATUS.indexOf(status)<0){
        throw Error("No game status named "+status);
    } else {
        this.status = status;
    }
};

module.exports = new Game(HUMAN_NUM,GHOST_NUM,BATTERY_NUM);