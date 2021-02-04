const Player = require('./player.js');

module.exports = class Competitor extends Player {
    constructor(...args){
        super(...args);
        this.score = 0;
    }
}