
module.exports = class Party {
    constructor() {
        this.publics = [];
        this.competitors = [];
        this.questions = [];
        this.questionsVoting = [];
    }
    
    
    getPublicsOfRoom(roomId){
        return this.publics.filter(p => p.room === roomId);
    }

    getCompetitorsOfRoom(roomId){
        return this.competitors.filter(c => c.room === roomId);
    }

    getRankedCompetitorsOfRoom(roomId) {
        return this.competitors.filter(c => c.room === roomId).sort((a, b) => a.score.localeCompare(b.score));
    }

    getQuestionsOfRoom(roomId) {
        return this.questions.filter(q => q.room === roomId);
    }
    getQuestionsforVotingOfRoom(roomId) {
        return this.questionsVoting.filter(q => q.room === roomId);
    }
    getQuestionsforVotingByID(roomId, questionID) {
        return this.getQuestionsforVotingOfRoom(roomId).filter(q => q.id === questionID);
    }
}