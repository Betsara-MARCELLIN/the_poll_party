const Player = require('./player.js');

module.exports = class Competitor extends Player {
    constructor(score,...args){
        super(...args);
        this.score = score;
    }
}