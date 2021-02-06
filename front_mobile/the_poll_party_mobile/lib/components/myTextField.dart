import 'package:flutter/material.dart';
import 'package:the_poll_party_mobile/styles/Colors.dart';
import 'package:the_poll_party_mobile/styles/Shapes.dart';

class MyTextField extends StatelessWidget {
  const MyTextField(
      {Key key,
      @required TextEditingController textController,
      String hintText})
      : _textController = textController,
        _hintText = hintText,
        super(key: key);

  final TextEditingController _textController;
  final String _hintText;

  @override
  Widget build(BuildContext context) {
    return TextField(
      textAlign: TextAlign.center,
      style: TextStyle(fontSize: normalTextSize),
      controller: _textController,
      autocorrect: false,
      decoration: InputDecoration(
        filled: true,
        hintText: _hintText,
        enabledBorder: OutlineInputBorder(
          borderRadius: roundedBorder,
          borderSide: BorderSide(color: lightBlack, width: 2),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: roundedBorder,
          borderSide: BorderSide(color: accentColor, width: 2),
        ),
      ),
    );
  }
}
