var util = require('util');
var Player = require('./Player');

const FULL_BATTERY = 20;
const REVIVE_COUNT = 10;

function Human(id) {
    this.init(id, 'human');
    this.revive_progress = 0;
    this.revive_timer = null;
    // this.battery = FULL_BATTERY;
}

//revive player for 1 second
Human.prototype.increRevive = function(second) {
    this.changeStatus('reviving');
    if (!this.revive_timer) {
        var self = this;
        this.revive_timer = setTimeout(function() {
            self.revive_progress++;
            self.revive_timer = null;
            if (revive_progress >= REVIVE_COUNT) {
                this.changeStatus('alive');
            }
        }, second*1000);
    };
};

Human.prototype.getReviveCountLeft = function() {
    return REVIVE_COUNT - this.revive_progress;
}

Human.prototype.reset = function() {
    this.changeStatus('ready');
    this.revive_progress = 0;
};

// Human.prototype.restoreBattery = function(){
//     this.battery = FULL_BATTERY;
// };

util.inherits(Human, Player);

module.exports = Human;
