import 'dart:async';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sensors/sensors.dart';
import 'package:the_poll_party_mobile/components/myIconButton.dart';
import 'package:the_poll_party_mobile/providers/socketConnectionProvider.dart';
import 'package:the_poll_party_mobile/styles/Colors.dart';

class MotionAnswerMode extends StatefulWidget {
  const MotionAnswerMode({
    Key key,
    @required this.socketProvider,
    @required this.timerCallback,
  }) : super(key: key);

  final SocketConnectionProvider socketProvider;
  final VoidCallback timerCallback;
  final int maxCursorValue = 100;

  @override
  _MotionAnswerModeState createState() => _MotionAnswerModeState();
}

class _MotionAnswerModeState extends State<MotionAnswerMode> {
  int cursorValue = 0;

  StreamSubscription<UserAccelerometerEvent> accel;

  @override
  void initState() {
    super.initState();
    accel = userAccelerometerEvents.listen((UserAccelerometerEvent event) {
      if (event.x > 2 || event.y > 2 || event.z > 2) {
        setState(() {
          if (cursorValue < widget.maxCursorValue) cursorValue++;
        });
      }
    });
  }

  @override
  void dispose() {
    accel.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(20.0),
          child: Text(
              'Question: ${widget.socketProvider.getCurrentQuestion().question}',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
        ),
        SizedBox(
          height: MediaQuery.of(context).size.height * 0.5,
          width: 100,
          child: RotatedBox(
            quarterTurns: -1,
            child: LinearProgressIndicator(
              value: cursorValue / widget.maxCursorValue,
            ),
          ),
        ),
        Text("$cursorValue",
            style: TextStyle(
                fontSize: 30,
                fontWeight: FontWeight.bold,
                color: Theme.of(context).primaryColor)),
        Padding(
          padding: const EdgeInsets.all(20.0),
          child: MyIconButton(
              callback: () => {
                    Provider.of<SocketConnectionProvider>(context,
                            listen: false)
                        .sendAnswer(cursorValue.toString()),
                    Provider.of<SocketConnectionProvider>(context,
                            listen: false)
                        .nextQuestion(),
                    widget.timerCallback()
                  },
              text: 'Envoyer ma réponse',
              icon: Icons.check),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Text(
            "Secouez votre smartphone pour augmenter la valeur",
            style: TextStyle(fontStyle: FontStyle.italic, color: lightBlack),
            textAlign: TextAlign.center,
          ),
        ),
      ],
    );
  }
}
