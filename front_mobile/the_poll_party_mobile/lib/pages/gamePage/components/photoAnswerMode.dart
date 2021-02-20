import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:the_poll_party_mobile/components/myIconButton.dart';
import 'package:the_poll_party_mobile/models/answer.dart';
import 'package:the_poll_party_mobile/providers/socketConnectionProvider.dart';

class PhotoAnswerMode extends StatefulWidget {
  PhotoAnswerMode({
    Key key,
    @required this.socketProvider,
    @required this.timerCallback,
  }) : super(key: key);

  final SocketConnectionProvider socketProvider;
  final VoidCallback timerCallback;

  @override
  _PhotoAnswerModeState createState() => _PhotoAnswerModeState();
}

class _PhotoAnswerModeState extends State<PhotoAnswerMode> {
  CameraController _controller;
  Future<void> _initializerControllerFuture;
  bool isCameraReady = false;

  Future<CameraDescription> initCamera() async {
    final cameras = await availableCameras();
    return cameras.first;
  }

  Future<void> _initializeCamera() async {
    final cameras = await availableCameras();
    final firstCamera = cameras.first;
    _controller = CameraController(firstCamera, ResolutionPreset.medium);
    _initializerControllerFuture = _controller.initialize();
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
      _controller != null
          ? _initializerControllerFuture = _controller.initialize()
          : null; //on pause camera is disposed, so we need to call again "issue is only for android"
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
    return Container(
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: Text(
                'Question: ${widget.socketProvider.getCurrentQuestion().question}',
                // 'Question: sqdsqd q qsd qs dqd qsd dsqd qsd qsddopskd ?',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
          ),
          Padding(
            padding: const EdgeInsets.all(20),
            child: FutureBuilder<void>(
              future: _initializerControllerFuture,
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
                  Provider.of<SocketConnectionProvider>(context, listen: false)
                      .sendAnswer(new Answer(
                          widget.socketProvider.getCurrentQuestion().id,
                          image.path.toString()));
                  Provider.of<SocketConnectionProvider>(context, listen: false)
                      .nextQuestion();
                  widget.timerCallback();
                } catch (e) {
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
