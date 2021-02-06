module.exports = class Question {
    constructor(question, answer, type, timer, senderId, room) {
        this.question = question;
        this.answer = answer;
      this.type = type;
      this.timer = timer;
      this.senderId = senderId;
      this.room = room;
    }
}
