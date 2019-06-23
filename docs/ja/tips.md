ここでは、SkyWayを利用したWebRTCアプリケーション開発に関するTipsを紹介します。

このページの内容はその動作を保証するものではありません。ブラウザの実装によっては動作しない・挙動が違うなどの可能性があります。

## MediaStreamの取得

[`Peer#call()`](../peer#callpeerid-stream-options)や[`Peer#joinRoom()`](../peer#joinroomroomname-roomoptions)には、引数として`MediaStream`を渡せますが、SkyWayではその`MediaStream`の取得方法を規定していません。

一般的なJavaScriptのAPIでは、次の方法で取得できます。

- `navigator.mediaDevices.getUserMedia(options)`
- `navigator.mediaDevices.getDisplayMedia(options)`

```js
(async function() {
  // ..

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  const call = peer.call('remote-peerId', stream);

  // ...
}());
```

指定できる`options`の詳細・挙動については、各ブラウザの実装状況に依存します。

そのほか、`HTMLVideoElement`や`HTMLAudioElement`、および`HTMLCanvasElement`の
`captureStream()`からも取得できます。

## 画面共有

カメラではなく、端末の画面自体を`MediaStream`として取得することもできます。

取得した`MediaStream`を使うことで、画面共有機能が実現できます。

```js
(async function() {
  // ..

  const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
  const call = peer.call('remote-peerId', stream);

  // ...
}());
```

このAPIがブラウザに実装されていない場合は、[skyway/skyway-screenshare](https://github.com/skyway/skyway-screenshare)のようなライブラリが必要です。

## 使用するデバイスの選択

端末に複数のUSBカメラ・マイクが接続されている場合、それらを選択して使用できます。

```js
(async function() {
  // ..

  const defaultVideoStream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  // デバイスの一覧を取得
  const devices = await navigator.mediaDevices.enumerateDevices();

  // 任意のデバイスを指定
  const newVideoInputDevice = devices.find(
    device => device.kind === 'videoinput'
  );
  const newVideoStream = await navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: newVideoInputDevice.deviceId,
    },
  });

  // ...
}());
```

`navigator.mediaDevices.enumerateDevices()`を使うことで、利用可能なデバイスの一覧を取得できます。
その中から任意のデバイスを参照し、その`deviceId`を`getUserMedia()`に渡すことで、入力ソースを指定できます。

## `MediaStream`をミュートする

一時的に動画や音声をミュートしたい場合は、`MediaStreamTrack`の`enabled`プロパティを設定することで実現できます。

```js
(async function() {
  // ..

  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  const call = peer.call('remote-peerId', stream);

  // 音声のみミュート
  stream.getAudioTracks().forEach(track => track.enabled = false);

  // ...
}());
```

## マルチストリーム

複数の`MediaStream`を送りたい場合についてです。

現状、SkyWayではSDKとしてマルチストリームの機能を提供していません。

アプリケーション側で、[`MediaConnection`](../mediaconnection)を複数用意するなど、実現することはできます。

## `sdpSemantics`

[Peer](../peer/#options-object)クラスのコンストラクタ引数として、`RTCPeerConnection`のコンストラクタに渡される`RTCConfiguration`を指定できます。

Chromeでは`sdpSemantics`というプロパティを指定できますが、SkyWayでは常に`unified-plan`を使用します。
