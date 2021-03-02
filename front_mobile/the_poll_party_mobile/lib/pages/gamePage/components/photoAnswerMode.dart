import 'dart:io';

import 'package:camera/camera.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:the_poll_party_mobile/components/myIconButton.dart';
import 'package:the_poll_party_mobile/models/response.dart';
import 'package:the_poll_party_mobile/pages/gamePage/components/otherCompetitorsAnswers.dart';
import 'package:the_poll_party_mobile/providers/socketConnectionProvider.dart';

class PhotoAnswerMode extends StatefulWidget {
  PhotoAnswerMode({
    Key key,
    @required this.socketProvider,
  }) : super(key: key);

  final SocketConnectionProvider socketProvider;

  @override
  _PhotoAnswerModeState createState() => _PhotoAnswerModeState();
}

class _PhotoAnswerModeState extends State<PhotoAnswerMode>
    with WidgetsBindingObserver {
  CameraController _controller;
  Future<void> _initController;
  bool isCameraReady = false;
  bool isAnswerSent = false;

  //Firebase
  FirebaseStorage storage = FirebaseStorage.instance;

  Future<void> _initializeCamera() async {
    final cameras = await availableCameras();
    final firstCamera = cameras.first;
    _controller = CameraController(firstCamera, ResolutionPreset.medium);
    _initController = _controller.initialize();
    if (!mounted) {
      return;
    }
    setState(() {
      isCameraReady = true;
    });
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) {
      _initController = _controller != null
          ? _controller.initialize()
          : null; //on pause camera is disposed, so we need to call again "issue is only for android"
      if (!mounted) return;
      setState(() {
        isCameraReady = true;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    _initializeCamera();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return isAnswerSent
        ? OtherCompetitorsAnswers()
        : Container(
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: Text(
                      'Question: ${widget.socketProvider.getCurrentQuestion().question}',
                      style:
                          TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
                ),
                Padding(
                  padding: const EdgeInsets.all(20),
                  child: FutureBuilder<void>(
                    future: _initController,
                    builder: (BuildContext context, AsyncSnapshot snapshot) {
                      if (snapshot.connectionState == ConnectionState.done) {
                        return SizedBox(
                          height: MediaQuery.of(context).size.height * 0.6,
                          child: AspectRatio(
                            aspectRatio: 1 / _controller.value.aspectRatio,
                            child: ClipRRect(
                                borderRadius: BorderRadius.only(
                                  topLeft: Radius.circular(8.0),
                                  topRight: Radius.circular(8.0),
                                  bottomRight: Radius.circular(8.0),
                                  bottomLeft: Radius.circular(8.0),
                                ),
                                child: CameraPreview(_controller)),
                          ),
                        );
                      } else {
                        return Center(child: CircularProgressIndicator());
                      }
                    },
                  ),
                ),
                MyIconButton(
                    callback: () async {
                      try {
                        final image = await _controller.takePicture();
                        print(image?.path);
                        Reference ref = storage.ref().child(image.name);
                        UploadTask uploadTask = ref.putFile(File(image.path));
                        print("image sent");
                        var question = Provider.of<SocketConnectionProvider>(
                                context,
                                listen: false)
                            .getCurrentQuestion();
                        uploadTask.whenComplete(() async {
                          print("Complete");
                          var downloadUrl = await ref.getDownloadURL();
                          print("IMAGE URL: " + downloadUrl);
                          widget.socketProvider.sendAnswer(new Response(
                              question.id, downloadUrl, question.type));
                          print("Provider send");
                        });
                        setState(() {
                          isAnswerSent = true;
                        });
                        Provider.of<SocketConnectionProvider>(context,
                                listen: false)
                            .waitQuestion();
                      } catch (e) {
                        print("ERROR !!!!!!!!!!!!!!");
                        print(e);
                      }
                    },
                    text: "Envoyer ma réponse",
                    icon: Icons.camera_alt)
              ],
            ),
          );
  }
}
