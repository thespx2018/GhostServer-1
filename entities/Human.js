var util = require('util');
var Player = require('./Player');

const FULL_BATTERY = 20;
const REVIVE_COUNT = 10;

function Human(id){
    this.init(id,'human');
    this.revive_progress = 0;
    // this.battery = FULL_BATTERY;
}

Human.prototype.increRevive = function(){
    this.changeStatus('reviving');
    this.revive_progress++;
    if (revive_progress >= REVIVE_COUNT){
        this.changeStatus('alive');
    }
};

Human.prototype.reset = function(){
    this.changeStatus('ready');
    this.revive_progress = 0;
};

// Human.prototype.restoreBattery = function(){
//     this.battery = FULL_BATTERY;
// };

util.inherits(Human,Player);

module.exports = Human;