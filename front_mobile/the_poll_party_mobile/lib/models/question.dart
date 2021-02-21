class Question {
  final String question;
  final String answer;
  final String type;
  final int timer;
  final int id;

  Question(this.question, this.answer, this.type, this.timer, this.id);

  Question.fromJson(Map<String, dynamic> json)
      : question = json['question'],
        answer = json['answer'],
        type = json['type'],
        timer = int.parse(_isNumeric(json['timer']) ? json['timer'] : '30'),
        id = json['id'];

  Map<String, dynamic> toJson() => {
        "question": question,
        "answer": answer,
        "type": type,
        "timer": timer,
        "id": id
      };
}

bool _isNumeric(String s) {
  if (s == null) {
    return false;
  }
  return double.parse(s, (e) => null) != null;
}
