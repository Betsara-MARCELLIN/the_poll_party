module.exports = class Question {
    constructor(question, answer, type, timer, senderId) {
        this.question = question;
        this.answer = answer;
      this.type = type;
      this.timer = timer;
      this.senderId = senderId;
    }
}
