Class that manages fullmesh type room.

## Constructor

SDK内部の利用のみで、コンストラクタは通常利用しません。 
MediaConnectionは、`call` および `peer.on('call')` で生成されます。

### Sample

```js
// 発信側
mediaConnection = peer1.call('peerID', mediaStream);

// 着信側
peer2.on('call', call => {
  // peer2の持つメディアストリームで応答する
  call.answer(mediaStream2)
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
// 接続元が metadata: { foo: 'bar' } を設定した場合
peer.on('call', call => {
  console.log(call.metadata);
  // => {foo: "bar"}
});
```

## Methods

### answer

接続相手からの接続要求に対して応答します。

#### Parameters

| Name | Type | Require | Default | Description |
| --- | --- | --- | --- | --- |
| stream | MediaStream | ★ | | リモートのPeerへ送るメディアストリームです。|
| options | [answer options object](#answer-options-object) | | |応答時に付与するオプションです。帯域幅・コーデックを指定します。 |

##### answer options object

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| videoBandwidth | number | | | 接続先から受信する映像の最大帯域幅(kbps)です。 |
| audioBandwidth | number | | | 接続先から受信する音声の最大帯域幅(kbps)です。 |
| videoCodec | string | | | 'H264'などの映像コーデックです。 |
| audioCodec | string | | | 'PCMU'などの音声コーデックです。 |

#### Return value 

`undefined`

#### Sample

```js
// 相手から発信を受けて
peer.on('call', call => {
  call.answer(mediaStream);
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

### replaceStream

送信しているMediaStreamを更新します。受信のみモードから双方向に切り替えできます。
また、音声のみのストリームから、音声＋映像のストリームへの変更もできます。

#### Parameters

| Name | Type | Optional | Default | Description |
| --- | --- | --- | --- | --- |
| stream | MediaStream | | | 交換対象となる新しいMediaStreamです。 |

#### Return value 

`undefined`

#### Sample

```js
// newStream
call.replaceStream(newStream);
```

## Events

### stream 

MediaStreamを受信したときに発生します。

|Type|Description|
|----|----|
|MediaStream|MediaStreamのインスタンスです。|

#### Sample

```js
call.on('stream', stream => {
  console.log(stream);
});
```

### close

MediaConnectionが切断されたときに発生します。

### removeStream

[MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream)が削除されたときに発生します。

|Type|Description|
|----|----|
|MediaStream|MediaStreamのインスタンスです。|

