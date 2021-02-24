const Player = require('./player.js');

class Public  extends Player {
    constructor(...args){
        super(...args);
        this.score = 0;
    }
}

module.exports = Public;