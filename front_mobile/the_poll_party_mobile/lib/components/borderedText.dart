import 'package:flutter/material.dart';
import 'package:the_poll_party_mobile/styles/Colors.dart';
import 'package:the_poll_party_mobile/styles/Shapes.dart';

class BorderedText extends StatelessWidget {
  const BorderedText({
    Key key,
    @required String text,
  })  : _player = text,
        super(key: key);

  final String _player;

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text(
        _player,
        textAlign: TextAlign.center,
        style: TextStyle(fontSize: normalTextSize, color: Colors.white),
      ),
      decoration:
          BoxDecoration(color: secondaryColor, borderRadius: roundedBorder),
      padding: EdgeInsets.all(10),
    );
  }
}
