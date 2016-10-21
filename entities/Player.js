var ALL_STATUS = ['ready','alive','dead','reviving'];

function Player(id,role){
    this.init(id,role);
}

Player.prototype.init = function(id,role){
    this.role = role;
    this.id = id;
    this.status = 'ready';
};

Player.prototype.getStatus = function(){return this.status};

Player.prototype.changeStatus = function(status){
    if (ALL_STATUS.indexOf(status)<0){
        throw Error("No player status named "+status);
    } else {
        this.status = status;
    }
};

module.exports = Player;