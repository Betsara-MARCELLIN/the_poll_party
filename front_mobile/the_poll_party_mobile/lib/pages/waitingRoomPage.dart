import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:the_poll_party_mobile/components/borderedText.dart';
import 'package:the_poll_party_mobile/components/myIconButton.dart';
import 'package:the_poll_party_mobile/providers/roomProvider.dart';
import 'package:the_poll_party_mobile/providers/socketConnectionProvider.dart';
import 'package:the_poll_party_mobile/styles/Colors.dart';
import 'package:the_poll_party_mobile/styles/Shapes.dart';

class WaitingRoomPage extends StatefulWidget {
  WaitingRoomPage({Key key}) : super(key: key);

  @override
  _WaitingRoomPageState createState() => _WaitingRoomPageState();
}

class _WaitingRoomPageState extends State<WaitingRoomPage> {
  @override
  void initState() {
    super.initState();
    var roomId = Provider.of<RoomProvider>(context, listen: false).getRoomId;
    var playerName =
        Provider.of<RoomProvider>(context, listen: false).getPlayerName;
    Provider.of<SocketConnectionProvider>(context, listen: false)
        .connectToServer(roomId, playerName);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0).copyWith(top: 45),
            child: Text(
              "Veuillez attendre les autres participants",
              style: TextStyle(fontSize: titleTextSize, color: lightBlack),
              textAlign: TextAlign.center,
            ),
          ),
          WaitingPlayerHolder(
              title: "Membres du public",
              players:
                  Provider.of<SocketConnectionProvider>(context, listen: true)
                      .getPublics),
          WaitingPlayerHolder(
              title: "Compétiteurs",
              players:
                  Provider.of<SocketConnectionProvider>(context, listen: true)
                      .getCompetitors),
          MyIconButton(
              callback: () => {
                    Provider.of<SocketConnectionProvider>(context,
                            listen: false)
                        .disconnect(),
                    Navigator.pop(context)
                  },
              text: "Quitter",
              icon: Icons.exit_to_app),
          MyIconButton(
              callback: () => {Navigator.pushNamed(context, '/game')},
              text: "Jeux",
              icon: Icons.play_arrow)
        ],
      ),
    );
  }
}

class WaitingPlayerHolder extends StatelessWidget {
  WaitingPlayerHolder({Key key, @required String title, @required List players})
      : _title = title,
        _players = players,
        super(key: key);
  final String _title;
  final List _players;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: [
          Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
            Text(
              _title,
              style: TextStyle(
                  fontSize: normalTextSize,
                  color: lightBlack,
                  fontWeight: FontWeight.bold),
            ),
            Container(
              child: Text(
                "${_players.length}/5",
                style: TextStyle(fontSize: normalTextSize, color: Colors.white),
              ),
              decoration: BoxDecoration(
                  color: secondaryColor, borderRadius: roundedBorder),
              padding: EdgeInsets.all(10),
            ),
          ]),
          Padding(
            padding: const EdgeInsets.only(top: 8.0, bottom: 8.0),
            child: SizedBox(
              height: MediaQuery.of(context).size.height * 0.25,
              child: ListView.separated(
                padding: EdgeInsets.zero,
                shrinkWrap: true,
                itemCount: _players.length,
                separatorBuilder: (BuildContext context, int index) => SizedBox(
                  height: 6,
                ),
                itemBuilder: (BuildContext context, int index) {
                  return BorderedText(text: _players[index].name);
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}
