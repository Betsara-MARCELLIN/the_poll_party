# the_poll_party
a project developed for the course " interfaces réparties "

## BE AWARE

current version of socket.io client on Flutter does not supports version 3+ of socket.io, 
do not update package " socket.io " unless there is a new fix.
## Back
to run the backend

The first time, you'll need to install all dependencies with
```
npm install
```

then run dev (unless you are deploying the app)<br>
**dev**
```
npm run dev
```
or<br>
**prod**
```
npm run start
```

## Front Mobile
# Running with local backend

I assumed you have already installed flutter and `flutter doctor` is ok on your machine

```
adb reverse tcp:3000 tcp:3000
flutter run
```

## Front Web
The first time, you'll need to install all dependencies with
```
npm install
```

then
```
npm start
```