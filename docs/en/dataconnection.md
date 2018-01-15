Class that manages data connections to other peers.

## Constructor

Constructor should not be used. Instead, it is used used in only SDK.
DataConnection instance can be created `connect` and `peer.on('connection')`.

### Sample

```js
// Calling party
dataConnection = peer.connect('peerID');

// Called party
peer.on('connection', connection => {
  console.log(connection);
});
```

## Members

|Name|Type|Description|
|----|----|----|
|metadata|object|Any additional information to send to the peer.|
|open|boolean|Whether the Connection has been opened or not.|
|remoteId|string|PeerId of the peer this connection is connected to.|
|peer|string|*Deprecated* The remote peerId. use `remoteId` instead.|

#### Sample

```js
peer.on('connection', connection => {
  console.log(connection.metadata);
  // => Show metadata which calling party added
});
```

## Methods

### send

Send data to peer. If serialization is 'binary', it will chunk it before sending.

#### Parameters

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| data | * | ✔ | | The data to send to the peer. |

#### Return value 

`undefined`

#### Sample

```js
// Send 'hello world' string.
dataConnection.send('hello world');

// 'data' events fires on received side
dataConnection.on('data', data => {
  console.log('hello world');
  // => 'hello world'
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
dataConnection.close();
```

## Events

### data

Received data event.

| Type | Description |
| --- | --- | 
| * | Received data |

#### Sample

```js
dataConnection.on('data', data => {
  console.log('hello world');
  // => 'hello world'
});
```

### close

Connection closed event.
