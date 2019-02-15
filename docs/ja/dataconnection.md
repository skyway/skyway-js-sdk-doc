接続先Peerへのデータチャネル接続を管理するクラスです。

SDK内部の利用のみで、コンストラクタは通常利用しません。
`DataConnection`インスタンスは、[`Peer#connect()`](../peer/#connectpeerid-options) および[`Peer`](../peer/)の[`connection`イベント](../peer/#event-connection) で生成されます。

### Sample

```js
// 発信側
const dataConnection = peer.connect('peerID');

// 着信側
peer.on('connection', dataConnection => {
  // ...
});
```

## Members

| Name          | Type                 | Description                                                                                                                                                                                                                               |
|---------------|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| type          | string               | コネクションタイプを示す文字列です。DataConnectionでは、この値は`'data'` です。                                                                                                                                                           |
| metadata      | Object               | [`Peer#connect()`](../peer/#connectpeerid-options) で指定した`metadata`です。着信側には、シグナリングサーバを経由して送信されます。                                                                                                       |
| serialization | string               | [`Peer#connect()`](../peer/#connectpeerid-options) で指定した `serialization` です。着信側には、シグナリングサーバを経由して送信されます。                                                                                                |
| dcInit        | [RTCDataChannelInit] | [`Peer#connect()`](../peer/#connectpeerid-options) で指定した `dcInit` です。着信側には、シグナリングサーバを経由して送信されます。                                                                                                       |
| open          | boolean              | コネクションがオープンしているかどうかを示します。[`DataConnection`](./)の[`open`イベント](#event-open)が発生した際にオープンし、[`DataConnection#close()`](#close)が呼び出されたまたはデータチャネル接続が切断された際にクローズします。 |
| remoteId      | string               | 接続先PeerのPeer IDです。                                                                                                                                                                                                                 |
| peer          | string               | **Deprecated!** 接続先PeerのPeer IDです。remoteIdを使ってください。                                                                                                                                                                       |
| id            | string               | コネクションを識別するIDです。                                                                                                                                                                                                            |

## Methods

### `send(data)`

接続先Peerにデータを送信します。シリアライズ方法が`'binary'`である場合は、送信前に分割します。

#### Parameters

| Name | Type | Required | Default | Description                    |
|------|------|----------|---------|--------------------------------|
| data | *    | ✔        |         | 接続先のPeerへ送るデータです。 |

#### Return value

`undefined`

#### Sample

```js
// データを送信する
const data = {
  name: 'SkyWay',
  msg: 'Hello, World!'
};
dataConnection.send(data);

// データを受信する
dataConnection.on('data', ({ name, msg }) => {
  console.log(`${name}: ${msg}`);
  // => 'SkyWay: Hello, World!'
});
```

### `close()`

接続先PeerとのDataConnectionの接続を切断します。

#### Return value

`undefined`

## Events

### Event: `'open'`

データチャネルが接続されたときに発生します。

```js
dataConnection.on('open', () => {
  // ...
});
```

### Event: `'data'`

接続先のPeerからデータを受信したときに発生します。
シリアライズ方法が`'binary'`である場合は、分割されたデータすべてを受信し、再結合が完了したときに発生します。

| Name | Type | Description          |
|------|------|----------------------|
| data | *    | 受信したデータです。 |

```js
dataConnection.on('data', data => {
  // ...
});
```

### Event: `'close'`

[`DataConnection#close()`](#close)が呼ばれたとき、または接続先Peerとのデータチャネル接続が切断されたときに発生します。

```js
dataConnection.on('close', () => {
  // ...
});
```

[RTCDataChannelInit]: https://w3c.github.io/webrtc-pc/#dom-rtcdatachannelinit
