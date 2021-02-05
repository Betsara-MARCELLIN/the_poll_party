import 'package:flutter/material.dart';
import 'package:the_poll_party_mobile/components/myIconButton.dart';
import 'package:the_poll_party_mobile/components/myTextField.dart';
import 'package:the_poll_party_mobile/providers/roomProvider.dart';
import 'package:provider/provider.dart';
import 'package:the_poll_party_mobile/styles/Colors.dart';
import 'package:the_poll_party_mobile/styles/Shapes.dart';

class RoomPage extends StatefulWidget {
  RoomPage({Key key}) : super(key: key);

  @override
  _RoomPageState createState() => _RoomPageState();
}

class _RoomPageState extends State<RoomPage> {
  TextEditingController _roomController = TextEditingController();
  TextEditingController _nameController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          children: [
            Spacer(),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                "The Poll Party.",
                style: TextStyle(
                  fontSize: 55,
                  fontWeight: FontWeight.bold,
                  color: lightBlack,
                  shadows: [
                    Shadow(
                      blurRadius: 2.0,
                      color: lightBlack,
                      offset: Offset(0.5, 0.5),
                    ),
                  ],
                ),
              ),
            ),
            Spacer(),
            Text(
              "Pseudo",
              style: TextStyle(
                  fontSize: normalTextSize, fontWeight: FontWeight.bold),
            ),
            Padding(
                padding: const EdgeInsets.all(15.0),
                child: MyTextField(
                  textController: _nameController,
                  hintText: 'ex: Bob ...',
                )),
            Padding(
              padding: const EdgeInsets.only(top: 20),
              child: Text('Salle',
                  style: TextStyle(
                      fontSize: normalTextSize, fontWeight: FontWeight.bold)),
            ),
            Padding(
              padding: const EdgeInsets.all(15.0),
              child: MyTextField(
                  textController: _roomController,
                  hintText: 'demandez à votre maitre de jeu ...'),
            ),
            Spacer(),
            MyIconButton(
                text: 'Rejoindre la partie',
                icon: Icons.phonelink,
                callback: () {
                  print(_roomController.text);
                  context
                      .read<RoomProvider>()
                      .enterRoom(_roomController.text, _nameController.text);
                  Navigator.pushNamed(context, '/waiting-room');
                }),
            Spacer(),
          ],
        ),
      ),
    );
  }
}
