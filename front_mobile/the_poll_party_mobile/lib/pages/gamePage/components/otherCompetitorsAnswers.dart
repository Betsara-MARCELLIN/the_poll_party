import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:the_poll_party_mobile/components/borderedText.dart';
import 'package:the_poll_party_mobile/models/response.dart';
import 'package:the_poll_party_mobile/providers/socketConnectionProvider.dart';
import 'package:the_poll_party_mobile/styles/Colors.dart';
import 'package:the_poll_party_mobile/styles/Shapes.dart';

class OtherCompetitorsAnswers extends StatelessWidget {
  const OtherCompetitorsAnswers({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    print("Build !");
    int currentQuestionId =
        Provider.of<SocketConnectionProvider>(context, listen: false)
            .getCurrentQuestion()
            .id;
    List<Response> othersResponses =
        Provider.of<SocketConnectionProvider>(context, listen: false)
            .getCurrentResponse(currentQuestionId);

    return Container(
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0).copyWith(top: 45),
            child: Text("Les réponses des autres compétiteurs",
                textAlign: TextAlign.center,
                style: TextStyle(
                    fontWeight: FontWeight.bold, fontSize: titleTextSize)),
          ),
          Padding(
            padding: const EdgeInsets.only(top: 8.0, bottom: 8.0),
            child: SizedBox(
                height: MediaQuery.of(context).size.height * 0.7,
                child: othersResponses.isNotEmpty
                    ? ListView.separated(
                        padding: EdgeInsets.zero,
                        shrinkWrap: true,
                        itemCount: othersResponses.length,
                        separatorBuilder: (BuildContext context, int index) =>
                            SizedBox(
                          height: 6,
                        ),
                        itemBuilder: (BuildContext context, int index) {
                          if (othersResponses[index].response.isNotEmpty) {
                            if (othersResponses[index].type == "Photo") {
                              return SizedBox(
                                child: BorderedImage(
                                    imageUrl: othersResponses[index].response),
                              );
                            } else {
                              return BorderedText(
                                  text: '${othersResponses[index].response}');
                            }
                          }
                        },
                      )
                    : Center(
                        child: Text(
                          "Pas encore d'autres réponse :/",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                              fontSize: normalTextSize, color: accentColor),
                        ),
                      )),
          ),
        ],
      ),
    );
  }
}

class BorderedImage extends StatelessWidget {
  const BorderedImage({
    Key key,
    @required String this.imageUrl,
  }) : super(key: key);

  final String imageUrl;

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Image.network(imageUrl),
      decoration:
          BoxDecoration(color: secondaryColor, borderRadius: roundedBorder),
      padding: EdgeInsets.all(10),
    );
  }
}
