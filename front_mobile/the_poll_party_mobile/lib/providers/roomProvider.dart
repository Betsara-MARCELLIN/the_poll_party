import 'package:flutter/widgets.dart';

class RoomProvider extends ChangeNotifier {
  String roomId;

  String get getRoomId => roomId;

  void enterRoom(String roomId) {
    this.roomId = roomId;
    notifyListeners();
  }
}
