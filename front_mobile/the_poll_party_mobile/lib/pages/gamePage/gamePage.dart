import 'dart:async';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:the_poll_party_mobile/components/myIconButton.dart';
import 'package:the_poll_party_mobile/pages/gamePage/components/motionAnswerMode.dart';
import 'package:the_poll_party_mobile/pages/gamePage/components/photoAnswerMode.dart';
import 'package:the_poll_party_mobile/pages/gamePage/components/textAnswerMode.dart';
import 'package:the_poll_party_mobile/providers/roomProvider.dart';
import 'package:the_poll_party_mobile/providers/socketConnectionProvider.dart';
import 'package:the_poll_party_mobile/styles/Colors.dart';
import 'package:the_poll_party_mobile/styles/Shapes.dart';

class GamePage extends StatefulWidget {
  GamePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _GamePageState createState() => _GamePageState();
}

class _GamePageState extends State<GamePage> {
  TextEditingController _answerController = TextEditingController();
  String roomId;
  String playerName;
  int remainingTime;
  Timer _timer;

  @override
  void initState() {
    super.initState();
    roomId = Provider.of<RoomProvider>(context, listen: false).getRoomId;
    playerName =
        Provider.of<RoomProvider>(context, listen: false).getPlayerName;
    var socketProvider =
        Provider.of<SocketConnectionProvider>(context, listen: false);
    if (socketProvider.getCurrentQuestion() != null) {
      _startTimer();
    }
  }

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }

  void _startTimer() {
    var socketProvider =
        Provider.of<SocketConnectionProvider>(context, listen: false);
    if (socketProvider.getQuestions.isNotEmpty) {
      remainingTime = socketProvider.getCurrentQuestion().timer;

      if (_timer != null) {
        _timer.cancel();
      }

      _timer = Timer.periodic(Duration(seconds: 1), (timer) {
        setState(() {
          if (remainingTime > 0) {
            remainingTime--;
          } else {
            _timer.cancel();
            if (socketProvider.getQuestions.length > 0) {
              Provider.of<SocketConnectionProvider>(context, listen: false)
                  .nextQuestion();
              _startTimer();
            }
          }
        });
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    var socketProvider =
        Provider.of<SocketConnectionProvider>(context, listen: true);
    return Scaffold(
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Visibility(
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Container(
                    child: Text(
                      "$remainingTime",
                      style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: normalTextSize),
                    ),
                    decoration: BoxDecoration(
                        color: Colors.amber, borderRadius: roundedBorder),
                    padding: EdgeInsets.all(10),
                  ),
                ),
                visible: socketProvider.getQuestions.length > 0),
            Spacer(),
            socketProvider.getQuestions.length > 0
                ? Container(
                    child: buildAnswerMode(
                        socketProvider.getCurrentQuestion().type,
                        socketProvider))
                : EndOfQuestions(),
            // PhotoAnswerMode(),
            Spacer(),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [Text("salle: $roomId"), Text("joueur: $playerName")],
              ),
            )
          ],
        ),
      ),
    );
  }

  buildAnswerMode(String type, var socketProvider) {
    switch (type) {
      case 'Libre':
        return TextAnswerMode(
          socketProvider: socketProvider,
          answerController: _answerController,
          timerCallback: _startTimer,
        );
      case 'Slider':
        return MotionAnswerMode(
          socketProvider: socketProvider,
          timerCallback: _startTimer,
        );
      case 'Photo':
        return PhotoAnswerMode(
          socketProvider: socketProvider,
          timerCallback: _startTimer,
        );
    }
  }
}

class EndOfQuestions extends StatelessWidget {
  const EndOfQuestions({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          Text("Vous n'avez pas de nouvelles questions",
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
          Padding(
            padding: const EdgeInsets.all(30.0),
            child: MyIconButton(
                callback: () => Navigator.pushNamed(context, '/ranking'),
                text: 'Voir classement',
                icon: Icons.emoji_events),
          )
        ],
      ),
    );
  }
}
