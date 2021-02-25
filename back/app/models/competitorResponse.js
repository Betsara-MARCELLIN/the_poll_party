module.exports = class CompetitorResponse {
    constructor(questionId, response, type, senderId, name, room) {
      this.questionId = questionId;
      this.response = response;
      this.type = type;
      this.senderId = senderId;
      this.name = name, 
      this.room = room;
      this.isWin = false;
      this.nbVote =0;
    }
  }
  