接続先Peerへのデータチャネル接続を管理するクラスです。

## Constructor

SDK内部の利用のみで、コンストラクタは通常利用しません。
`DataConnection`インスタンスは、[`Peer#connect()`](../peer/#connect) および[`Peer`](../peer/)の[`connection`イベント](../peer/#connection) で生成されます。

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

| Name     | Type    | Description                                                                                                                                                                                                                   |
|----------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata | Object  | [`Peer#connect()`](../peer/#connect) で指定した `metadata` です。着信側には、シグナリングサーバを経由して送信されます。                                                                                                       |
| open     | boolean | コネクションがオープンしているかどうかを示します。[`Peer#connect()`](#../peer/#connect)が呼び出された際にオープンし、[`DataConnection#close()`](#close)が呼び出されたまたはデータチャネル接続が切断された際にクローズします。 |
| remoteId | string  | 接続先PeerのPeerIDです。                                                                                                                                                                                                      |
| peer     | string  | *(deprecated)* 接続先PeerのPeerIDです。remoteIdを使ってください。                                                                                                                                                             |

## Methods

### send()

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
dataConnection.on('data', { name, msg } => {
  console.log(`${name}: ${msg}`);
  // => 'SkyWay: Hello, World!'
});
```

### close()

接続先PeerとのDataConnectionの接続を切断します。

#### Parameters
None

#### Return value
`undefined`


## Events

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
