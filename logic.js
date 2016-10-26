var game = require('./entities/Game');

function logic(){

};

logic.prototype.getPlayerObj = function(player_id){
    return game.getPlayer(player_id);
};

logic.prototype.useBattery = function(battery_id){
    return game.useBattery(battery_id);
};

logic.prototype.revive = function(player_revived){
    var time_left = game.revive(player_revived);
    return time_left;
};

logic.prototype.getGameStatus = function(){
    return game.getStatus();
};

logic.prototype.getPlayerStat = function(){
    var players = game.getPlayers();
    var ret = [];
    for (var ind in players){
        var player = players[ind];
        ret.push({'id':player.id,'role':player.role,'status':player.status});
    }
    return ret;
};

logic.prototype.getBatteryStat = function(){
    var batteries = game.getBatteries();
    var ret = [];
    for (var ind in batteries){
        var battery = batteries[ind];
        ret.push({'id':battery.id,'used':battery.used});
    }
    return ret;
}

logic.prototype.reset = function(){
    return game.reset();
};

logic.prototype.start = function(){
    var res = game.start();
    if (res)
        return true;
    else
        return false;
};

logic.prototype.playerDie = function(player_id){
    game.playerDie(player_id);
};

module.exports = new logic();