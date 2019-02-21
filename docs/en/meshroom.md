The `MeshRoom` is a class which manages a full-mesh type room.

The constructor should not be used other than used inside the ECLWebRTC SDK.
A `MeshRoom` instance will be given as a return value of [`Peer#joinRoom()`](../peer#joinroomroomname-roomoptions).

### Sample

```js
const meshRoom = peer.joinRoom('roomName', {
  mode: 'mesh',
  stream: localStream,
});
meshRoom.on('open', () => {});
```

## Members

| Name        | Type   | Description                      |
| ----------- | ------ | -------------------------------- |
| name        | string | The room name.                   |
| connections | Object | Object contains all connections. |

## Methods

### `close()`

Close all connections in the room.

#### Return value

`undefined`

### `getLog()`

Start getting room's logs from signaling server.
When fetching logs succeeds, [`log` event](#event-log) fires.

#### Return value

`undefined`

#### Sample

```js
room.once('log', log => {
  // ...
});
room.getLog();
```

### `replaceStream(stream)`

Replace the stream being sent on all MediaConnections with a new one.
When a new MediaStream has an enabled audio and/or video, the media connection
will be in send and receive mode even if the former connection was in receive
only mode.

#### Parameters

| Name   | Type          | Required | Default | Description                        |
| ------ | ------------- | -------- | ------- | ---------------------------------- |
| stream | [MediaStream] | ✔        |         | The stream to be replaced. |

#### Return value

`undefined`

### `send(data)`

Send data to all members in the room with WebSocket.

#### Parameters

| Name | Type | Required | Default | Description       |
| ---- | ---- | -------- | ------- | ----------------- |
| data | *    | ✔        |         | The data to send. |

#### Return value

`undefined`

## Events

### Event: `'open'`

Fired when the room is ready and you joined the room successfully.

```js
room.on('open', () => {
  // ...
});
```

### Event: `'peerJoin'`

Fired when a new remote peer has joined.

| Name   | Type   | Description         |
| ------ | ------ | ------------------- |
| peerId | string | The Peer ID of joined peer. |

```js
room.on('peerJoin', peerId => {
  // ...
});
```

### Event: `'peerLeave'`

Fired when a remote peer has left.

| Name   | Type   | Description       |
| ------ | ------ | ----------------- |
| peerId | string | The Peer ID of left peer. |

```js
room.on('peerLeave', peerId => {
  // ...
});
```

### Event: `'log'`

Fired when received the room log.

| Name | Type     | Description                  |
| ---- | -------- | ---------------------------- |
| logs | string[] | Array of JSON strings. |

```js
room.once('log', logs => {
  for (const logStr of logs) {
    const { messageType, message, timestamp } = JSON.parse(logStr);
    // ...
  }
});
```

### Event: `'stream'`

Fired when received a MediaStream from remote peer in the room.
The Peer ID of stream origin can be obtained via `stream.peerId`.

| Name   | Type          | Description           |
| ------ | ------------- | --------------------- |
| stream | [MediaStream] | A MediaStream instance. |

```js
room.on('stream', stream => {
  // ...
});
```

### Event: `'data'`

Fired when received the data from a remote peer in the room.

| Name | Type   | Description                                         |
| ---- | ------ | --------------------------------------------------- |
| data | object | [data object](#data-object) itself. |

#### data object

| Name | Type   | Description                     |
| ---- | ------ | ------------------------------- |
| src  | string | The Peer ID who sent this data. |
| data | *      | Sent data.                      |

```js
room.on('data', ({ src, data }) => {
  // ...
});
```

### Event: `'close'`

Fired when the room is closed.

```js
room.on('close', () => {
  // ...
});
```

### Event: `'removeStream'`

Fired when a MediaStream is removed from a media connection of this room.

Note that the `MeshRoom` will not fire this event when remote peer has left from an MeshRoom.
Use [`peerLeave` event](#event-peerleave) if you want to catch a leaving of a remote peer.

| Name   | Type          | Description           |
| ------ | ------------- | --------------------- |
| stream | [MediaStream] | A MediaStream which removed. |

```js
room.on('removeStream', stream => {
  // ...
});
```

[MediaStream]: https://w3c.github.io/mediacapture-main/#mediastream
