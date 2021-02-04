import 'package:flutter/material.dart';
import 'package:the_poll_party_mobile/styles/Colors.dart';
import 'package:the_poll_party_mobile/styles/Shapes.dart';

class MyIconButton extends StatelessWidget {
  const MyIconButton({
    Key key,
    @required VoidCallback callback,
    @required String text,
    @required IconData icon,
  })  : _callback = callback,
        _text = text,
        _icon = icon,
        super(key: key);

  final VoidCallback _callback;
  final String _text;
  final IconData _icon;

  @override
  Widget build(BuildContext context) {
    return RaisedButton.icon(
        shape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(30.0)),
        label: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Text(
            _text,
            style: TextStyle(fontSize: normalTextSize),
          ),
        ),
        icon: Icon(_icon), //Icons.meeting_room
        color: accentColor,
        onPressed: () => _callback());
  }
}
