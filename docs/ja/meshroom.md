メッシュ接続でのルームを管理するクラスです。

## Constructor

SDK内部の利用のみで、コンストラクタは通常利用しません。 
MeshRoomのインスタンスは、`joinRoom()` で生成されます。

### Sample

```js
meshRoom = peer.joinRoom('roomName');
```

## Methods

### close

ルームを退出し、ルーム内のすべてのユーザーとのコネクションをcloseします

#### Parameters

None

#### Return value 

`undefined`

#### Sample

```js
room.close();
```

### getLog

シグナリングサーバにルームのログ取得を要求します。
シグナリングサーバからログを受信すると、`log`イベントが発火します。

#### Parameters

None

#### Return value 

`undefined`

#### Sample

```js
room.getLog();
```

### replaceStream

送信しているMediaStreamを更新します。受信のみモードから双方向に切り替えできます。
また、音声のみのストリームから、音声＋映像のストリームへの変更もできます。

#### Parameters

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| stream | MediaStream | | | 交換対象となる新しいMediaStreamです。 |

#### Return value 

`undefined`

#### Sample

```js
// newStream
meshRoom.replaceStream(newStream);
```

### send

WebSocketを使用してルーム内の全てのユーザーにデータを送信します。

#### Parameters

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| data | * | ✔ | | 送信するデータです。|

### getRTCPeerConnections

このMeshRoomが利用してるRTCPeerConnectionを取得します。
上級ユーザのみご利用ください。RTCPeerConnectionを変更した場合の動作は保証できません。

#### Parameters

None

#### Return value 

ルーム内の各コネクションのキーがPeerIDで値が[RTCPeerConnection](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection)になっているオブジェクト。

例：
```json
{
  peerId1: rtcPeerConnection1,
  peerId2: rtcPeerConnection2,
  peerId3: rtcPeerConnection3
}
```

#### Sample

```js
// RTCPeerConnectionのインスタンスを取得
const pcs = room.getRTCPeerConnections();

// getStatsでpeerId1とのセッションの統計データを取得
pcs.peerId1.getStats(stats => {
  ...
});
```

## Events

### open

新規にPeerがルームへ入室したときに発生します。

### peerJoin

ルームに新しいPeerが参加したときに発生します。

|Type|Description|
|----|----|
|string|参加したPeerID|

### peerLeave

新規にPeerがルームを退出したときに発生します。

|Type|Description|
|----|----|
|string|退出したPeerID|

### log

ルームのログを受信したときに発生します。

|Type|Description|
|----|----|
|Array|ログの配列です|

### stream 

ルームにJoinしている他のユーザのストリームを受信した時に発生します。ストリーム送信元のpeerIdは stream.peerId で取得できます。

|Type|Description|
|----|----|
|MediaStream|MediaStreamのインスタンスです。|

#### Sample

```js
room.on('stream', stream =>{
  // Streamをvideoタグに設定など
});
```

### data

他のユーザーから送信されたデータを受信した時に発生します。

|Type|Description|
|----|----|
|object|[data object](#data-object)形式のオブジェクトです。|

#### data object

|Name|Type|Description|
|---|----|----|
|src|string|データを送信したPeerのIDです。|
|data|*|受信したデータです。|

### close

ルームをcloseしたときに発生します。

### removeStream

ルームから[MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream)が削除されたときに発生します。

|Type|Description|
|----|----|
|MediaStream|MediaStreamのインスタンスです。|

#### Sample

```js
meshRoom.on('removeStream', stream => {
  // 削除されたストリームを持つPeerIDを取得
  const peerId = stream.peerId;
}
```