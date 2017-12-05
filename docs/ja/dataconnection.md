接続先Peerへのデータチャネル接続を管理するクラスです。

## Constructor

SDK内部の利用のみで、コンストラクタは通常利用しません。 
DataConnectionは、`connect()` および `peer.on('connection')` で生成されます。

### Sample

```js
// 発信側
dataConnection = peer.connect('peerID');

// 着信側
peer.on('connection', connection => {
  console.log(connection);
});
```

## Members

|Name|Type|Description|
|----|----|----|
|metadata|object|任意の情報を格納するオブジェクトです。|
|open|boolean|コネクションがオープンしているかどうかを示します。|
|remoteId|string|接続先のPeerIDです。|
|peer|string|*Deprecated* 接続先のPeerIDです。remoteIdを使ってください。|

#### Sample

```js
peer.on('connection', connection => {
  // metadataが付与されていた場合
  console.log(connection.metadata);
  // => connect時に付与した、metadataを参照する
});
```

## Methods

### send

接続先のPeerにデータを送信します。シリアライズ方法が'binary'である場合は、送信前に分割します。

#### Parameters

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| data | * | ✔ | | 接続先のPeerに送るデータです。|

#### Return value 

`undefined`

#### Sample

```js
// 'hello world'という文字列を送付します。 
dataConnection.send('hello world');

// 受信側では、次のように発火します。
dataConnection.on('data', data => {
  console.log('hello world');
  // => 'hello world'
});
```

### close

接続先PeerとのMediaConnectionを接続を切断します。

#### Parameters

None

#### Return value 

`undefined`

#### Sample

```js
call.close();
```

## Events

### data

データを受信したときに発生します。

| Type | Description |
| --- | --- | 
| * | 受信したデータです。|

#### Sample

```js
dataConnection.on('data', data => {
  console.log('hello world');
  // => 'hello world'
});
```

### close

DataConnectionが切断されたときに発生します。
