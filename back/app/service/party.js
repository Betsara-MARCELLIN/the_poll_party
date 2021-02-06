
module.exports = class Party {
    constructor() {
        this.publics = [];
        this.competitors = [];
        this.questions = [];
    }
    
    getPublicsOfRoom(roomId){
        return this.publics.filter(p => p.room === roomId);
    }

    getCompetitorsOfRoom(roomId){
        return this.competitors.filter(c => c.room === roomId);
    }

    getQuestionsOfRoom(roomId) {
        return this.questions.filter(q => q.room === roomId);
    }
}