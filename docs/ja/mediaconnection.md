接続先Peerへのメディアチャネル接続を管理するクラスです。

## Constructor

SDK内部の利用のみで、コンストラクタは通常利用しません。
`MediaConnection`インスタンスは、[`Peer#call()`](../peer/#call) および[`Peer`](../peer/)の[`call`イベント](../peer/#call_1) で生成されます。

### Sample

```js
// 発信側
const mediaConnection = peer.call('peerID', mediaStream);

// 着信側
peer.on('call', mediaConnection => {
  // MediaStreamで応答する
  mediaConnection.answer(mediaStream);
});
```

## Members

| Name     | Type    | Description                                                                                                                                                                                                                                                                                            |
|----------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata | Object  | [`Peer#call()`](../peer/#call) で指定した`metadata`です。着信側には、シグナリングサーバを経由して送信されます。                                                                                                                                                                                        |
| open     | boolean | コネクションがオープンしているかどうかを示します。[`Peer#call()`](../peer/#call) または [`MediaConnection#answer()`](#answer) が呼び出された際にオープンし、 [`MediaConnection#close()`](#close)が呼び出されたまたは[`MediaConnection`](./)の[`close`イベント](#close_1)が発生した際にクローズします。 |
| remoteId | string  | 接続先PeerのPeer IDです。                                                                                                                                                                                                                                                                               |
| peer     | string  | **Deprecated!** 接続先PeerのPeer IDです。remoteIdを使ってください。                                                                                                                                                                                                                                      |

## Methods

### answer()

発信側からのメディアチャネル接続の接続要求に対して応答します。

#### Parameters

| Name    | Type                                            | Required | Default | Description                                       |
|---------|-------------------------------------------------|----------|---------|---------------------------------------------------|
| stream  | [MediaStream]                                   | ✔        |         | 発信側のPeerへ送る[MediaStream]オブジェクトです。 |
| options | [answer options object](#answer-options-object) |          |         | 応答時に付与するオプションです。                  |

##### answer options object

| Name                | Type    | Required | Default | Description                                                                                                                                |
|---------------------|---------|----------|---------|--------------------------------------------------------------------------------------------------------------------------------------------|
| videoBandwidth      | number  |          |         | 接続先Peerから受信する映像の最大帯域幅(kbps)です。                                                                                         |
| audioBandwidth      | number  |          |         | 接続先Peerから受信する音声の最大帯域幅(kbps)です。                                                                                         |
| videoCodec          | string  |          |         | `'H264'`などの映像コーデックです。                                                                                                         |
| audioCodec          | string  |          |         | `'PCMU'`などの音声コーデックです。                                                                                                         |
| videoReceiveEnabled | boolean |          | `true`  | 映像を受信のみで使う場合のフラグです。この値が`true`かつ応答する`stream`に映像トラックが含まれない場合、受信のみで映像の通信を行います。   |
| audioReceiveEnabled | boolean |          | `true`  | 音声を受信のみで使う場合のフラグです。この値が`true`かつ応答する`stream`に音声トラックが含まれない場合、受信のみで音声の通信を行います。   |

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

### close()

接続先PeerとのMediaConnectionの接続を切断します。

#### Parameters

None

#### Return value 

`undefined`

### replaceStream()

送信しているMediaStreamを更新します。
受信のみモードでメディアチャネル接続を行なっている状態で、
新しいMediaStreamがメディアトラックを持つ場合、自動的に送受信モードに切り替わります。

#### Parameters

| Name   | Type          | Required | Default | Description                             |
|--------|---------------|----------|---------|-----------------------------------------|
| stream | [MediaStream] | ✔        |         | 更新対象となる新しいMediaStreamです。 |

#### Return value 

`undefined`

## Events

### Event: `'stream'`

MediaStreamを受信したときに発生します。

| Name   | Type          | Description                       |
|--------|---------------|-----------------------------------|
| stream | [MediaStream] | MediaStreamのインスタンスです。 |

```js
mediaConnection.on('stream', stream => {
  // ...
});
```

### Event: `'removeStream'` **Deprecated!**

*このイベントは現在非推奨です。*

相手のMediaStreamが接続中のMediaConnectionから削除されたときに発生します。

| Name   | Type          | Description                     |
|--------|---------------|---------------------------------|
| stream | [MediaStream] | MediaStreamのインスタンスです。 |

```js
mediaConnection.on('removeStream', stream => {
  // ...
});
```

### Event: `'close'`

[`MediaConnection#close()`](#close)が呼ばれたとき、または接続先Peerとのメディアチャネル接続が切断されたときに発生します。

```js
mediaConnection.on('close', () => {
  // ...
});
```


[MediaStream]: https://w3c.github.io/mediacapture-main/#mediastream
