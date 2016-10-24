var util = require('util');
var Player = require('./Player');

function Ghost(id){
    this.init(id,'ghost');
}

Ghost.prototype.reset = function(){
    this.changeStatus('ready');
};

util.inherits(Ghost,Player);

module.exports = Ghost;