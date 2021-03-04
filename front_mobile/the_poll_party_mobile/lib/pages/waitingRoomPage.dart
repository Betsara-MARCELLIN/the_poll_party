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
  bool startGame;
  String roomId;
  String playerName;
  int nbQuestions;

  @override
  void initState() {
    super.initState();
    roomId = Provider.of<RoomProvider>(context, listen: false).getRoomId;
    playerName =
        Provider.of<RoomProvider>(context, listen: false).getPlayerName;
    Provider.of<SocketConnectionProvider>(context, listen: false)
        .connectToServer(roomId, playerName);
    startGame = Provider.of<SocketConnectionProvider>(context, listen: false)
        .getGameStart;
    nbQuestions = Provider.of<SocketConnectionProvider>(context, listen: false)
        .getQuestions
        .length;
  }

  @override
  Widget build(BuildContext context) {
    startGame = Provider.of<SocketConnectionProvider>(context, listen: true)
        .getGameStart;
    nbQuestions = Provider.of<SocketConnectionProvider>(context, listen: true)
        .getQuestions
        .length;

    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (startGame) {
        Navigator.pushNamed(context, '/game');
      }
    });

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Text(
                "Salle $roomId",
                style: TextStyle(
                    fontSize: titleTextSize,
                    color: lightBlack,
                    fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
            ),
            Stack(
              alignment: AlignmentDirectional.center,
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: LinearProgressIndicator(
                    backgroundColor: secondaryBisColor,
                    valueColor: AlwaysStoppedAnimation<Color>(primaryColor),
                    value: nbQuestions / 10,
                    minHeight: normalTextSize + 10,
                  ),
                ),
                Text(
                  "$nbQuestions/10 questions préparés",
                  style: TextStyle(
                      fontSize: normalTextSize,
                      color: Colors.white,
                      fontWeight: FontWeight.bold),
                  textAlign: TextAlign.center,
                ),
              ],
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
            Spacer(),
            MyIconButton(
                callback: () => {
                      Provider.of<SocketConnectionProvider>(context,
                              listen: false)
                          .disconnect(),
                      Navigator.pop(context)
                    },
                text: "Quitter",
                icon: Icons.exit_to_app),
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
