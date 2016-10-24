var game = require('./entities/Game');

function logic(){

};

logic.prototype.getPlayerObj = function(player_id){
    return game.getPlayer(player_id);
};

logic.prototype.validateBattery = function(battery_str){

};

logic.prototype.validateReset = function(){
    var game_status = game.getStatus();
    if (game_status == 'ready'){
        return true;
    } else {
        return false;
    }
};

logic.prototype.revive = function(player_id, player_revived){
    var being_revived_player = this.getPlayerObj(player_revived);
    if (!being_revived_player){
        throw Error('Cannot revive player '+player_revived+'. No such player');
    }
    if (being_revived_player.role != 'Human'){
        throw Error('the selected player '+being_revived_player+' is not human');
    }
    being_revived_player.increRevive();
};

logic.prototype.getGameStatus = function(){
    return game.getStatus();
};

logic.prototype.getPlayerStatistics = function(){
    var players = game.getPlayers();
    var ret = [];
    for (var ind in players){
        var player = players[ind];
        ret.push({'id':player.id,'role':player.role,'status':player.status});
    }
    return ret;
};

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

module.exports = new logic();