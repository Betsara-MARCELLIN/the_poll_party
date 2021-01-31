import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart';
import 'package:provider/provider.dart';
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
  Socket socket;
  String lastMessage = "";

  @override
  void initState() {
    super.initState();
    roomId = Provider.of<RoomProvider>(context, listen: false).getRoomId;
    connectToServer();
    enterRoom(roomId);
    print("Room: " + roomId);
  }

  void connectToServer() {
    try {
      // Configure socket transports must be sepecified
      socket = io('http://127.0.0.1:3000', <String, dynamic>{
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

  void enterRoom(String roomId) {
    print("Joining: " + roomId);
    socket.emit("joinRoom", roomId);
  }

  @override
  void dispose() {
    socket.disconnect();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("The poll party"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text("Last question: $lastMessage",
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
            Padding(
              padding: const EdgeInsets.all(15.0),
              child: TextField(
                controller: _answerController,
                autocorrect: false,
                decoration: InputDecoration(
                  hintText: 'Write your answer here',
                  filled: true,
                  fillColor: Color(0xFFDBEDFF),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.all(Radius.circular(10.0)),
                    borderSide: BorderSide(color: Colors.grey),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.all(Radius.circular(10.0)),
                    borderSide: BorderSide(color: Colors.grey),
                  ),
                ),
              ),
            ),
            RaisedButton(
                child: Text("send answer"),
                onPressed: () => {sendMessage(_answerController.text)})
          ],
        ),
      ),
    );
  }
}
