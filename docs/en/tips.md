This page introduces Tips on WebRTC application development using ECLWebRTC JavaScript SDK.

The content does no guarantee its behavior.
It always depends on the browser implementation.

## How to get MediaStream

Some methods like [`Peer#call()`](../peer#callpeerid-stream-options) and [`Peer#joinRoom()`](../peer#joinroomroomname-roomoptions) accepts `MediaStream` as its arguments.

But our SDK does not provide specific API to get `MediaStream`.

In JavaScript API, you can get `MediaStream` in the following way.

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

Details of `options` and how it works depends on each browser implementation.

Other than that, you can use `captureStream()` method from `HTMLVideoElement`, `HTMLAudioElement` and `HTMLCanvasElement`.

## Screen sharing

You can also use your own display itself as `MediaStream`.

By using it, it is possible to share your screen to the remote peer.

```js
(async function() {
  // ..

  const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
  const call = peer.call('remote-peerId', stream);

  // ...
}());
```

If your browser does not support this API, a library like [skyway/skyway-screenshare](https://github.com/skyway/skyway-screenshare) will be helpful.

## Select devices to use

If multiple cameras and microphones are available, you can select and use it.

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

By using `navigator.mediaDevices.enumerateDevices()`, you can get the list of available devices.

Then select one in the list, and pass its `deviceId` to `getUserMedia()`, you can specify input source.

## Mute a `MediaStream`

If you want to mute your video and/or audio temporarily, set `enabled` property of `MediaStreamTrack`.

```js
(async function() {
  // ..

  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  const call = peer.call('remote-peerId', stream);

  // mute audio
  stream.getAudioTracks().forEach(track => track.enabled = false);

  // ...
}());
```

## Multistream

In case sending multiple streams.

Currently, our SDK does not provide function to achieve that.

On your application code, you can do it by preparing multiple [`MediaConnection`] (../ mediaconnection).

## `sdpSemantics`

You can pass `RTCConfiguration` for the `RTCPeerConnection` via [Peer](../peer/#options-object) constructor.

But we always use the value `plan-b` for the `sdpSemantics` property.
