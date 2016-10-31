var util = require('util');
var Player = require('./Player');

const FULL_BATTERY = 20;
const REVIVE_COUNT = 5;

function Human(id) {
    this.init(id, 'human');
    this.revive_progress = 0;
    this.revive_timer = null;
    this.battery_time = 0;
}

Human.prototype.getBatteryTime = function(){
    return this.battery_time;
}

Human.prototype.setBatteryTime = function(new_battery_time){
    this.battery_time = new_battery_time;
}

//revive player for 1 second
Human.prototype.increRevive = function(second) {
    //only who in dead or reviving status can be revived
    if(this.status != 'dead' && this.status != 'reviving')
        return;
    if(this.status == 'dead')
        this.changeStatus('reviving');

    if (!this.revive_timer) {
        var self = this;
        this.revive_timer = setTimeout(function() {
            self.revive_progress++;
            if (self.revive_progress >= REVIVE_COUNT) {
                self.revive();
            }
            self.revive_timer = null;
        }, second*1000);
    }
};

Human.prototype.getReviveCountLeft = function() {
    return REVIVE_COUNT - this.revive_progress;
}

Human.prototype.reset = function() {
    this.changeStatus('ready');
    this.revive_progress = 0;
};

Human.prototype.revive = function() {
    this.changeStatus('alive');
    this.revive_progress = 0;
}

Human.prototype.getInfo = function(){
    return {'id':this.id,'role':this.role,'status':this.status,'info':{
        'battery_time':this.battery_time}}
}

// Human.prototype.restoreBattery = function(){
//     this.battery = FULL_BATTERY;
// };

util.inherits(Human, Player);

module.exports = Human;
