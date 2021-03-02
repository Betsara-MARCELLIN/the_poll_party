import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:the_poll_party_mobile/components/myIconButton.dart';

class EndOfQuestions extends StatefulWidget {
  final VoidCallback startTimerCallBack;
  EndOfQuestions({Key key, @required this.startTimerCallBack})
      : super(key: key);

  @override
  _EndOfQuestionsState createState() => _EndOfQuestionsState();
}

class _EndOfQuestionsState extends State<EndOfQuestions> {
  @override
  void dispose() {
    widget.startTimerCallBack();
    super.dispose();
  }

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
