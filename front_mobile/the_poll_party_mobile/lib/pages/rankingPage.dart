import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:the_poll_party_mobile/components/borderedText.dart';
import 'package:the_poll_party_mobile/components/myIconButton.dart';
import 'package:the_poll_party_mobile/models/player.dart';
import 'package:the_poll_party_mobile/providers/socketConnectionProvider.dart';
import 'package:the_poll_party_mobile/styles/Shapes.dart';

class RankingPage extends StatelessWidget {
  const RankingPage({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    List<Competitor> rankedCompetitors =
        Provider.of<SocketConnectionProvider>(context, listen: false)
            .getCompetitors;

    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0).copyWith(top: 45),
              child: Text("Classement final",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                      fontWeight: FontWeight.bold, fontSize: titleTextSize)),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 8.0, bottom: 8.0),
              child: SizedBox(
                height: MediaQuery.of(context).size.height * 0.77,
                child: ListView.separated(
                  padding: EdgeInsets.zero,
                  shrinkWrap: true,
                  itemCount: rankedCompetitors.length,
                  separatorBuilder: (BuildContext context, int index) =>
                      SizedBox(
                    height: 6,
                  ),
                  itemBuilder: (BuildContext context, int index) {
                    return BorderedText(
                        text:
                            '${index + 1}. ${rankedCompetitors[index].name} : ${rankedCompetitors[index].score} pts');
                  },
                ),
              ),
            ),
            MyIconButton(
                callback: () => {
                      Navigator.pushNamedAndRemoveUntil(
                          context, "/room", (r) => false),
                      Provider.of<SocketConnectionProvider>(context,
                              listen: false)
                          .disconnect()
                    },
                text: 'Quitter la partie',
                icon: Icons.exit_to_app)
          ],
        ),
      ),
    );
  }
}
