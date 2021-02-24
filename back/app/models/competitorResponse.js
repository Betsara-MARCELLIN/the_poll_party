module.exports = class CompetitorResponse {
    constructor(questionId, response, type, senderId, room) {
      this.questionId = questionId;
      this.response = response;
      this.type = type;
      this.senderId = senderId;
      this.room = room;
    }
  }
  