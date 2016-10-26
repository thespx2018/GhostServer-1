function Battery(id){
    this.id = id;
    this.used = false;
}

Battery.prototype.use = function(){
    var ret = null;
    if (this.used == false){
        ret = true;
    } else {
        ret = false;
    }
    this.used = true;
    return ret;
};

Battery.prototype.reset = function(){
    this.used = false;
};


module.exports = Battery;