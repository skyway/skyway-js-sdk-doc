メッシュ接続でのルームを管理するクラスです。

## Constructor

SDK内部の利用のみで、コンストラクタは通常利用しません。
MeshRoomのインスタンスは、[`Peer#joinRoom()`](../peer#joinroom) で生成されます。

### Sample

```js
const meshRoom = peer.joinRoom('roomName', {
  mode: 'mesh',
  stream: localStream,
});
meshRoom.on('open', () => {});
```

## Members

| Name        | Type   | Description                                        |
| ----------- | ------ | -------------------------------------------------- |
| name        | string | ルーム名です。                                     |
| connections | Object | Peer IDをキーに、ルーム内のコネクションを保持するオブジェクトです。 |

## Methods

### close()

ルームを退出し、ルーム内のすべてのユーザーとのコネクションをcloseします。

#### Parameters

None

#### Return value

`undefined`

### getLog()

シグナリングサーバにルームのログ取得を要求します。
シグナリングサーバからログを受信すると、`log`イベントが発火します。

#### Parameters

None

#### Return value

`undefined`

#### Sample

```js
room.once('log', log => {
  // ...
});
room.getLog();
```

### replaceStream()

送信しているMediaStreamを更新します。受信のみモードから双方向に切り替えできます。
また、音声のみのストリームから、音声＋映像のストリームへの変更もできます。

#### Parameters

| Name   | Type        | Required | Default | Description                           |
| ------ | ----------- | -------- | ------- | ------------------------------------- |
| stream | MediaStream | ✔         |         | 新しいMediaStreamです。 |

#### Return value

`undefined`

### send()

WebSocketを使用してルーム内の全てのユーザーにデータを送信します。

#### Parameters

| Name | Type | Required | Default | Description          |
| ---- | ---- | -------- | ------- | -------------------- |
| data | *    | ✔        |         | 送信するデータです。 |

#### Return value

`undefined`

## Events

### Event: `'open'`

新規にPeerがルームへ入室したときに発生します。

```js
room.on('open', () => {
  // ...
});
```

### Event: `'peerJoin'`

ルームに新しいPeerが参加したときに発生します。

| Name   | Type   | Description    |
| ------ | ------ | -------------- |
| peerId | string | 参加したPeerのIDです。 |

```js
room.on('peerJoin', peerId => {
  // ...
});
```

### Event: `'peerLeave'`

新規にPeerがルームを退出したときに発生します。

| Name   | Type   | Description    |
| ------ | ------ | -------------- |
| peerId | string | 退出したPeerのIDです。 |

```js
room.on('peerLeave', peerId => {
  // ...
});
```

### Event: `'log'`

ルームのログを受信したときに発生します。

| Name | Type     | Description                  |
| ---- | -------- | ---------------------------- |
| logs | string[] | ログ（JSON文字列）の配列です。 |

```js
room.once('log', logs => {
  for (const logStr of logs) {
    const { messageType, message, timestamp } = JSON.parse(logStr);
    // ...
  }
});
```

### Event: `'stream'`

ルームにJoinしている他のユーザのストリームを受信した時に発生します。ストリーム送信元のpeerIdは stream.peerId で取得できます。

| Name   | Type        | Description                     |
| ------ | ----------- | ------------------------------- |
| stream | MediaStream | MediaStreamのインスタンスです。 |

```js
room.on('stream', stream => {
  // ...
});
```

### Event: `'data'`

他のユーザーから送信されたデータを受信した時に発生します。

| Name | Type   | Description                                         |
| ---- | ------ | --------------------------------------------------- |
| data | object | [data object](#data-object)形式のオブジェクトです。 |


#### data object

| Name | Type   | Description                    |
| ---- | ------ | ------------------------------ |
| src  | string | データを送信したPeerのIDです。 |
| data | *      | 受信したデータです。           |

```js
room.on('data', ({ src, data }) => {
  // ...
});
```

### Event: `'close'`

ルームをcloseしたときに発生します。

```js
room.on('close', () => {
  // ...
});
```

### Event: `'removeStream'`

ルームから[MediaStream]が削除されたときに発生します。

| Name   | Type        | Description                     |
| ------ | ----------- | ------------------------------- |
| stream | [MediaStream] | [MediaStream]のインスタンスです。 |

```js
room.on('removeStream', stream => {
  // ...
});
```

[MediaStream]: https://w3c.github.io/mediacapture-main/#mediastream
