import 'package:flutter/material.dart';
import 'package:the_poll_party_mobile/providers/roomProvider.dart';
import 'package:provider/provider.dart';

class RoomPage extends StatefulWidget {
  RoomPage({Key key}) : super(key: key);

  @override
  _RoomPageState createState() => _RoomPageState();
}

class _RoomPageState extends State<RoomPage> {
  TextEditingController _roomController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(15.0),
              child: TextField(
                controller: _roomController,
                autocorrect: false,
                decoration: InputDecoration(
                  hintText: 'Room name',
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
                child: Text("Enter room"),
                onPressed: () {
                  print(_roomController.text);
                  context.read<RoomProvider>().enterRoom(_roomController.text);
                  Navigator.pushNamed(context, '/game');
                })
          ],
        ),
      ),
    );
  }
}
