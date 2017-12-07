Class that manages all p2p connections and rooms. Peer instance must be generated when using SkyWay.

## Constructor

`new Peer` creates new Peer instance and connects to the signaling server.

### Parameter

|Name|Type|Required|Default|Description|
|----|----|----|----|----|
|id|string|||User's peerId.|
|options|[options object](#options-object)|✔||Optional arguments for the connection.|

#### options object

|Name|Type|Required|Default|Description|
|----|----|----|----|----|
|key|string|✔||ECLWebRTC API key.|
|debug|number|||Log level. NONE:0, ERROR:1, WARN:2, FULL:3.|
|turn|boolean|||Whether using ECLWebRTC's TURN or not.|
|credential|[credential object](#credential-object)|||The credential used to authenticate peer and can be used when authentication is enabled. Check [authentication repository](https://github.com/skyway/skyway-peer-authentication-samples) to see datails.|
|config|[RTCConfiguration object](https://w3c.github.io/webrtc-pc/#rtcconfiguration-dictionary)||[Default RTCConfiguration object](#default-rtcconfiguration-object)|[The object passed to RTCPeerConnection](https://w3c.github.io/webrtc-pc/#rtcconfiguration-dictionary). This is advanced option.|

#### credential object

|Name|Type|Required|Default|Description|
|----|----|----|----|----|
|timestamp|number|||Current UNIX timestamp.|
|ttl|number|||Time to live; The credential expires at timestamp + ttl.|
|authToken|string||Default|Credential token calculated with HMAC.|

#### Default RTCConfiguration object

```js
const defaultConfig = {
  iceServers: [{
    urls: 'stun:stun.webrtc.ecl.ntt.com:3478',
    url:  'stun:stun.webrtc.ecl.ntt.com:3478',
  }],
  iceTransportPolicy: 'all',
};
```
### Sample

```js
// Connect SkyWay signaling server with full debug option.
const peer = new Peer({
  key:   "<YOUR-API-KEY>"
  debug: 3,
});
```

```js
// Force turn server
const peer = new Peer({
  key:   "<YOUR-API-KEY>"
  debug: 3,
  config: {
    iceTransportPolicy: 'relay',
  },
});
```

## Members

|Name|Type|Description|
|----|----|----|
|connections|Object|Object contains all connections.|
|id|string|The Peer ID specified by a user or randomly assigned Peer ID by the signaling server.|
|open|boolean|Whether the socket is connecting to the signalling server or not.|
|rooms|object|Object contains all rooms.|

## Methods

### call

Calls the designated Peer and creates new MediaConnection.
With option, bandwidth or/and codec can be specified.

#### Parameters

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| peerId | string | ✔ | | The peerId of the peer you are calling. |
| stream | MediaStream | | | The MediaStream to send to the remote peer. If not set, the caller creates offer SDP with `recvonly` attribute. |
| options | [call options object](#call-options-object) | | | Optional arguments for the connection. |

##### call options object

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| metadata | object | | | Any additional information to send to the peer. |
| videoBandwidth | number | | | A max video bandwidth(kbps) |
| audioBandwidth | number | | | A max audio bandwidth(kbps) |
| videoCodec | string | | | A video codec like 'H264' |
| audioCodec | string | | | A video codec like 'PCMU' |
| videoReceiveEnabled | boolean | | | Set to `true` when the user wants to receive video |
| audioReceiveEnabled | boolean | | | Set to `true` when the user wants to receive audio |
| label | string | | | **Deprecated!** Label to easily identify the connection on either peer. |

#### Return value 

[MediaConnection](mediaconnection) instance

#### Sample

```js
// Call a peer, providing our mediaStream
const call = peer.call('peerID', localStream);
```

```js
// Call a peer, providing our mediaStream and metadata
const call = peer.call('peerID', localStream, {
  metadata: {
    foo: 'bar',
  }
});
```

```js
// Call a peer, providing our mediaStream with H264(video codec)
const call = peer.call('peerID', localStream, {
  videoCodec: 'H264',
});
```

```js
// Call a peer, and just want to receive audio
const call = peer.call('peerID', {
  audioReceiveEnabled: true,
});
```

### connect

Connects to the designated Peer and creates new DataConnection.

#### Parameters

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- |  --- |
| peerId | string | ✔ | |  User's peerId.|
| options | [connect options object](#connect-options-object) | | | Optional arguments for DataConnection. |

##### connect options object

| Name | Type | Required | Default |  Description |
| --- | --- | --- | --- | --- |
| metadata | object | | | Any additional information to send to the peer. |
| serialization | string | | | How to serialize data when sending. One of 'binary', 'json' or 'none'. |
| dcInit | [RTCDataChannelInit Object](https://www.w3.org/TR/webrtc/#dom-rtcdatachannelinit) | | | Options passed to createDataChannel() as a RTCDataChannelInit. |
| label | string | | | **Deprecated!** Label to easily identify the connection on either peer. |

#### Return value 

[DataConnection](dataconnection) instance

#### Sample

```js
// connect with data channel and with reliable mode(default)
peer.connect('peerId');
```

```js
// with metadata
peer.connect('peerId', {
  metadata: {
    hoge: "foobar",
  }
});
```

```js
// connect with data channel and with unreliable mode
peer.connect('peerId', {
  dcInit: {
    maxRetransmits: 2,
  },
});
```

### destroy

Close all connections and disconnect socket.

#### Parameters

None

#### Return value 

`undefined`

#### Sample

```js
peer.destroy();
```

### disconnect

Close socket and clean up some properties, then emit disconnect event.

#### Parameters

None

#### Return value 

`undefined`

#### Sample

```js
peer.disconnect();
```

### joinRoom

Join fullmesh type or SFU type room that two or more users can join. See explanation of fullmesh and SFU type from [here](https://webrtc.ecl.ntt.com/sfu.html).

#### Parameters

| Name | Type | Rquired| Default | Description |
| --- | --- | --- | --- | --- |
| roomName | string | ✔ | | The name of the room user is joining to. |
| roomOptions | [roomOptions object](#roomoptions-object) | | Options to configure connection. |

##### roomOptions object

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| mode | string | | 'mesh' | One of 'sfu' or 'mesh'. |
| stream | MediaStream | | | Media stream user wants to emit. |
| videoBandwidth | number | | | A max video bandwidth(kbps). Used only in mesh mode.|
| audioBandwidth | number | | | A max audio bandwidth(kbps). Used only in mesh mode.|
| videoCodec | string | | | A video codec like 'H264'. Used only in mesh mode.|
| audioCodec | string | | | A video codec like 'PCMU'. Used only in mesh mode.|
| videoReceiveEnabled | boolean | | | Set to `true` when the user wants to receive video. |
| audioReceiveEnabled | boolean | | | Set to `true` when the user wants to receive video. |

#### Return value 

Instance of [SFURoom](sfuroom) or [MeshRoom](meshroom)

#### Sample

```js
const room = peer.joinRoom("roomName", {
  mode: 'mesh', 
  stream: localStream,
});
```

```js
const room = peer.joinRoom("roomName", {
  mode: 'sfu', 
  stream: localStream,
});
```

### listAllPeers

Call Rest API and get the list of peerIds assciated with API key.

#### Parameters

None

#### Return value 

`undefined`

#### Sample

```js
peer.listAllPeers(peers => {
  console.log(peers)
  // => ["yNtQkNyjAojJNGrt", "EzAmgFhCKBQMzKw9"]
});
```

### updateCredential

Update server-side credential by sending a request in order to extend TTL of authenticaion.

#### Parameters

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| mode | [credential object](#credential-object)| ✔ | | The new credential generated by user. |

##### credential object

|Name|Type|Optional|Default|Description|
|----|----|----|----|----|
|timestamp|number|✔||Current UNIX timestamp.|
|ttl|number|✔||Time to live; The credential expires at timestamp + ttl.|
|authToken|string|✔|Default|Credential token calculated with HMAC.|

#### Return value 

`undefined`

## Events

### open

Successfully connected to signaling server.

|Type|Description|
|----|----|
|string|Peer ID|

#### Sample

```js
peer.on('open', id => {
  console.log(id);
})
```

### call

Received a call with Media channel(audio and/or video) from peer.

|Type|Description|
|----|----|
|[MediaConnection](mediaconnection)|MediaConnection instance.|

#### Sample

```js
peer.on('call', call => {
  // answer with media stream
  call.answer(mediaStream);
});
```

### close

Finished closing all connections to peers.

### connection

Received a connection from peer.

|Type|Description|
|----|----|
|[DataConnection](dataconnection)|DataConnection instance.|

#### sample

```js
peer.on('connection', connection => {
  console.log(connection);
});
```

### disconnected

Disconnected from the signalling server.

|Type|Description|
|----|----|
|string|Peer ID|

### expiresin

The event occurs before credential expired.

|Type|Description|
|----|----|
|number|The second before credential expires|

### error

Events when error occur.

|Type|Description|
|----|----|
|room-error|Room name must be defined.|
||ルームタイプが異なります。(メッシュルームとして作成した部屋に、SFUルーム指定で参加した場合)|
||SFU機能が該当のAPIキーでDisabledです。利用するには、Dashboardからenableにしてください。|
||不明なエラーが発生しました。少し待って、リトライしてください。|
||ルームログ取得時にエラーが発生しました。少し待って、リトライしてください。|
|authentication|指定されたクレデンシャルを用いた認証に失敗しました。|
|permission|該当のルームの利用が許可されてません。|
|list-error|Look like you have permission to list peers IDs. Please enable the SkyWay REST API on dashboard.|
|disconnected|Cannot connect to new Peer before connecting to SkyWay server or after disconnecting from the server.|
|socket-error|Lost connection to server|
|invalid-id|IDが不正です。|
|invalid-key|APIキーが無効です。|
|server-error|Could not get peers from the server.|

#### Sample

```js
// When calling joinRoom() without room name
peer.on('error', error => {
  console.log(`${error.type}: ${error.message}`);
  // => room-error: Room name must be defined.
});
```