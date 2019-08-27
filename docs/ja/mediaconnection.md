接続先Peerへのメディアチャネル接続を管理するクラスです。

SDK内部の利用のみで、コンストラクタは通常利用しません。
`MediaConnection`インスタンスは、[`Peer#call()`](../peer/#callpeerid-stream-options) および[`Peer`](../peer/)の[`call`イベント](../peer/#event-call) で生成されます。

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

| Name        | Type          | Description                                                                                                                                                                                                                                                                                                                                         |
|-------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| type        | string        | コネクションタイプを示す文字列です。MediaConnectionでは、この値は`'media'` です。                                                                                                                                                                                                                                                                   |
| metadata    | Object        | 発信側が[`Peer#call()`](../peer/#callpeerid-stream-options)実行時に指定した`metadata`です。着信側では、発信側が指定した値になります。                                                                                                                                                                                                               |
| localStream | [MediaStream] | [`Peer#call()`](../peer/#callpeerid-stream-options)あるいは[`MediaConnection#answer()`](#answerstream-options)で指定した自身のMediaStreamです。                                                                                                                                                                                                     |
| open        | boolean       | コネクションがオープンしているかどうかを示します。[`MediaConnection`](./)の[`stream`イベント](#event-stream)または [`MediaConnection#answer()`](#answerstream-options) が呼び出された際にオープンし、 [`MediaConnection#close()`](#close)が呼び出されたまたは[`MediaConnection`](./)の[`close`イベント](#event-close)が発生した際にクローズします。 |
| remoteId    | string        | 接続先PeerのPeer IDです。                                                                                                                                                                                                                                                                                                                           |
| peer        | string        | **Deprecated!** 接続先PeerのPeer IDです。remoteIdを使ってください。                                                                                                                                                                                                                                                                                 |
| id          | string        | コネクションを識別するIDです。                                                                                                                                                                                                                                                                                                                      |

## Methods

### `answer(stream[, options])`

発信側からのメディアチャネル接続の接続要求に対して応答します。

#### Parameters

| Name    | Type                                            | Required | Default | Description                                     |
|---------|-------------------------------------------------|----------|---------|-------------------------------------------------|
| stream  | [MediaStream]                                   | ✔        |         | 発信側のPeerへ送るMediaStreamオブジェクトです。 |
| options | [answer options object](#answer-options-object) |          |         | 応答時に付与するオプションです。                |

##### answer options object

| Name                | Type    | Required | Default | Description                                                                                                                                |
|---------------------|---------|----------|---------|--------------------------------------------------------------------------------------------------------------------------------------------|
| videoBandwidth      | number  |          |         | 接続先Peerから受信する映像の最大帯域幅(kbps)です。                                                                                         |
| audioBandwidth      | number  |          |         | 接続先Peerから受信する音声の最大帯域幅(kbps)です。                                                                                         |
| videoCodec          | string  |          |         | `'H264'`などの映像コーデックです。                                                                                                         |
| audioCodec          | string  |          |         | `'PCMU'`などの音声コーデックです。                                                                                                         |

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

### `close(forceClose)`

接続先PeerとのMediaConnectionの接続を切断します。

#### Parameters

| Name       | Type    | Required | Default | Description                                                                                                                                           |
|------------|---------|----------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| forceClose | boolean |          | false   | この値が`true`の場合、相手のMediaConnectionも即座にcloseします。`false`の場合相手は、ブラウザによるice再接続が失敗してからコネクションをcloseします。 |

#### Return value

`undefined`

### `replaceStream(stream)`

送信しているMediaStreamを更新します。
受信のみモードでメディアチャネル接続を行なっている状態で、
新しいMediaStreamがメディアトラックを持つ場合、自動的に送受信モードに切り替わります。

#### Parameters

| Name   | Type          | Required | Default | Description                             |
|--------|---------------|----------|---------|-----------------------------------------|
| stream | [MediaStream] | ✔        |         | 更新対象となる新しいMediaStreamです。 |

#### Return value

`undefined`

### `getPeerConnection()`

接続先PeerとのMediaConnectionが内部的に使用している `RTCPeerConnection` を取得します。
コネクションの`open`プロパティが`false`の場合は、 `null` が返ります。

!!! 注意
  `RTCPeerConnection`を直接操作すると、SDKは正しく動作しなくなる可能性があります。

#### Return value

[RTCPeerConnection] のインスタンス または `null`

#### Sample

```js
if (mediaConnection.open) {
  const pc = mediaConnection.getPeerConnection();

  // ...
}
```

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

### Event: `'close'`

[`MediaConnection#close()`](#close)が呼ばれたとき、または接続先Peerとのメディアチャネル接続が切断されたときに発生します。

```js
mediaConnection.on('close', () => {
  // ...
});
```

[MediaStream]: https://w3c.github.io/mediacapture-main/#mediastream
[RTCPeerConnection]: https://w3c.github.io/webrtc-pc/#rtcpeerconnection-interface
