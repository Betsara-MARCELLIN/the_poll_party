import 'package:flutter/widgets.dart';

class RoomProvider extends ChangeNotifier {
  String roomId;
  String playerName;

  String get getRoomId => roomId;

  String get getPlayerName => playerName;

  void enterRoom(String roomId, String playerName) {
    this.playerName = playerName;
    this.roomId = roomId;
    notifyListeners();
  }
}
