module.exports = class Question {
  constructor(id, question, answer, type, timer, senderId, room) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.type = type;
    this.timer = timer;
    this.senderId = senderId;
    this.room = room;
    this.yes = 0;
    this.no = 0;
    this.neutral = 0;
  }
}
