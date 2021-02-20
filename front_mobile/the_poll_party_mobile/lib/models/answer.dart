class Answer {
  int questionId;
  String answer;

  Answer(this.questionId, this.answer);

  Answer.fromJson(Map<String, dynamic> json)
      : questionId = json['questionId'],
        answer = json['answer'];

  Map<String, dynamic> toJson() => {"questionId": questionId, "answer": answer};
}
