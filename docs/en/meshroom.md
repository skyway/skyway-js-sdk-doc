Class that manages fullmesh type room.

## Constructor

Constructor should not be used. Instead, it is used used in only SDK.
Meshroom instance is created by `joinRoom()`.

### Sample

```js
meshRoom = peer.joinRoom('roomName');
```

## Methods

### close

Close all connections in the room.

#### Parameters

None

#### Return value 

`undefined`

#### Sample

```js
room.close();
```

### getLog

Start getting room's logs from signaling server.
When fetching logs succeeds, `log` event fires.

#### Parameters

None

#### Return value 

`undefined`

#### Sample

```js
call.close();
```

### replaceStream

Replace the stream being sent on all MediaConnections with a new one.
You may change receive only mode to both send and receive mode.
Also, changing audio only stream to both audio and video stream is supported.

#### Parameters

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| stream | MediaStream | | | The stream to replace the old stream with. |

#### Return value 

`undefined`

#### Sample

```js
// newStream
meshRoom.replaceStream(newStream);
```

### send

Send data to all participants in the room with WebSocket. It emits broadcast event.

#### Parameters

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| data | * | ✔ | | The data to send. |

## Events

### open

Room is ready.

### peerJoin

New peer has joined.

|Type|Description|
|----|----|
|string|Newly joined Peer ID|

### peerLeave

A peer has left.

|Type|Description|
|----|----|
|string|The left Peer ID|

### log

Room's log received.

|Type|Description|
|----|----|
|Array|logs|

### stream 

MediaStream received from peer in the room.
The Peer ID of stream origin can be obtained via `stream.peerId`.

|Type|Description|
|----|----|
|MediaStream|MediaStream instance|

#### Sample

```js
room.on('stream', stream =>{
	// e.g. setting stream to <video>
});
```

### data

Data received from peer.

|Type|Description|
|----|----|
|object|[data object](#data-object)|

#### data object

|Name|Type|Description|
|---|----|----|
|src|string|The peerId of the peer who sent the data.|
|data|*|The data that a peer sent in the room.|

### close

All connections in the room has closed.

### removeStream

[MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) is removed from the room.

|Type|Description|
|----|----|
|MediaStream|MediaStream instance|

#### Sample

```js
meshRoom.on('removeStream', stream => {
	// e.g. getting the peer ID who removed stream
  const peerId = stream.peerId;
}
```