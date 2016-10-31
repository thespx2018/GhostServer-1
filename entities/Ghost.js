var util = require('util');
var Player = require('./Player');

var DEFAULT_HP = 5;

function Ghost(id) {
    this.init(id, 'ghost');
    this.hp = DEFAULT_HP;
}

Ghost.prototype.reset = function() {
    this.changeStatus('ready');
    this.hp = DEFAULT_HP;
};

Ghost.prototype.deductHp = function() {
    if (this.hp > 0) {
        this.hp--;
        if (this.hp <= 0)
            this.changeStatus('dead');
    }
}

Ghost.prototype.getHp = function() {
    return this.hp;
}

Ghost.prototype.getInfo = function() {
    return { 'id': this.id, 'role': this.role, 'status': this.status, 'info': { 'hp': this.hp } };
}

util.inherits(Ghost, Player);

module.exports = Ghost;
