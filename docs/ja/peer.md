P2P接続およびルーム接続機能を操作するためのクラスです。SkyWayを利用するために、最初にPeerインスタンス生成が必要です。

## Constructor

新規にPeerインスタンスを生成します。
`new Peer()` により、SkyWayのシグナリングサーバと接続します。

### Parameter

| Name    | Type                              | Required | Default | Description                                      |
| ------- | --------------------------------- | -------- | ------- | ------------------------------------------------ |
| id      | string                            |          |         | ユーザのPeer IDです。                            |
| options | [options object](#options-object) | ✔        |         | 接続に関するパラメータを指定するオプションです。 |

#### options object

| Name       | Type                                                                                    | Required | Default                                                             | Description                                                                                                                                                                       |
| ---------- | --------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key        | string                                                                                  | ✔        |                                                                     | SkyWayのAPIキーです。                                                                                                                                                             |
| debug      | number                                                                                  |          | NONE: 0                                                                    | ログレベル： NONE:0、 ERROR:1、 WARN:2、 FULL:3 から選択できます。                                                                                                                |
| turn       | boolean                                                                                 |          | true                                                                    | SkyWayで提供するTURNを使うかどうかのフラグです。                                                                                                                                  |
| credential | [credential object](#credential-object)                                                 |          |                                                                     | Peerを認証するためのクレデンシャルです。認証機能が有効の場合のみ使えます。詳細は[認証リポジトリ](https://github.com/skyway/skyway-peer-authentication-samples)をご確認ください。  |
| config     | [RTCConfiguration] |          | [Default RTCConfiguration object](#default-rtcconfiguration-object) | RTCPeerConnectionに渡される[RTCConfiguration]です。発展的なオプションのため、内容を理解している場合のみご利用ください。 |

#### credential object

<!-- textlint-disable -->

| Name      | Type   | Required | Default | Description                                                                  |
| --------- | ------ | -------- | ------- | ---------------------------------------------------------------------------- |
| timestamp | number |          |         | 現在のUNIXタイムスタンプです。                                               |
| ttl       | number |          |         | Time to live(ttl)。タイムスタンプ + ttl の時間でクレデンシャルが失効します。 |
| authToken | string |          |         | HMACを利用して生成する認証用トークンです。                                   |

<!-- textlint-enable -->

#### Default RTCConfiguration object

```js
const defaultConfig = {
  iceServers: [{
    urls: 'stun:stun.webrtc.ecl.ntt.com:3478',
    url:  'stun:stun.webrtc.ecl.ntt.com:3478',
  }],
  iceTransportPolicy: 'all',
  sdpSemantics: 'plan-b',
};
```
### Sample

```js
// デバッグ情報を最大(3)にして接続する場合
const peer = new Peer({
  key:   "<YOUR-API-KEY>"
  debug: 3,
});
```

```js
// TURNサーバを強制利用する場合
const peer = new Peer({
  key:   "<YOUR-API-KEY>"
  debug: 3,
  config: {
    iceTransportPolicy: 'relay',
  },
});
```

## Members

| Name        | Type    | Description                                                      |
| ----------- | ------- | ---------------------------------------------------------------- |
| id          | string  | ユーザーが指定したPeer ID、もしくはサーバが生成したPeer IDです。 |
| open        | boolean | シグナリングサーバへの接続状況を保持します。                     |
| connections | Object  | 全てのコネクションを保持するオブジェクトです。                   |
| rooms       | Object  | 全てのルームを保持するオブジェクトです。                         |
| options     | Object  | [Constructor()](#constructor)での指定と、SDKのデフォルト設定を反映したオブジェクトです。                                                                 |

## Methods

### call()

指定したPeerにメディアチャネル(音声・映像)で接続して、MediaConnectionを作成します。 オプションを指定することで、帯域幅・コーデックなどを指定できます。

#### Parameters

| Name    | Type                                        | Required | Default | Description                                                                                     |
| ------- | ------------------------------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------- |
| peerId  | string                                      | ✔        |         | 接続先のPeer IDです。                                                                           |
| stream  | [MediaStream]                                 |          |         | 接続先のPeerへ送るメディアストリームです。 設定されていない場合は、受信のみモードで発信します。 |
| options | [call options object](#call-options-object) |          |         | 発信時に付与するオプションです。帯域幅・コーデックなどを指定します。                            |

##### call options object

| Name                | Type    | Required | Default | Description                                                                |
| ------------------- | ------- | -------- | ------- | -------------------------------------------------------------------------- |
| metadata            | Object  |          |         | コネクションに関連付けされる任意のメタデータで、接続先のPeerに渡されます。 |
| videoBandwidth      | number  |          |         | 接続先から受信する映像の最大帯域幅(kbps)です。                             |
| audioBandwidth      | number  |          |         | 接続先から受信する音声の最大帯域幅(kbps)です。                             |
| videoCodec          | string  |          |         | 'H264'などの映像コーデックです。                                           |
| audioCodec          | string  |          |         | 'PCMU'などの音声コーデックです。                                           |
| videoReceiveEnabled | boolean |          |         | 映像を受信のみで使う場合のフラグです。                                     |
| audioReceiveEnabled | boolean |          |         | 音声を受信のみで使う場合のフラグです。                                     |
| connectionId        | string  |          |         | コネクションを識別するIDです。                                             |
| label               | string  |          |         | **Deprecated!** 接続先のPeer IDを識別するのに利用するラベルです。          |

#### Return value

[MediaConnection](../mediaconnection)のインスタンス

#### Sample

```js
// 自身のlocalStreamを設定して、相手に発信する場合
const call = peer.call('peerID', localStream);
```

```js
// 自身のlocalStreamおよびmetadataを設定して、相手に発信する場合
const call = peer.call('peerID', localStream, {
  metadata: {
    foo: 'bar',
  }
});
```

```js
// 映像コーデックとしてH264を利用する場合
const call = peer.call('peerID', localStream, {
  videoCodec: 'H264',
});
```

```js
// 音声のみ接続先から受信する設定で、相手に発信する場合
const call = peer.call('peerID', null, {
  audioReceiveEnabled: true,
});
```

### connect()

指定したPeerにデータチャネルで接続して、DataConnectionインスタンスを生成します。

#### Parameters

| Name    | Type                                              | Required | Default | Description                      |
| ------- | ------------------------------------------------- | -------- | ------- | -------------------------------- |
| peerId  | string                                            | ✔        |         | 接続先のPeer IDです。            |
| options | [connect options object](#connect-options-object) |          |         | 接続時に付与するオプションです。 |

##### connect options object

| Name          | Type                                                                              | Required | Default  | Description                                                                                                                                                                           |
| ------------- | --------------------------------------------------------------------------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| metadata      | Object                                                                            |          |          | コネクションに関連付けされる任意のメタデータで、接続先のPeerに渡されます。                                                                                                            |
| serialization | string                                                                            |          | 'binary' | 送信時のシリアライズ方法を指定します。'binary'、'json'、'none'のいずれか、となります。                                                                                                |
| dcInit        | [RTCDataChannelInit] |          | {}       | DataChannel利用時に信頼性の有無を指定するためのオプションです。デフォルトでは信頼性有で動作します。なお、chromeは、`maxPacketLifetime` の代わりに、`maxRetransmitTime` を利用します。 |
| connectionId        | string  |          |         | コネクションを識別するIDです。                                             |
| label         | string                                                                            |          |          | **Deprecated!** 接続先のPeer IDを識別するのに利用するラベルです。                                                                                                                     |

#### Return value

[DataConnection](../dataconnection)のインスタンス

#### Sample

```js
// 単にDataChannelを接続する場合(デフォルトで信頼性有り)
peer.connect('peerId');
```

```js
// metadata付きでconnectする場合
peer.connect('peerId', {
  metadata: {
    hoge: "foobar",
  }
});
```

```js
// 信頼性無しモードでDataChannelを接続する場合
peer.connect('peerId', {
  dcInit: {
    // 最大2回、再送する
    maxRetransmits: 2,
  },
});
```

### destroy()

全てのコネクションを閉じ、シグナリングサーバへの接続を切断します。

#### Parameters

None

#### Return value

`undefined`

### disconnect()

シグナリングサーバへの接続を閉じ、disconnectedイベントを送出します。

#### Parameters

None

#### Return value

`undefined`

### reconnect()

シグナリングサーバへ再接続をします。

#### Parameters

None

#### Return value

`undefined`

### joinRoom()

メッシュ接続のルーム、またはSFU接続のルームに参加します。メッシュ接続およびSFU接続については[コチラ](https://webrtc.ecl.ntt.com/sfu.html)を確認ください。

#### Parameters

| Name        | Type                                        | Rquired | Default | Description                            |
| ----------- | ------------------------------------------- | ------- | ------- | -------------------------------------- |
| roomName    | string                                      | ✔       |         | 参加先のルームの名前です。             |
| roomOptions | [room options object](#room-options-object) |         | {}      | 接続時に選択・付与するオプションです。 |

##### room options object

| Name                | Type        | Required | Default | Description                                                          |
| ------------------- | ----------- | -------- | ------- | -------------------------------------------------------------------- |
| mode                | string      |          | 'mesh'  | 'sfu'または'mesh'を指定します。                                      |
| stream              | MediaStream |          |         | ユーザーが送信するメディアストリームです。                           |
| videoBandwidth      | number      |          |         | 映像の最大帯域幅(kbps)です。メッシュ接続のみ使用可能です。           |
| audioBandwidth      | number      |          |         | 音声の最大帯域幅(kbps)です。 メッシュ接続のみ使用可能です。          |
| videoCodec          | string      |          |         | 'H264'などの映像コーデックです。 メッシュ接続のみ使用可能です。      |
| audioCodec          | string      |          |         | 'PCMU'などの音声コーデックです。メッシュ接続のみ使用可能です。       |
| videoReceiveEnabled | boolean     |          |         | 映像を受信のみで使う場合のフラグです。メッシュ接続のみ使用可能です。 |
| audioReceiveEnabled | boolean     |          |         | 音声を受信のみで使う場合のフラグです。メッシュ接続のみ使用可能です。 |

#### Return value

[SFURoom](../sfuroom) または [MeshRoom](../meshroom) のインスタンス

#### Sample

```js
// Mesh接続を利用する場合
const room = peer.joinRoom('roomName', {
  mode: 'mesh',
  stream: localStream,
});
```

```js
// SFU接続を利用する場合
const room = peer.joinRoom('roomName', {
  mode: 'sfu',
  stream: localStream,
});
```

### listAllPeers()

REST APIを利用して、APIキーに紐づくPeerID一覧を取得します。

#### Parameters

Peer ID一覧を受け取る関数を指定します。

#### Return value

`undefined`

#### Sample

```js
peer.listAllPeers(peers => {
  console.log(peers)
  // => ["yNtQkNyjAojJNGrt", "EzAmgFhCKBQMzKw9"]
});
```

### getConnection()

作成したMediaConnectionおよびDataConnectionを取得します。

#### Parameters

| Name         | Type   | Required | Default | Description            |
| ------------ | ------ | -------- | ------- | ---------------------- |
| peerId       | string | ✔        |         | Peer IDです。          |
| connectionId | string | ✔        |         | コネクションのIDです。 |

#### Return value

[MediaConnection](../mediaconnection)のインスタンス、または[DataConnection](../dataconnection)のインスタンス、または`null`

### updateCredential()

Peer認証のクレデンシャルのTTLを延長するための更新リクエストの送付します。
Peer認証については、[コチラ](https://github.com/skyway/skyway-peer-authentication-samples)をご確認ください。

#### Parameters

| Name | Type                                    | Required | Default | Description                                    |
| ---- | --------------------------------------- | -------- | ------- | ---------------------------------------------- |
| mode | [credential object](#credential-object) | ✔        |         | ユーザー側で作成する新しいクレデンシャルです。 |

#### Return value

`undefined`

## Events

それぞれのイベント名は、`Peer`クラスの`EVENTS`プロパティからも参照できます。

```js
// これらは同じ意味
peer.on('open', () => {});
peer.on(Peer.EVENTS.open, () => {});
```

### Event: open

シグナリングサーバへ正常に接続できたときのイベントです。

| Name | Type   | Description |
| ---- | ------ | ----------- |
| id   | string | Peer ID     |

```js
peer.on('open', id => {
  // ...
});
```

### Event: call

接続先のPeerからメディアチャネル(音声・映像)の接続を受信したときのイベントです。

| Name | Type                                  | Description                           |
| ---- | ------------------------------------- | ------------------------------------- |
| call | [MediaConnection](../mediaconnection) | [MediaConnection](../mediaconnection)のインスタンスです。 |

```js
peer.on('call', call => {
  // ...
});
```

### Event: close

Peerに対する全ての接続を終了したときのイベントです。

```js
peer.on('close', () => {
  // ...
});
```

### Event: connection

接続先のPeerからDataChannelの接続を受信したときのイベントです。

| Name | Type                                | Description                        |
| ---- | ----------------------------------- | ---------------------------------- |
| conn | [DataConnection](../dataconnection) | [DataConnection](../dataconnection)のインスタンスです。 |


```js
peer.on('connection', conn => {
  // ...
});
```

### Event: disconnected

シグナリングサーバから切断したときのイベントです。

| Name | Type   | Description |
| ---- | ------ | ----------- |
| id   | string | Peer ID     |

```js
peer.on('disconnected', id => {
  // ...
});
```

### Event: expiresin

クレデンシャルが失効する前に発生するイベントです。

| Name | Type   | Description                                  |
| ---- | ------ | -------------------------------------------- |
| sec  | number | クレデンシャルが失効するまでの時間(秒)です。 |

```js
peer.on('expiresin', sec => {
  // ...
});
```

### Event: error

エラーが発生した場合のイベントです。

| Name  | Type  | Description              |
| ----- | ----- | ------------------------ |
| error | Error | エラーオブジェクトです。 |

`type`プロパティから以下を判別できます。

| Type           | Description                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------- |
| room-error     | ルーム名が指定されていません                                                                |
|                | ルームタイプが異なります。(メッシュルームとして作成した部屋に、SFUルーム指定で参加した場合) |
|                | SFU機能が該当のAPIキーでDisabledです。利用するには、Dashboardからenableにしてください。     |
|                | 不明なエラーが発生しました。少し待って、リトライしてください。                              |
|                | ルームログ取得時にエラーが発生しました。少し待って、リトライしてください。                  |
| authentication | 指定されたクレデンシャルを用いた認証に失敗しました。                                        |
| permission     | 該当のルームの利用が許可されてません。                                                      |
| list-error     | APIキーのREST APIが許可されてません。                                                       |
| disconnected   | SkyWayのシグナリングサーバに接続されていません。                                            |
| socket-error   | SkyWayのシグナリングサーバとの接続が失われました。                                          |
| invalid-id     | IDが不正です。                                                                              |
| invalid-key    | APIキーが無効です。                                                                         |
| server-error   | SkyWayのシグナリングサーバからPeer一覧を取得できませんでした。                              |

```js
// 仮にRoom名を指定せずにjoinRoomを呼んだ場合
peer.on('error', error => {
  console.log(`${error.type}: ${error.message}`);
  // => room-error: Room name must be defined.
});
```

[RTCConfiguration]: https://w3c.github.io/webrtc-pc/#rtcconfiguration-dictionary
[MediaStream]: https://w3c.github.io/mediacapture-main/#mediastream
[RTCDataChannelInit]: https://w3c.github.io/webrtc-pc/#dom-rtcdatachannelinit
