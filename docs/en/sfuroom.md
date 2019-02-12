Class manages SFU type room.

Constructor is used by only SDK, you can get instance by [`Peer#joinRoom()`](../peer#joinroomroomname-roomoptions).

### Sample

```js
const sfuRoom = peer.joinRoom('roomName', {
  mode: 'sfu',
  stream: localStream,
});
sfuRoom.on('open', () => {});
```

## Members

| Name          | Type     | Description                         |
| ------------- | -------- | ----------------------------------- |
| name          | string   | The room name.                      |
| remoteStreams | Object   | Object contains all remote streams. |
| members       | string[] | Array of the Peer ID in this room.  | 

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
You may change receive only mode to both send and receive mode.
Also, changing audio only stream to both audio and video stream is supported.

#### Parameters

| Name   | Type          | Required | Default | Description                        |
| ------ | ------------- | -------- | ------- | ---------------------------------- |
| stream | [MediaStream] | ✔        |         | The stream to replace the old one. |

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

Room is ready and you joined the room successfully.

```js
room.on('open', () => {
  // ...
});
```

### Event: `'peerJoin'`

New remote peer has joined.

| Name   | Type   | Description         |
| ------ | ------ | ------------------- |
| peerId | string | The Peer ID joined. |

```js
room.on('peerJoin', peerId => {
  // ...
});
```

### Event: `'peerLeave'`

Remote peer has left.

| Name   | Type   | Description       |
| ------ | ------ | ----------------- |
| peerId | string | The Peer ID left. |

```js
room.on('peerLeave', peerId => {
  // ...
});
```

### Event: `'log'`

Received the room log.

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

Received MediaStream from remote peer in the room.
The Peer ID of stream origin can be obtained via `stream.peerId`.


| Name   | Type          | Description           |
| ------ | ------------- | --------------------- |
| stream | [MediaStream] | MediaStream instance. |

```js
room.on('stream', stream => {
  // ...
});
```

### Event: `'data'`

Received the data from remote peer in the room.

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

Room has closed.

```js
room.on('close', () => {
  // ...
});
```

### Event: `'removeStream'`

MediaStream has removed from a media connection of this room.

This event does not fired when remote peer left the room.
In this case, use [`peerLeave` event](#event-peerleave) instead.

| Name   | Type          | Description           |
| ------ | ------------- | --------------------- |
| stream | [MediaStream] | MediaStream instance. |

```js
room.on('removeStream', stream => {
  // ...
});
```

[MediaStream]: https://w3c.github.io/mediacapture-main/#mediastream
