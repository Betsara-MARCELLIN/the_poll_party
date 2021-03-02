import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:the_poll_party_mobile/components/myIconButton.dart';
import 'package:the_poll_party_mobile/components/myTextField.dart';
import 'package:the_poll_party_mobile/models/response.dart';
import 'package:the_poll_party_mobile/providers/socketConnectionProvider.dart';

class TextAnswerMode extends StatefulWidget {
  TextAnswerMode({
    Key key,
    @required this.socketProvider,
  }) : super(key: key);
  final SocketConnectionProvider socketProvider;

  @override
  _TextAnswerModeState createState() => _TextAnswerModeState();
}

class _TextAnswerModeState extends State<TextAnswerMode> {
  TextEditingController _answerController = new TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Question: ${widget.socketProvider.getCurrentQuestion().question}',
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
                        .sendAnswer(new Response(
                      widget.socketProvider.getCurrentQuestion().id,
                      _answerController.text,
                      widget.socketProvider.getCurrentQuestion().type,
                    )),
                    Provider.of<SocketConnectionProvider>(context,
                            listen: false)
                        .waitQuestion()
                  },
              text: 'Envoyer ma réponse',
              icon: Icons.check),
        ),
      ],
    );
  }
}
