import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:socket_io_client/socket_io_client.dart';
import 'package:the_poll_party_mobile/models/player.dart';
import 'package:the_poll_party_mobile/models/public.dart';

class SocketConnectionProvider extends ChangeNotifier {
  Socket socket;
  List<Public> publics = [];
  List<Competitor> competitors = [];
  List<String> questions = [];

  List<Public> get getPublics => publics;
  List<Competitor> get getCompetitors => competitors;
  List<String> get getQuestions => questions;

  String getCurrentQuestion() {
    return questions[0];
  }

  void nextQuestion() {
    if (questions.length > 0) questions.removeAt(0);
    notifyListeners();
  }

  void connectToServer(String roomId, String playerName) {
    try {
      // TODO change socket.io server when deploied
      // Configure socket transports must be sepecified
      socket = io('http://192.168.43.156:3000', <String, dynamic>{
        'transports': ['websocket'],
        'autoConnect': false,
      });

      // Connect to websocket
      socket.connect();

      // Handle socket events
      socket.on('connect', (_) {
        print('connect: ${socket.id}');
        socket.on('addQuestions', (_) => _handleQuestions(_));
        socket.on('partyConnections', (_) => _handleConnections(_));
        socket.on('ranking', (_) => _handleCompetitorRanking(_));
      });

      // Join room
      _enterRoom(roomId, playerName);
    } catch (e) {
      print(e.toString());
    }
  }

  void _enterRoom(String roomId, String playerName) {
    print("Joining: " + roomId);
    socket.emit("joinRoom", {'playerName': playerName, 'roomId': roomId});
  }

  void disconnect() {
    socket.disconnect();
  }

  // Send a Message to the server
  sendAnswer(String answer) {
    print(answer);
    socket.emit("responses", answer);
  }

  // Listen to all question events from public
  void _handleQuestions(List<dynamic> datas) {
    print("NEW QUESTION RECEIVED");
    print("Question length: ${questions.length}");
    datas.forEach(
        (element) => {this.questions.add(element['question'].toString())});
    notifyListeners();
  }

  // Listen to party connection events
  void _handleConnections(Map<String, dynamic> data) {
    print("CONNECTION DETECTED");
    print(data);
    competitors = (data['competitors'] as List)
        .map((e) => Competitor.fromJson(e))
        .toList();
    publics = (data['publics'] as List).map((e) => Public.fromJson(e)).toList();
    notifyListeners();
  }

  void _handleCompetitorRanking(Map<String, dynamic> data) {
    competitors =
        (data['ranking'] as List).map((e) => Competitor.fromJson(e)).toList();
    notifyListeners();
  }
}
