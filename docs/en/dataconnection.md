The `DataConnection` is a class which manages a data connection to another peer.

The constructor should not be used other than used inside the ECLWebRTC SDK.
A `DataConnection` instance will be given as a return value of [`Peer#connect()`](../peer/#connectpeerid-options)
and as an input of [`connection` event](../peer/#event-connection) of the [`Peer`](../peer/).

### Sample

```js
// Calling party
const dataConnection = peer.connect('peerID');

// Called party
peer.on('connection', dataConnection => {
  // ...
});
```

## Members

| Name          | Type                 | Description                                                                                                                                                                                                                                                                  |
|---------------|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| type          | string               | String which describes the connection type. In DataConnection, the value is `'data'`.                                                                                                                                                                                        |
| metadata      | Object               | User-defined `metadata` object given in [`Peer#connect()`](../peer/#connectpeerid-options). The called party has the value given by the calling party.                                                                                                               |
| serialization | string               | The serialization type given in [`Peer#connect()`](../peer/#connectpeerid-options). The called party has the value given by the calling party.                                                                                                                       |
| dcInit        | [RTCDataChannelInit] | RTCDataChannelInit object given in [`Peer#connect()`](../peer/#connectpeerid-options). The called party has the value given by the calling party.                                                                                                                    |
| open          | boolean              | Boolean that is True if the connection is opened. The [`open` event](#event-open) of [`DataConnection`](./) can open the connection, and it will be closed when the [`close` event](#event-close) of [`DataConnection`](./) is fired or the data connection is disconnected. |
| remoteId      | string               | The Peer ID of the peer this connection connect to.                                                                                                                                                                                                                          |
| peer          | string               | **Deprecated** The Peer ID of the peer this connection connect to. Use `remoteId` instead.                                                                                                                                                                                   |
| id            | string               | The ID to identify each connection.                                                                                                                                                                                                                                          |

## Methods

### `send(data)`

Send data to the remote peer. If serialization is 'binary', it will chunk it
before sending.

#### Parameters

| Name | Type | Required | Default | Description                   |
|------|------|----------|---------|-------------------------------|
| data | *    | ✔        |         | The data to send to the peer. |

#### Return value

`undefined`

#### Sample

```js
// Send data
dataConnection.on('open', () => {
  const data = {
    name: 'SkyWay',
    msg: 'Hello, World!'
  };
  dataConnection.send(data);
});

// Receive data
dataConnection.on('data', ({ name, msg }) => {
  console.log(`${name}: ${msg}`);
  // => 'SkyWay: Hello, World!'
});
```

### `close()`

Close the DataConnection between the remote peer.

#### Return value

`undefined`

## Events

### Event: `'open'`

Fired when the data connection is opened.

```js
dataConnection.on('open', () => {
  // ...
});
```

### Event: `'data'`

Fired when received data from the remote peer.
If serialization is `'binary'`, this event is fired when received all the chunked
data and completed to unchunk.

| Name | Type | Description            |
|------|------|------------------------|
| data | *    | The data which received. |

```js
dataConnection.on('data', data => {
  // ...
});
```

### Event: `'close'`

Fired when call [`DataConnection#close()`](#close), or the data connection is
closed.

```js
dataConnection.on('close', () => {
  // ...
});
```

### Event: `'error'`

Fired when call [`DataConnection#send()`](#send), but the data connecion is not opened yet.

```js
dataConnection.on('error', () => {
  // ...
});
```

[RTCDataChannelInit]: https://w3c.github.io/webrtc-pc/#dom-rtcdatachannelinit
