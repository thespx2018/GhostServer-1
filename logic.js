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
        throw Error('the selected player '+being_revived_player+ ' is not human');
    }
    being_revived_player.increRevive();
};

module.exports = new logic();