The `MediaConnection` is a class which manages a media connection to another peer.

The constructor should not be used other than used inside the ECLWebRTC SDK.
A `MediaConnection` instance will be given as a return value of [`Peer#call()`](../peer/#callpeerid-stream-options)
and as an input of [`call` event](../peer/#event-call) of the [`Peer`](../peer/).

### Sample

```js
// Calling party
const mediaConnection = peer.call('peerID', mediaStream);

// Called party
peer.on('call', mediaConnection => {
  // answer with called party's media stream.
  mediaConnection.answer(mediaStream);
});
```

## Members

| Name        | Type          | Description                                                                                                                                                                                                                                                                                                                          |
|-------------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| type        | string        | String which describes the connection type. In MediaConnection, the value is `'media'`.                                                                                                                                                                                                                                              |
| metadata    | Object        | User-defined `metadata` given in [`Peer#call()`](../peer/#callpeerid-stream-options). The called party has the value given by the calling party.                                                                                                                                                                                     |
| localStream | [MediaStream] | Local stream given in [`Peer#call()`](../peer/#callpeerid-stream-options) or [`MediaConnection#answer()`](#answerstream-options).
| open        | boolean       | Boolean that is True if the connection is opened. The [`stream` event](#event-stream) of [`MediaConnection`](./) and [`MediaConnection#answer()`](#answerstream-options) could open the connection, the [`close` event](#event-close) of [`MediaConnection`](./) and [`MediaConnection#close()`](#close) could close the connection. |
| remoteId    | string        | The Peer ID of the peer this connection connect to.                                                                                                                                                                                                                                                                                  |
| peer        | string        | **Deprecated** The Peer ID of the peer this connection connect to. Use `remoteId` instead.                                                                                                                                                                                                                                           |
| id          | string        | The ID to identify each connection.                                                                                                                                                                                                                                                                                                  |

## Methods

### `answer(stream[, options])`

Create and send an answer for the media connection offer.

#### Parameters

| Name    | Type                                            | Required | Default | Description                                               |
|---------|-------------------------------------------------|----------|---------|-----------------------------------------------------------|
| stream  | [MediaStream]                                   | ✔        |         | A MediaStream which send to the calling party.             |
| options | [answer options object](#answer-options-object) |          |         | Object which contains options which customize the answer. |

##### answer options object

| Name                | Type    | Required | Default | Description                                                                                                   |
|---------------------|---------|----------|---------|---------------------------------------------------------------------------------------------------------------|
| videoBandwidth      | number  |          |         | A max video bandwidth(kbps).                                                                     |
| audioBandwidth      | number  |          |         | A max audio bandwidth(kbps).                                                                     |
| videoCodec          | string  |          |         | A video codec like `'H264'`.                                                                     |
| audioCodec          | string  |          |         | A audio codec like `'PCMU'`.                                                                     |
| videoReceiveEnabled | boolean |          |         | Set to `true` and your stream does not include video track, you will be video receive only mode. |
| audioReceiveEnabled | boolean |          |         | Set to `true` and your stream does not include audio track, you will be audio receive only mode. |

#### Return value

`undefined`

#### Sample

```js
peer.on('call', mediaConnection => {
  const recvonlyOption = {
    videoReceiveEnabled: false,
  };

  mediaConnection.answer(mediaStream, recvonlyOption);
});
```

### `close(forceClose)`

Close the MediaConnection between remote peer.

#### Parameters

| Name       | Type    | Required | Default | Description                                                                                                                                                                               |
|------------|---------|----------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| forceClose | boolean |          | false   | Set to `true` and the connection on remote peer will close immediately. When set to `false`, the connection on remote peer will close after the end of the ICE reconnect by the browser. |

#### Return value

`undefined`

### `replaceStream(stream)`

Replace the MediaStream being sent with a new one.
When a new MediaStream has a media track, the media connection will be in send
and receive mode even if the former connection was in receive only mode.

#### Parameters

| Name   | Type          | Required | Default | Description                   |
|--------|---------------|----------|---------|-------------------------------|
| stream | [MediaStream] | ✔        |         | The stream to be replaced. |

#### Return value

`undefined`

### `getPeerConnection()`

Get `RTCPeerConnection` instance which used internally in the MediaConnection between remote peer.
If `open` property is `false`, it returns `null` instead.

!!! Notice
  Note that if you operate `RTCPeerConnection` directly, the ECLWebRTC SDK may not work properly.

#### Return value

A [RTCPeerConnection] instance or `null`.

#### Sample

```js
if (mediaConnection.open) {
  const pc = mediaConnection.getPeerConnection();

  // ...
}
```

## Events

### Event: `'stream'`

Fired when received a stream.

| Name   | Type          | Description                                   |
|--------|---------------|-----------------------------------------------|
| stream | [MediaStream] | A MediaStream which received from remote peer. |

```js
mediaConnection.on('stream', stream => {
  // ...
});
```

### Event: `'removeStream'`

Fired when the remote stream is removed from an existing MediaConnection.

Note that the MediaConnection will not fire this event when remote peer has closed a MediaConnection.
Use [`close` event](#event-close) if you want to catch a closing of the MediaConnection.

| Name   | Type          | Description                                          |
|--------|---------------|------------------------------------------------------|
| stream | [MediaStream] | A MediaStream which removed from the MediaConnection. |

```js
mediaConnection.on('removeStream', stream => {
  // ...
});
```

### Event: `'close'`

Fired when call [`MediaConnection#close()`](#close), or the media connection is closed.

```js
mediaConnection.on('close', () => {
  // ...
});
```

[MediaStream]: https://w3c.github.io/mediacapture-main/#mediastream
[RTCPeerConnection]: https://w3c.github.io/webrtc-pc/#rtcpeerconnection-interface
