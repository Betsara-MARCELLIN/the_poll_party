import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:the_poll_party_mobile/components/myIconButton.dart';
import 'package:the_poll_party_mobile/components/myTextField.dart';
import 'package:the_poll_party_mobile/providers/roomProvider.dart';
import 'package:the_poll_party_mobile/providers/socketConnectionProvider.dart';

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

  String lastQuestion = "";

  @override
  void initState() {
    super.initState();
    roomId = Provider.of<RoomProvider>(context, listen: false).getRoomId;
    playerName =
        Provider.of<RoomProvider>(context, listen: false).getPlayerName;
  }

  @override
  void dispose() {
    // socket.disconnect();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Spacer(),
          Text("Question: $lastQuestion",
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
          Padding(
            padding: const EdgeInsets.all(15.0),
            child: MyTextField(
                textController: _answerController,
                hintText: 'veuillez écrire votre réponse ici'),
          ),
          Padding(
            padding: const EdgeInsets.all(50.0),
            child: MyIconButton(
                callback: () => {
                      Provider.of<SocketConnectionProvider>(context,
                              listen: false)
                          .sendAnswer(_answerController.text)
                    },
                text: 'Envoyer ma réponse',
                icon: Icons.check),
          ),
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
    );
  }
}
