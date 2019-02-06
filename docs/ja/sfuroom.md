SFU接続でのルームを管理するクラスです。

## `Constructor`

SDK内部の利用のみで、コンストラクタは通常利用しません。
SFURoomのインスタンスは、[`Peer#joinRoom()`](../peer#joinroom) で生成されます。

### Sample

```js
const sfuRoom = peer.joinRoom('roomName', {
  mode: 'sfu',
  stream: localStream,
});
sfuRoom.on('open', () => {});
```

## Members

| Name          | Type     | Description                                                      |
| ------------- | -------- | ---------------------------------------------------------------- |
| name          | string   | ルーム名です。                                                   |
| remoteStreams | Object   | Peer IDをキーに、ルーム内のストリームを保持するオブジェクトです。 |
| members       | string[] | ルーム内に参加しているPeer IDの配列です。                        |

## Methods

### `close()`

ルームを退出し、SFUとサーバーのコネクションを切断します。

#### Return value

`undefined`

### `getLog()`

シグナリングサーバにルームのログ取得を要求します。
シグナリングサーバからログを受信すると、[`log`イベント](#event-log)が発火します。

#### Return value

`undefined`

#### Sample

```js
room.once('log', log => {
  // ...
});
room.getLog();
```

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

### `send(data)`

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

ルームにJoinしている他のユーザのストリームを受信した時に発生します。
ストリーム送信元のPeer IDは`stream.peerId`で取得できます。

| Name   | Type        | Description                     |
| ------ | ----------- | ------------------------------- |
| stream | [MediaStream] | MediaStreamのインスタンスです。 |

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

### Event: `'removeStream'` **Deprecated!**

*!!! このイベントは現在非推奨です。 !!!*

MediaStreamがルーム内のMediaConnectionから削除されたときに発生します。

| Name   | Type        | Description                     |
| ------ | ----------- | ------------------------------- |
| stream | [MediaStream] | MediaStreamのインスタンスです。 |

```js
room.on('removeStream', stream => {
  // ...
});
```

[MediaStream]: https://w3c.github.io/mediacapture-main/#mediastream
