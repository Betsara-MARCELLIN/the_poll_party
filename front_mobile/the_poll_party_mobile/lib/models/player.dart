class Competitor {
  final String id;
  final String name;
  final String room;
  final int score;

  Competitor(this.id, this.name, this.room, this.score);

  Competitor.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        name = json['name'],
        room = json['room'],
        score = json['score'];

  Map<String, dynamic> toJson() =>
      {"id": id, "name": name, "room": room, "score": score};
}
