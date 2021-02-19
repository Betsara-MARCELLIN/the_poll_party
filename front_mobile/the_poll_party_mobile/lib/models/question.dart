class Question {
  final String question;
  final String answer;
  final String type;
  final int timer;

  Question(this.question, this.answer, this.type, this.timer);

  Question.fromJson(Map<String, dynamic> json)
      : question = json['question'],
        answer = json['answer'],
        type = json['type'],
        timer = int.parse(json['timer'] ?? '30');

  Map<String, dynamic> toJson() =>
      {"question": question, "answer": answer, "type": type, "timer": timer};
}
