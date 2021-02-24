module.exports = class Party {
    constructor() {
        this.publics = [];
        this.competitors = [];
        this.questions = [];
        this.questionsVoting = [];
        this.competitorResponses = [];
    }

    getPublicsOfRoom(roomId) {
        return this.publics.filter((p) => p.room === roomId);
    }

    getCompetitorsOfRoom(roomId) {
        return this.competitors.filter((c) => c.room === roomId);
    }

    getRankedCompetitorsOfRoom(roomId) {
        return this.competitors
            .filter((c) => c.room === roomId)
            .sort((a, b) => a.score > b.score);
    }

    getRankedPublicsOfRoom(roomId) {
        return this.publics
            .filter((c) => c.room === roomId)
            .sort((a, b) => a.score > b.score);
    }

    getQuestionsOfRoom(roomId) {
        return this.questions.filter((q) => q.room === roomId);
    }
    getQuestionOfRoom(roomId, questionID) {
        return this.getQuestionsOfRoom(roomId).filter((q) => q.id === questionID);
    }
    getQuestionsforVotingOfRoom(roomId) {
        return this.questionsVoting.filter((q) => q.room === roomId);
    }
    getQuestionsforVotingByID(roomId, questionID) {
        return this.getQuestionsforVotingOfRoom(roomId).filter(
            (q) => q.id === questionID
        );
    }

    getCompetitorResponsesOfRoom(roomId) {
        return this.competitorResponses.filter(r => r.room === roomId);
    }

    getCompetitorResponsesOfRoomForQuestion(roomId, questionID) {
        return this.getCompetitorResponsesOfRoom(roomId).filter((q) => q.questionId === questionID);
    }
};
