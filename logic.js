var game = require('./entities/Game');

function logic(){

};

logic.prototype.getPlayerObj = function(player_id){
    return game.getPlayer(player_id);
};

logic.prototype.useBattery = function(battery_id){
    try{
        return game.useBattery(battery_id);
    } catch(err){
        return null;
    }
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
        ret.push(player.getInfo());
    }
    return ret;
};

logic.prototype.getBatteryStat = function(){
    var batteries = game.getBatteries();
    var ret = [];
    for (var ind in batteries){
        var battery = batteries[ind];
        ret.push({'id':battery.id,'available':battery.available});
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

logic.prototype.togglePlayerDead = function(player_id){
    game.adminToggleDead(player_id);
};

logic.prototype.hitGhost = function(player_id){
    var player = this.getPlayerObj(player_id);
    if (player.role == 'ghost'){
        player.deductHp();
    }
};

logic.prototype.getSettings = function(){
    return game.getSettings();
};

module.exports = new logic();