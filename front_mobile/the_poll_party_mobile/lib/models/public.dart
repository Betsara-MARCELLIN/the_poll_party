class Public {
  final String id;
  final String name;
  final String room;

  Public(this.id, this.name, this.room);

  Public.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        name = json['name'],
        room = json['room'];

  Map<String, dynamic> toJson() => {"id": id, "name": name, "room": room};
}
