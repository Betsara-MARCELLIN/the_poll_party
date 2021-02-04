const Player = require('./player.js');

class Public  extends Player {
    constructor(...args){
        super(...args);
    }
}

module.exports = Public;