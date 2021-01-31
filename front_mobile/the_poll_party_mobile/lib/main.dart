import 'package:flutter/material.dart';
import 'package:the_poll_party_mobile/pages/gamePage.dart';
import 'package:the_poll_party_mobile/pages/roomPage.dart';
import 'package:provider/provider.dart';
import 'package:the_poll_party_mobile/providers/roomProvider.dart';

void main() {
  runApp(MultiProvider(providers: [
    ChangeNotifierProvider(
      create: (_) => RoomProvider(),
    )
  ], child: MyApp()));
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        initialRoute: '/room',
        routes: {
          '/room': (context) => RoomPage(),
          '/game': (context) => GamePage(),
        });
  }
}
