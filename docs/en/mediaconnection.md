Class that manages media connections to other peers.

## Constructor

Constructor should not be used. Instead, it is used used in only SDK.
MediaConnection instance can be created `call` and `peer.on('call')`.

### Sample

```js
// Calling party
mediaConnection = peer1.call('peerID', mediaStream);

// Called party
peer2.on('call', call => {
  // answer with called party's media stream.
  call.answer(mediaStream2)
});
```

## Members

|Name|Type|Description|
|----|----|----|
|metadata|object|Any additional information to send to the peer.|
|open|boolean|Whether the Connection has been opened or not.|
|remoteId|string|PeerId of the peer this connection is connected to.|
|peer|string|*Deprecated* The remote peerId. Use `remoteId` instead.|

#### Sample

```js
// When calling party set `metadata: { foo: 'bar' }`
peer.on('call', call => {
  console.log(call.metadata);
  // => {foo: "bar"}
});
```

## Methods

### answer

Create and send an answer message.

#### Parameters

| Name | Type | Require | Default | Description |
| --- | --- | --- | --- | --- |
| stream | MediaStream | ★ | | The stream to send to the peer. |
| options | [answer options object](#answer-options-object) | | | Optional arguments for the connection. |

##### answer options object

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| videoBandwidth | number | | | A max video bandwidth(kbps) |
| audioBandwidth | number | | | A max audio bandwidth(kbps) |
| videoCodec | string | | | A video codec like 'H264' |
| audioCodec | string | | | A video codec like 'PCMU' |

#### Return value 

`undefined`

#### Sample

```js
peer.on('call', call => {
  call.answer(mediaStream);
});
```

### close

Disconnect from remote peer.

#### Parameters

None

#### Return value 

`undefined`

#### Sample

```js
call.close();
```

### replaceStream

Replace the stream being sent with a new one.
The new one can be audio only stream, or both audio and video stream.

#### Parameters

| Name | Type | Optional | Default | Description |
| --- | --- | --- | --- | --- |
| stream | MediaStream | | | The stream to replace the old stream with. |

#### Return value 

`undefined`

#### Sample

```js
// newStream
call.replaceStream(newStream);
```

## Events

### stream 

MediaStream received from peer.

|Type|Description|
|----|----|
|MediaStream|MediaStream instance|

#### Sample

```js
call.on('stream', stream => {
  console.log(stream);
});
```

### close

Connection closed event.

### removeStream

[MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) from peer was removed.


|Type|Description|
|----|----|
|MediaStream|MediaStream instance|

