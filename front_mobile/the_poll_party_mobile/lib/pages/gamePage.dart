import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart';
import 'package:provider/provider.dart';
import 'package:the_poll_party_mobile/components/myIconButton.dart';
import 'package:the_poll_party_mobile/components/myTextField.dart';
import 'package:the_poll_party_mobile/providers/roomProvider.dart';

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
  Socket socket;
  String lastMessage = "";
  String lastQuestion = "";

  @override
  void initState() {
    super.initState();
    roomId = Provider.of<RoomProvider>(context, listen: false).getRoomId;
    playerName =
        Provider.of<RoomProvider>(context, listen: false).getPlayerName;
    connectToServer();
    enterRoom(roomId, playerName);
    print("Room: " + roomId);
  }

  void connectToServer() {
    try {
      // Configure socket transports must be sepecified
      socket = io('http://localhost:3000', <String, dynamic>{
        'transports': ['websocket'],
        'autoConnect': false,
      });

      // Connect to websocket
      socket.connect();

      // Handle socket events
      socket.on('connect', (_) {
        print('connect: ${socket.id}');
        socket.on('addQuestions', (_) => handleQuestion(_));
      });
    } catch (e) {
      print(e.toString());
    }
  }

  // Send a Message to the server
  sendAnswer(String answer) {
    print(answer);
    socket.emit("responses", answer);
  }

  // Listen to all question events from public
  void handleQuestion(Map<String, dynamic> data) {
    print(data['question']);
    setState(() {
      lastQuestion = data['question'].toString();
    });
  }

  void enterRoom(String roomId, String playerName) {
    print("Joining: " + roomId);
    socket.emit("joinRoom", {'playerName': playerName, 'roomId': roomId});
  }

  @override
  void dispose() {
    socket.disconnect();
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
                callback: () => {sendAnswer(_answerController.text)},
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
