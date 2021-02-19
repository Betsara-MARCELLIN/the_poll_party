import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:socket_io_client/socket_io_client.dart';
import 'package:the_poll_party_mobile/models/player.dart';
import 'package:the_poll_party_mobile/models/public.dart';
import 'package:the_poll_party_mobile/models/question.dart';

class SocketConnectionProvider extends ChangeNotifier {
  Socket socket;
  List<Public> publics = [];
  List<Competitor> competitors = [];
  List<Question> questions = [];

  List<Public> get getPublics => publics;
  List<Competitor> get getCompetitors => competitors;
  List<Question> get getQuestions => questions;

  Question getCurrentQuestion() {
    return questions.length > 0 ? questions[0] : null;
  }

  void nextQuestion() {
    if (questions.length > 0) questions.removeAt(0);
    notifyListeners();
  }

  void connectToServer(String roomId, String playerName) {
    try {
      if (socket != null) {
        if (socket.connected) {
          print("Was already connected. disconnection ...");
          socket.disconnect();
        }
      }

      // TODO change socket.io server when deploied
      // Configure socket transports must be sepecified
      socket = io('http://192.168.43.156:3000', <String, dynamic>{
        'transports': ['websocket'],
        'autoConnect': false,
      });

      // Connect to websocket
      socket.connect();
      print("connection ...");

      // Handle socket events
      socket.on('connect', (_) {
        print('connect: ${socket.id}');
      });

      socket.on('addQuestions', (_) => _handleQuestions(_));
      socket.on('partyConnections', (_) => _handleConnections(_));
      socket.on('ranking', (_) => _handleCompetitorRanking(_));

      // Join room
      _enterRoom(roomId, playerName);
    } catch (e) {
      print("CONNECTION ERROR !");
      print(e.toString());
    }
    notifyListeners();
  }

  void _enterRoom(String roomId, String playerName) {
    print("Joining: " + roomId);
    socket.emit("joinRoom", {'playerName': playerName, 'roomId': roomId});
  }

  void disconnect() {
    print("Socket current status: " + socket.connected.toString());
    socket.off('connect');
    socket.off('addQuestions');
    socket.off('partyConnections');
    socket.off('ranking');
    socket.disconnect();
    print("disconnection ...");
    notifyListeners();
  }

  // Send a Message to the server
  sendAnswer(String answer) {
    print(answer);
    socket.emit("responses", answer);
  }

  // Listen to all question events from public
  void _handleQuestions(List<dynamic> datas) {
    print("NEW QUESTION RECEIVED");
    print(datas);
    datas.forEach(
        (element) => {this.questions.add(new Question.fromJson(element))});
    print("Question length: ${questions.length}");

    notifyListeners();
  }

  // Listen to party connection events
  void _handleConnections(Map<String, dynamic> data) {
    print("CONNECTION DETECTED");
    print("Question length: " + questions.length.toString());
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
