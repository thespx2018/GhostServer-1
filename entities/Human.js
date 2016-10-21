var util = require('util');
var Player = require('./Player');

const FULL_BATTERY = 20;

function Human(id){
    this.init(id,'human');
    this.revive_progress = 0;
    // this.battery = FULL_BATTERY;
}

Human.prototype.increRevive = function(){
    this.changeStatus('reviving');
    this.revive_progress++;
    if (revive_progress >= 10){
        this.changeStatus('alive');
    }
};

// Human.prototype.restoreBattery = function(){
//     this.battery = FULL_BATTERY;
// };

util.inherits(Human,Player);

module.exports = Human;