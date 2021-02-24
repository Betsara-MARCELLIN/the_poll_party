class Response {
  int questionId;
  String response;
  String type;

  Response(this.questionId, this.response, this.type);

  Response.fromJson(Map<String, dynamic> json)
      : questionId = json['questionId'],
        response = json['response'],
        type = json['type'];

  Map<String, dynamic> toJson() => {
        "questionId": questionId,
        "response": response,
        "type": type,
      };
}
