class Question {
  final String question;
  final String answer;
  final String type;
  final int timer;

  Question(this.question, this.answer, this.type, this.timer);

  Question.fromJson(Map<String, dynamic> json)
      : question = json['question'],
        answer = json['anwser'],
        type = json['type'],
        timer = json['timer'];

  Map<String, dynamic> toJson() =>
      {"question": question, "anwser": answer, "type": type, "timer": timer};
}
