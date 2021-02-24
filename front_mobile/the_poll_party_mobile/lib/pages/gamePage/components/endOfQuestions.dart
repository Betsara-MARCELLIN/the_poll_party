import 'package:flutter/material.dart';
import 'package:the_poll_party_mobile/components/myIconButton.dart';

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
