import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:the_poll_party_mobile/components/myIconButton.dart';
import 'package:the_poll_party_mobile/components/myTextField.dart';
import 'package:the_poll_party_mobile/providers/socketConnectionProvider.dart';

class TextAnswerMode extends StatelessWidget {
  const TextAnswerMode({
    Key key,
    @required this.socketProvider,
    @required TextEditingController answerController,
    @required this.timerCallback,
  })  : _answerController = answerController,
        super(key: key);

  final SocketConnectionProvider socketProvider;
  final TextEditingController _answerController;
  final VoidCallback timerCallback;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Question: ${socketProvider.getCurrentQuestion().question}',
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
                        .sendAnswer(_answerController.text),
                    Provider.of<SocketConnectionProvider>(context,
                            listen: false)
                        .nextQuestion(),
                    timerCallback()
                  },
              text: 'Envoyer ma réponse',
              icon: Icons.check),
        ),
      ],
    );
  }
}
