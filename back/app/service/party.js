module.exports = class Party {
    constructor() {
        this.publics = [];
        this.competitors = [];
        this.questions = [];
        this.questionsVoting = [];
        this.competitorResponses = [];
        this.orderVoteCounter = 0;
        this.responseVoteCounter= 0;
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
            .sort((a, b) => b.score - a.score);
    }

    getRankedPublicsOfRoom(roomId) {
        return this.publics
            .filter((p) => p.room === roomId)
            .sort((a, b) => b.score - a.score);
    }

    getQuestionsOfRoom(roomId) {
        return this.questions.filter((q) => q.room === roomId);
    }
    getQuestionOfRoom(roomId, questionID) {
        return this.getQuestionsOfRoom(roomId).filter((q) => q.id === questionID);
    }
    getQuestionOfRoomSortByVote(roomId){
            return this.questions
                .filter((r) => r.room === roomId)
                .sort((a, b) => b.nbVoteOrder - a.nbVoteOrder );
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
    getCompetitorResponsesOfRoomForQuestionSortedByScore(roomId, questionID) {
        return this.getCompetitorResponsesOfRoomForQuestion(roomId, questionID).sort((a, b) => b.nbVote - a.nbVote );
    }
    getCompetitorResponsesOfRoomForQuestionForCompitor(roomId, questionID, senderId) {
        return this.getCompetitorResponsesOfRoomForQuestion(roomId, questionID).filter((q) => q.senderId === senderId);
    }


    getOrderVoteCounter() {
        return this.orderVoteCounter;
    }
    setOrderVoteCounter(vote){
        this.orderVoteCounter = vote;
    }
    setResponseVoteCounter(vote){
        this.responseVoteCounter = vote;
    }
};
