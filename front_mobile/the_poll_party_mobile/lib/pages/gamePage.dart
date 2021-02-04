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
      socket = io('http://192.168.43.156:3000', <String, dynamic>{
        'transports': ['websocket'],
        'autoConnect': false,
      });

      // Connect to websocket
      socket.connect();

      // Handle socket events
      socket.on('connect', (_) {
        print('connect: ${socket.id}');
        socket.on('newMessage', (_) => handleMessage(_));
      });
    } catch (e) {
      print(e.toString());
    }
  }

  // Send a Message to the server
  sendMessage(String message) {
    print(message);
    socket.emit(
      "newMessage",
      {
        "senderId": socket.id,
        "body": message, // Message to be sent
      },
    );
  }

  // Listen to all message events from connected users
  void handleMessage(Map<String, dynamic> data) {
    print(data['body']);
    setState(() {
      lastMessage = data['body'].toString();
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
          Text("Question: $lastMessage",
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
                callback: () => {sendMessage(_answerController.text)},
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
