var util = require('util');
var Player = require('./Player');

function Ghost(id){
    this.init(id,'ghost');
}

util.inherits(Ghost,Player);

module.exports = Ghost;