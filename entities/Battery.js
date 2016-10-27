function Battery(id){
    this.id = id;
    this.available = true;
}

Battery.prototype.use = function(){
    var ret = null;
    if (this.available == true){
        ret = true;
    } else {
        ret = false;
    }
    this.available = false;
    return ret;
};

Battery.prototype.reset = function(){
    this.available = true;
};


module.exports = Battery;