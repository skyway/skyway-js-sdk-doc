接続先Peerへのメディアチャネル接続を管理するクラスです。

## Constructor

SDK内部の利用のみで、コンストラクタは通常利用しません。
MediaConnectionは、[call](../peer/#call) および [peer.on('call')](../peer/#call_1) で生成されます。

`MediaConnection`は、[EventEmitter](https://nodejs.org/api/events.html)を継承しているため、`on`や`off`、`once`などのメソッドも利用できます。

### Sample

```js
// 発信側
const mediaConnection = peer.call('peerID', mediaStream);

// 着信側
peer.on('call', mediaConnection => {
  // peerのメディアストリームで応答する
  mediaConnection.answer(mediaStream);
});
```

## Members

| Name     | Type    | Description                                                                                                                                                                                                            |
|----------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata | Object  | [peer.call](../peer/#call) で指定した `metadata` です。着信側には、シグナリングサーバを経由して送信されます。                                                                                                          |
| open     | boolean | コネクションがオープンしているかどうかを示します。[peer.call](../peer/#call) または [MediaConnection.answer](#answer) が呼び出された際にオープンし、[MediaConnection.close](#close) が呼び出された際にクローズします。 |
| remoteId | string  | 接続先PeerのPeerIDです。                                                                                                                                                                                               |
| peer     | string  | *Deprecated* 接続先PeerのPeerIDです。remoteIdを使ってください。                                                                                                                                                        |

#### Sample

```js
// 発信側が metadata: { foo: 'bar' } を設定した場合
peer.on('call', mediaConnection => {
  console.log(mediaConnection.metadata);
  // => {foo: "bar"}
});
```

## Methods

### answer

発信側からの接続要求に対して応答します。

#### Parameters

| Name    | Type                                            | Required | Default | Description                                                      |
|---------|-------------------------------------------------|----------|---------|------------------------------------------------------------------|
| stream  | [MediaStream]                                   | ✔        |         | 発信側のPeerへ送る[MediaStream]オブジェクトです。                |
| options | [answer options object](#answer-options-object) |          |         | 応答時に付与するオプションです。帯域幅・コーデックを指定します。 |

##### answer options object

| Name                | Type    | Required | Default | Description                                                                                                                             |
|---------------------|---------|----------|---------|-----------------------------------------------------------------------------------------------------------------------------------------|
| videoBandwidth      | number  |          |         | 接続先Peerから受信する映像の最大帯域幅(kbps)です。                                                                                          |
| audioBandwidth      | number  |          |         | 接続先Peerから受信する音声の最大帯域幅(kbps)です。                                                                                          |
| videoCodec          | string  |          |         | `'H264'`などの映像コーデックです。                                                                                                      |
| audioCodec          | string  |          |         | `'PCMU'`などの音声コーデックです。                                                                                                      |
| videoReceiveEnabled | boolean |          |         | 映像を受信のみで使う場合のフラグです。この値が `false` で応答するstreamに映像トラックが含まれない場合、受信のみで映像の通信を行います。 |
| audioReceiveEnabled | boolean |          |         | 音声を受信のみで使う場合のフラグです。この値が `false` で応答するstreamに音声トラックが含まれない場合、受信のみで音声の通信を行います。 |

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

### close

接続先PeerとのMediaConnectionの接続を切断します。

#### Parameters

None

#### Return value 

`undefined`

#### Sample

```js
btnEl.addEventListener('click', e => {
  console.log("Closing MediaConnection.");
  mediaConnection.close();
});
```

### replaceStream

送信しているMediaStreamを更新します。受信のみモードから双方向に切り替えできます。
また、音声のみのストリームから、音声＋映像のストリームへの変更もできます。

#### Parameters

| Name   | Type          | Required | Default | Description                           |
|--------|---------------|----------|---------|---------------------------------------|
| stream | [MediaStream] | ✔        |         | 更新対象となる新しいMediaStreamです。 |

#### Return value 

`undefined`

#### Sample

```js
// newStream に置き換える
const newStream = await navigator.mediaDevices.getDisplayMedia({video:true});
mediaConnection.replaceStream(newStream);
```

## Events

### stream 

MediaStreamを受信したときに発生します。

#### Parameter

| Type          | Description                     |
|---------------|---------------------------------|
| [MediaStream] | MediaStreamのインスタンスです。 |

#### Sample

```js
mediaConnection.on('stream', async stream => {
  videoEl.srcObject = stream;
  await remoteVideo.play().catch(console.error);
});
```

### removeStream

成立したMediaConnectionからMediaStreamが削除されたときに発生します。

#### Parameter

| Type          | Description                     |
|---------------|---------------------------------|
| [MediaStream] | MediaStreamのインスタンスです。 |

```js
mediaConnection.once('removeStream', stream => {
  videoEl.srcObject.getTracks().forEach(track => track.stop());
  videoEl.srcObject = null;
});
```

### close

[MediaConnection.close](#close) が呼ばれたとき、及び接続先PeerとのWebRTC通信が切断されたときに発生します。

#### Parameter
None

#### Sample

```js
mediaConnection.once('close', () => {
  videoEl.srcObject.getTracks().forEach(track => track.stop());
  videoEl.srcObject = null;
});
```

### candidate *(実験的な機能)*

ICE候補が生成されたときに発生します。

#### Parameter

| Type             | Description                                       |
|------------------|---------------------------------------------------|
| candidate object | ICE候補とSkyWayのPeer情報を持つオブジェクトです。 |

##### candidate object

| Property       | Type              | Description                                                  |
|----------------|-------------------|--------------------------------------------------------------|
| candidate      | [RTCIceCandidate] | 生成されたICE候補です。                                      |
| dst            | string            | 接続先PeerのPeerIDです。                                     |
| connectionId   | string            | コネクションを識別するIDです。                               |
| connectionType | string            | コネクションのタイプです。`'media'` か `'data'` が入ります。 |


### offer *(実験的な機能)*

PeerのsetLocalDescriptionが正常に成功した際に発生します。

| Type                                  | Description                                         |
|---------------------------------------|-----------------------------------------------------|
| [offer sdp object](#offer-sdp-object) | Offer SDPとSkyWayのPeer情報を持つオブジェクトです。 |

##### offer sdp object

| Property       | Type                    | Description                                                                          |
|----------------|-------------------------|--------------------------------------------------------------------------------------|
| offer          | [RTCSessionDescription] | 生成されたOffer SDPです。                                                            |
| dst            | string                  | 接続先PeerのPeerIDです。                                                             |
| connectionId   | string                  | コネクションを識別するIDです。                                                       |
| connectionType | string                  | コネクションのタイプです。`'media'` か `'data'` が入ります。                         |
| metadata       | Object                  | [peer.call](../peer/#call) で指定した `metadata` です。                              |
| browser        | Object                  | ブラウザ名とバージョン情報です。異なるブラウザ間でのWebRTC接続確立のために用います。 |


### answer *(実験的な機能)*

PeerのcreateAnswerが正常に成功した際に発生します。

| Type                                    | Description                                          |
|-----------------------------------------|------------------------------------------------------|
| [answer sdp object](#answer-sdp-object) | Answer SDPとSkyWayのPeer情報を持つオブジェクトです。 |

##### answer sdp object

| Property       | Type                    | Description                                                                          |
|----------------|-------------------------|--------------------------------------------------------------------------------------|
| answer         | [RTCSessionDescription] | 生成されたAnswer SDPです。                                                           |
| dst            | string                  | 接続先PeerのPeerIDです。                                                             |
| connectionId   | string                  | コネクションを識別するIDです。                                                       |
| connectionType | string                  | コネクションのタイプです。`'media'` か `'data'` が入ります。                         |
| metadata       | Object                  | [peer.call](../peer/#call) で指定した `metadata` です。                              |
| browser        | Object                  | ブラウザ名とバージョン情報です。異なるブラウザ間でのWebRTC接続確立のために用います。 |


[MediaStream]: https://developer.mozilla.org/ja/docs/Web/API/MediaStream
[RTCIceCandidate]: https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate
[RTCSessionDescription]: https://developer.mozilla.org/en-US/docs/Web/API/RTCSessionDescription
